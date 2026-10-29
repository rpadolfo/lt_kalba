// LT Kalba - Local-First Data Layer using Dexie.js (IndexedDB)
// Store definitions:
// - lessons_progress: '++id, lessonId, completed, completedAt, score'
// - exercises_history: '++id, type, timestamp, score, total'
// - user_stats: 'key, value'
// - daily_missions: 'id, title, xp, completed, date'

import Dexie from 'dexie';

export const dexieDb = new Dexie('lt_kalba_db');

dexieDb.version(1).stores({
  lessons_progress: '++id, lessonId, completed, completedAt, score',
  exercises_history: '++id, type, timestamp, score, total',
  user_stats: 'key, value',
  daily_missions: 'id, title, xp, completed, date'
});

// In-memory cache for synchronous instant reads
const cache = {
  userStats: {
    xp: 240,
    streak: 5,
    lastActiveDate: Date.now(),
    wordsMastered: 3,
    dailyGoal: 50
  },
  lessonsProgress: [],
  dailyMissions: [],
  exercisesHistory: []
};

let isInitialized = false;

function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

export const dbService = {
  dexie: dexieDb,

  async init() {
    if (isInitialized) return;

    try {
      await dexieDb.open();
      await this.migrateLegacyData();
      await this.refreshCache();
      isInitialized = true;
    } catch (err) {
      console.error('[dbService] Initialization error:', err);
    }
  },

  async migrateLegacyData() {
    try {
      const statsCount = await dexieDb.user_stats.count();
      if (statsCount === 0) {
        // Read legacy progress from localStorage
        let legacy = {};
        try {
          const raw = localStorage.getItem('lt_kalba_progress');
          if (raw) legacy = JSON.parse(raw);
        } catch (e) {
          console.warn('[dbService] Error parsing legacy progress:', e);
        }

        const initialStats = [
          { key: 'xp', value: legacy.xp !== undefined ? legacy.xp : 240 },
          { key: 'streak', value: legacy.streak !== undefined ? legacy.streak : 5 },
          { key: 'lastActiveDate', value: legacy.lastActive || Date.now() },
          { key: 'wordsMastered', value: legacy.wordsMastered !== undefined ? legacy.wordsMastered : 3 },
          { key: 'dailyGoal', value: legacy.dailyGoal || 50 }
        ];

        await dexieDb.user_stats.bulkPut(initialStats);
      }

      // Check daily missions
      const todayStr = getTodayString();
      const missions = await dexieDb.daily_missions.toArray();
      const needsFreshMissions = missions.length === 0 || !missions.some(m => m.date === todayStr);

      if (needsFreshMissions) {
        const defaultMissions = [
          {
            id: 'mission-1',
            title: 'Separação de Gênero M vs F (5 acertos)',
            xp: 15,
            completed: false,
            date: todayStr
          },
          {
            id: 'mission-2',
            title: 'Encaixe do Locativo Kur? (3 frases)',
            xp: 20,
            completed: false,
            date: todayStr
          },
          {
            id: 'mission-3',
            title: 'Simulação Roleplay em Vilnius',
            xp: 35,
            completed: false,
            date: todayStr
          }
        ];
        await dexieDb.daily_missions.bulkPut(defaultMissions);
      }
    } catch (err) {
      console.error('[dbService] Migration error:', err);
    }
  },

  async refreshCache() {
    try {
      // 1. Stats
      const statsRows = await dexieDb.user_stats.toArray();
      statsRows.forEach(row => {
        cache.userStats[row.key] = row.value;
      });

      // 2. Lessons Progress
      cache.lessonsProgress = await dexieDb.lessons_progress.toArray();

      // 3. Daily Missions
      cache.dailyMissions = await dexieDb.daily_missions.toArray();

      // 4. Exercises History
      cache.exercisesHistory = await dexieDb.exercises_history.orderBy('id').reverse().limit(50).toArray();

      // Sync localStorage for backwards compatibility
      this.syncLegacyLocalStorage();
    } catch (err) {
      console.error('[dbService] Refresh cache error:', err);
    }
  },

  syncLegacyLocalStorage() {
    try {
      const progressObj = {
        xp: cache.userStats.xp || 0,
        streak: cache.userStats.streak || 0,
        lastActive: cache.userStats.lastActiveDate || Date.now(),
        wordsMastered: cache.userStats.wordsMastered || 0,
        dailyGoal: cache.userStats.dailyGoal || 50
      };
      localStorage.setItem('lt_kalba_progress', JSON.stringify(progressObj));
    } catch (e) {
      // Ignore in restricted environments
    }
  },

  // --- Synchronous Getters (Fast UI rendering) ---
  getUserStats() {
    return { ...cache.userStats };
  },

  getProgress() {
    return {
      xp: cache.userStats.xp || 0,
      streak: cache.userStats.streak || 0,
      lastActive: cache.userStats.lastActiveDate || Date.now(),
      wordsMastered: cache.userStats.wordsMastered || 0,
      dailyGoal: cache.userStats.dailyGoal || 50
    };
  },

  getDailyMissions() {
    return [...cache.dailyMissions];
  },

  getLessonsProgress() {
    return [...cache.lessonsProgress];
  },

  isLessonCompleted(lessonId) {
    return cache.lessonsProgress.some(p => p.lessonId === lessonId && p.completed);
  },

  getLessonProgress(lessonId) {
    return cache.lessonsProgress.find(p => p.lessonId === lessonId) || null;
  },

  getExercisesHistory() {
    return [...cache.exercisesHistory];
  },

  // --- Asynchronous Mutators ---
  async addXp(amount) {
    const newXp = (cache.userStats.xp || 0) + amount;
    cache.userStats.xp = newXp;
    await dexieDb.user_stats.put({ key: 'xp', value: newXp });
    this.syncLegacyLocalStorage();
    return newXp;
  },

  async setUserStat(key, value) {
    cache.userStats[key] = value;
    await dexieDb.user_stats.put({ key, value });
    this.syncLegacyLocalStorage();
  },

  async updateStreak() {
    const now = new Date();
    const lastActive = new Date(cache.userStats.lastActiveDate || Date.now());
    
    // Check difference in days
    const diffTime = now.setHours(0,0,0,0) - new Date(lastActive).setHours(0,0,0,0);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Active consecutive day
      cache.userStats.streak = (cache.userStats.streak || 0) + 1;
    } else if (diffDays > 1) {
      // Streak broken
      cache.userStats.streak = 1;
    }

    cache.userStats.lastActiveDate = Date.now();
    await dexieDb.user_stats.put({ key: 'streak', value: cache.userStats.streak });
    await dexieDb.user_stats.put({ key: 'lastActiveDate', value: cache.userStats.lastActiveDate });
    this.syncLegacyLocalStorage();
    return cache.userStats.streak;
  },

  async saveLessonCompletion(lessonId, score = 100) {
    try {
      const existing = await dexieDb.lessons_progress.where('lessonId').equals(lessonId).first();
      let recordId;
      let isFirstTime = false;

      if (existing) {
        recordId = existing.id;
        await dexieDb.lessons_progress.update(recordId, {
          completed: true,
          completedAt: Date.now(),
          score: Math.max(existing.score || 0, score)
        });
      } else {
        isFirstTime = true;
        recordId = await dexieDb.lessons_progress.add({
          lessonId,
          completed: true,
          completedAt: Date.now(),
          score
        });
      }

      // Award XP for completion
      if (isFirstTime) {
        await this.addXp(50);
      } else {
        await this.addXp(15);
      }

      await this.refreshCache();
      return { recordId, isFirstTime };
    } catch (err) {
      console.error('[dbService] saveLessonCompletion error:', err);
    }
  },

  async recordExerciseScore(type, score, total) {
    try {
      const record = {
        type,
        timestamp: Date.now(),
        score,
        total
      };

      const recordId = await dexieDb.exercises_history.add(record);

      // Award XP based on performance
      const earnedXp = Math.max(5, score * 5);
      await this.addXp(earnedXp);

      // Check daily missions
      if (type === 'gender-sorting' && score >= 3) {
        await this.completeDailyMission('mission-1');
      } else if (type === 'case-snapping' && score >= 2) {
        await this.completeDailyMission('mission-2');
      } else if (type === 'roleplay') {
        await this.completeDailyMission('mission-3');
      }

      await this.refreshCache();
      return { recordId, earnedXp };
    } catch (err) {
      console.error('[dbService] recordExerciseScore error:', err);
    }
  },

  async completeDailyMission(missionId) {
    try {
      const mission = await dexieDb.daily_missions.get(missionId);
      if (mission && !mission.completed) {
        await dexieDb.daily_missions.update(missionId, { completed: true });
        await this.addXp(mission.xp || 20);
        await this.refreshCache();
        return true;
      }
      return false;
    } catch (err) {
      console.error('[dbService] completeDailyMission error:', err);
      return false;
    }
  },

  // --- Backup & Restore (JSON 1-Touch) ---
  async exportBackup() {
    try {
      const userStats = await dexieDb.user_stats.toArray();
      const lessonsProgress = await dexieDb.lessons_progress.toArray();
      const exercisesHistory = await dexieDb.exercises_history.toArray();
      const dailyMissions = await dexieDb.daily_missions.toArray();

      // Read custom vocab & conjugations from localStorage if any
      let customVocab = [];
      let customConj = [];
      try {
        const v = localStorage.getItem('lt_kalba_vocab');
        if (v) customVocab = JSON.parse(v);
        const c = localStorage.getItem('lt_kalba_conj');
        if (c) customConj = JSON.parse(c);
      } catch (e) {}

      const backupData = {
        app: 'LT Kalba',
        version: '1.1.0',
        exportedAt: new Date().toISOString(),
        stores: {
          user_stats: userStats,
          lessons_progress: lessonsProgress,
          exercises_history: exercisesHistory,
          daily_missions: dailyMissions
        },
        customData: {
          vocabularyCount: customVocab.length,
          vocabulary: customVocab,
          conjugations: customConj
        }
      };

      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = getTodayString();
      a.href = url;
      a.download = `lt_kalba_backup_${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return { success: true, count: lessonsProgress.length + exercisesHistory.length };
    } catch (err) {
      console.error('[dbService] exportBackup error:', err);
      throw err;
    }
  },

  async importBackup(jsonStringOrObject) {
    try {
      let data = jsonStringOrObject;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      if (!data || (!data.stores && !data.user_stats)) {
        throw new Error('Arquivo de backup inválido ou incompatível.');
      }

      const stores = data.stores || data;

      await dexieDb.transaction('rw', [dexieDb.user_stats, dexieDb.lessons_progress, dexieDb.exercises_history, dexieDb.daily_missions], async () => {
        // 1. user_stats
        if (Array.isArray(stores.user_stats)) {
          await dexieDb.user_stats.clear();
          await dexieDb.user_stats.bulkPut(stores.user_stats);
        }

        // 2. lessons_progress
        if (Array.isArray(stores.lessons_progress)) {
          await dexieDb.lessons_progress.clear();
          await dexieDb.lessons_progress.bulkPut(stores.lessons_progress);
        }

        // 3. exercises_history
        if (Array.isArray(stores.exercises_history)) {
          await dexieDb.exercises_history.clear();
          await dexieDb.exercises_history.bulkPut(stores.exercises_history);
        }

        // 4. daily_missions
        if (Array.isArray(stores.daily_missions)) {
          await dexieDb.daily_missions.clear();
          await dexieDb.daily_missions.bulkPut(stores.daily_missions);
        }
      });

      // Restore custom data if present
      if (data.customData) {
        if (Array.isArray(data.customData.vocabulary) && data.customData.vocabulary.length > 0) {
          localStorage.setItem('lt_kalba_vocab', JSON.stringify(data.customData.vocabulary));
        }
        if (Array.isArray(data.customData.conjugations) && data.customData.conjugations.length > 0) {
          localStorage.setItem('lt_kalba_conj', JSON.stringify(data.customData.conjugations));
        }
      }

      await this.refreshCache();
      return { success: true, message: 'Backup restaurado com sucesso!' };
    } catch (err) {
      console.error('[dbService] importBackup error:', err);
      throw err;
    }
  }
};
