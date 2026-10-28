from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from morphology import DICTIONARY, analyze_word

app = FastAPI(title="Lithuanian Language Learning API")

# Configure CORS so the Vite frontend can access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    word: str

# 1. Health check
@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Backend is running!"}

# 2. Dictionary query
@app.get("/api/dictionary")
def get_dictionary():
    return DICTIONARY

# 3. Analyze word
@app.post("/api/analyze")
def analyze(payload: AnalyzeRequest):
    if not payload.word:
        raise HTTPException(status_code=400, detail="Word parameter is required")
    analysis = analyze_word(payload.word)
    return analysis

# 4. Alphabet phonetics data (Section 3.2)
@app.get("/api/alphabet")
def get_alphabet():
    return [
        {"letter": "A a", "name": "a"},
        {"letter": "Ą ą", "name": "a nosinė"},
        {"letter": "B b", "name": "bė"},
        {"letter": "C c", "name": "cė"},
        {"letter": "Č č", "name": "čė"},
        {"letter": "D d", "name": "dė"},
        {"letter": "E e", "name": "e"},
        {"letter": "Ę ę", "name": "e nosinė"},
        {"letter": "Ė ė", "name": "ė"},
        {"letter": "F f", "name": "ef"},
        {"letter": "G g", "name": "gė"},
        {"letter": "H h", "name": "ha"},
        {"letter": "I i", "name": "i trumpoji"},
        {"letter": "Į į", "name": "i nosinė"},
        {"letter": "Y y", "name": "i ilgoji"},
        {"letter": "J j", "name": "jot"},
        {"letter": "K k", "name": "ka"},
        {"letter": "L l", "name": "el"},
        {"letter": "M m", "name": "em"},
        {"letter": "N n", "name": "en"},
        {"letter": "O o", "name": "o"},
        {"letter": "P p", "name": "pė"},
        {"letter": "R r", "name": "er"},
        {"letter": "S s", "name": "es"},
        {"letter": "Š š", "name": "eš"},
        {"letter": "T t", "name": "tė"},
        {"letter": "U u", "name": "u trumpoji"},
        {"letter": "Ų ų", "name": "u nosinė"},
        {"letter": "Ū ū", "name": "u ilgoji"},
        {"letter": "V v", "name": "vė"},
        {"letter": "Z z", "name": "zė"},
        {"letter": "Ž ž", "name": "žė"}
    ]

# 5. Declensions reference data (Section 3.3)
@app.get("/api/declensions")
def get_declensions():
    return {
        "singular": [
            {"case": "Nominativo (Kas?)", "m_suffix": "-as, -is, -ys, -ius", "f_suffix": "-a, -ė", "usage": "Sujeito da frase"},
            {"case": "Genitivo (Ko?)", "m_suffix": "-o, -io, -io, -iaus", "f_suffix": "-os, -ės", "usage": "Posse (de quem?), negação, partitivo"},
            {"case": "Acusativo (Ką?)", "m_suffix": "-ą, -ę, -į, -ų", "f_suffix": "-ą, -ę, -į, -ų", "usage": "Objeto direto, direção com preposição"},
            {"case": "Locativo (Kur?)", "m_suffix": "-e, -yje, -yje, -iuje", "f_suffix": "-oje, -ėje", "usage": "Lugar onde (em/no/na)"}
        ],
        "plural": [
            {"case": "Nominativo (Kas?)", "suffix": "-ai, -iai / -os, -ės", "usage": "Sujeitos no plural"},
            {"case": "Genitivo (Ko?)", "suffix": "-ų, -ių (Regra de Ouro)", "usage": "Posse, negação plural, quantidades"},
            {"case": "Acusativo (Ką?)", "suffix": "-us, -ius / -as, -es", "usage": "Objetos diretos no plural"},
            {"case": "Locativo (Kur?)", "suffix": "-uose, -iuose / -ose, -ėse", "usage": "Lugares plural (nos/nas)"}
        ]
    }

# 6. Pokalbiai (Dialogues) (Section 2.1)
@app.get("/api/dialogues")
def get_dialogues():
    return [
        {
            "id": "dial-1",
            "title": "Susipažinkime (Apresentando-se)",
            "description": "Jonas e Maria se conhecem e conversam sobre suas nacionalidades e identidades.",
            "module": 1,
            "conversation": [
                {"speaker": "Jonas", "avatar": "👨", "text": "Labas rytas! Mano vardas yra Jonas. Aš esu lietuvis. O tu?"},
                {"speaker": "Maria", "avatar": "👩", "text": "Labas rytas! Mano vardas yra Maria. Aš esu iš Brazilijos, aš esu brazilė."},
                {"speaker": "Jonas", "avatar": "👨", "text": "Malonu susipažinti, Maria! Sveika atvykusi į Lietuvą."},
                {"speaker": "Maria", "avatar": "👩", "text": "Ačiū! Man irgi labai malonu."}
            ]
        },
        {
            "id": "dial-2",
            "title": "Mano Miestas (Onde você mora?)",
            "description": "Maria explica onde está morando e Jonas fala sobre seu trabalho.",
            "module": 2,
            "conversation": [
                {"speaker": "Jonas", "avatar": "👨", "text": "Maria, kur tu gyveni dabar?"},
                {"speaker": "Maria", "avatar": "👩", "text": "Aš gyvenu Vilniuje, gražiame bute. O kur tu gyveni?"},
                {"speaker": "Jonas", "avatar": "👨", "text": "Aš gyvenu Kaune, bet mano darbas yra Vilniuje. Aš dirbu čia."},
                {"speaker": "Maria", "avatar": "👩", "text": "Vilnius yra labai gražus miestas."}
            ]
        },
        {
            "id": "dial-3",
            "title": "Kavinėje (No Café)",
            "description": "Maria e Jonas pedem comida e bebida utilizando o caso Acusativo e Genitivo.",
            "module": 4,
            "conversation": [
                {"speaker": "Padavėja", "avatar": "💁‍♀️", "text": "Laba diena! Ką norite užsisakyti?"},
                {"speaker": "Maria", "avatar": "👩", "text": "Laba diena! Aš noriu kavos ir duonos, prašau."},
                {"speaker": "Jonas", "avatar": "👨", "text": "O aš noriu arbatos ir pyrago, prašau. Aš neturiu daug laiko."},
                {"speaker": "Padavėja", "avatar": "💁‍♀️", "text": "Prašom, tuoj atnešiu."}
            ]
        }
    ]
