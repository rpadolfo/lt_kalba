// Lithuanian Grammar Lessons Mock Data (A1-A2) for LT Kalba

export const LESSONS = [
  {
    id: "lesson-1",
    moduleId: 1,
    title: "Alfabeto e Gêneros dos Substantivos",
    badge: "Fundamentos • A1",
    description: "Conheça o alfabeto lituano e descubra como identificar o gênero masculino e feminino das palavras através de suas terminações.",
    content: `
      <h3>O Alfabeto Lituano</h3>
      <p>O lituano usa o alfabeto latino modificado com 32 letras. Não existem as letras <b>Q, W, X</b>, mas há caracteres especiais com diacríticos:</p>
      
      <table style="width:100%; border-collapse:collapse; margin: 1rem 0; font-size: 0.9rem;">
        <thead>
          <tr style="background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1);">
            <th style="padding: 8px; text-align: left;">Letra</th>
            <th style="padding: 8px; text-align: left;">Som Equivalente</th>
            <th style="padding: 8px; text-align: left;">Exemplo</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 8px; color: var(--primary-hover); font-weight: 700;">Ą, Ę, Į, Ų</td>
            <td style="padding: 8px;">Vogais longas (historicamente nasais, mas hoje apenas longas)</td>
            <td style="padding: 8px;">ačiū (obrigado)</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 8px; color: var(--primary-hover); font-weight: 700;">Č, Š, Ž</td>
            <td style="padding: 8px;">Sons de "tch", "ch" e "j" (como em jornal)</td>
            <td style="padding: 8px;">šalis (país), čia (aqui)</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 8px; color: var(--primary-hover); font-weight: 700;">Ė</td>
            <td style="padding: 8px;">Som de "ê" bem fechado e longo</td>
            <td style="padding: 8px;">kavinė (cafeteria)</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 8px; color: var(--primary-hover); font-weight: 700;">Ū, Y</td>
            <td style="padding: 8px;">Sons longos de "u" e "i"</td>
            <td style="padding: 8px;">sūnus (filho), vyras (homem)</td>
          </tr>
        </tbody>
      </table>

      <h3>Gênero dos Substantivos</h3>
      <p>Em lituano, todos os substantivos são masculinos ou femininos. O gênero é facilmente identificado pela terminação nominativa:</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0;">
        <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.2); padding: 1rem; border-radius: 8px;">
          <h4 style="color: var(--primary-hover); margin-bottom: 0.5rem;">👨 Masculino</h4>
          <p>Terminam em vogal + <b>s</b>:</p>
          <ul style="padding-left: 1.25rem; font-size: 0.9rem;">
            <li><b>-as</b>: draug<b>as</b> (amigo), nam<b>as</b> (casa)</li>
            <li><b>-is</b>: brol<b>is</b> (irmão), miest<b>is</b></li>
            <li><b>-ys</b>: mokyt<b>ys</b> (professor)</li>
            <li><b>-us</b>: sūn<b>us</b> (filho), Vilni<b>us</b></li>
          </ul>
        </div>
        
        <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); padding: 1rem; border-radius: 8px;">
          <h4 style="color: var(--success); margin-bottom: 0.5rem;">👩 Feminino</h4>
          <p>Terminam nas vogais <b>a</b> ou <b>ė</b>:</p>
          <ul style="padding-left: 1.25rem; font-size: 0.9rem;">
            <li><b>-a</b>: kav<b>a</b> (café), mam<b>a</b> (mãe)</li>
            <li><b>-ė</b>: kat<b>ė</b> (gata), dukt<b>ė</b> (filha)</li>
            <li><b>-i</b> (raro): seser<b>i</b>s (irmã)</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: "lesson-2",
    moduleId: 1,
    title: "Pronomes Pessoais e o Verbo BŪTI",
    badge: "Verbos • A1",
    description: "Aprenda a se referir a si mesmo e a outros, e domine a conjugação no presente do verbo mais importante do idioma: būti (ser/estar).",
    content: `
      <h3>Pronomes Pessoais</h3>
      <p>Os pronomes em lituano mudam dependendo de quem fala:</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; font-size: 0.95rem;">
        <div>
          <p>🗣️ <b>Singular:</b></p>
          <ul style="padding-left: 1.25rem; margin-top: 0.25rem;">
            <li><b>aš</b>: eu</li>
            <li><b>tu</b>: tu / você</li>
            <li><b>jis</b>: ele</li>
            <li><b>ji</b>: ela</li>
          </ul>
        </div>
        <div>
          <p>👥 <b>Plural:</b></p>
          <ul style="padding-left: 1.25rem; margin-top: 0.25rem;">
            <li><b>mes</b>: nós</li>
            <li><b>jūs</b>: vós / vocês</li>
            <li><b>jie</b>: eles (grupo masculino/misto)</li>
            <li><b>jos</b>: elas (grupo puramente feminino)</li>
          </ul>
        </div>
      </div>

      <h3>O Verbo BŪTI (Ser / Estar) no Presente</h3>
      <p>O verbo <b>būti</b> é irregular no presente. Memorizar esta tabela é o passo número um no aprendizado:</p>
      
      <table style="width:100%; border-collapse:collapse; margin: 1.5rem 0; font-size: 1rem; box-shadow: var(--shadow-premium);">
        <thead>
          <tr style="background: var(--bg-card-hover); border-bottom: 2px solid var(--primary);">
            <th style="padding: 12px; text-align: left;">Pessoa</th>
            <th style="padding: 12px; text-align: left;">Lituano</th>
            <th style="padding: 12px; text-align: left;">Português</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 10px; font-weight: 600;">aš (eu)</td>
            <td style="padding: 10px; color: var(--primary-hover); font-weight: 700; font-family: var(--font-mono);">esu</td>
            <td style="padding: 10px;">sou / estou</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 10px; font-weight: 600;">tu (tu)</td>
            <td style="padding: 10px; color: var(--primary-hover); font-weight: 700; font-family: var(--font-mono);">esi</td>
            <td style="padding: 10px;">és / estás</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 10px; font-weight: 600;">jis / ji (ele/ela)</td>
            <td style="padding: 10px; color: var(--primary-hover); font-weight: 700; font-family: var(--font-mono);">yra</td>
            <td style="padding: 10px;">é / está</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 10px; font-weight: 600;">mes (nós)</td>
            <td style="padding: 10px; color: var(--primary-hover); font-weight: 700; font-family: var(--font-mono);">esame</td>
            <td style="padding: 10px;">somos / estamos</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 10px; font-weight: 600;">jūs (vocês)</td>
            <td style="padding: 10px; color: var(--primary-hover); font-weight: 700; font-family: var(--font-mono);">esate</td>
            <td style="padding: 10px;">são / estão (vós)</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 10px; font-weight: 600;">jie / jos (eles/elas)</td>
            <td style="padding: 10px; color: var(--primary-hover); font-weight: 700; font-family: var(--font-mono);">yra</td>
            <td style="padding: 10px;">são / estão</td>
          </tr>
        </tbody>
      </table>
      
      <p style="background: rgba(245, 158, 11, 0.05); border-left: 4px solid var(--warning); padding: 0.75rem; border-radius: 4px; font-size: 0.9rem;">
        ⚠️ <b>Nota importante:</b> A terceira pessoa do singular (jis/ji) e do plural (jie/jos) usam exatamente a mesma forma: <b>yra</b>.
      </p>
    `
  },
  {
    id: "lesson-3",
    moduleId: 2,
    title: "O Caso Locativo (Vietininkas)",
    badge: "Casos • A1",
    description: "Entenda o conceito de Casos Gramaticais no lituano e domine o Locativo para responder à pergunta essencial: 'Onde?' (Kur?).",
    content: `
      <h3>O que são Casos?</h3>
      <p>Em lituano, em vez de usar apenas preposições (como "em", "para", "de"), a **terminação física do substantivo muda** para indicar sua função na frase. Existem 7 casos gramaticais.</p>
      
      <h3>O Caso Locativo (Vietininkas)</h3>
      <p>O caso Locativo é usado para responder à pergunta <b>Kur? (Onde?)</b>. Ele indica permanência dentro ou em cima de um lugar físico.</p>
      
      <h4 style="margin-top: 1rem; color: white;">Como formar o Locativo (Singular):</h4>
      <p>Basta trocar a terminação nominativa padrão pela terminação do caso:</p>

      <table style="width:100%; border-collapse:collapse; margin: 1rem 0; font-size: 0.9rem;">
        <thead>
          <tr style="background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.1);">
            <th style="padding: 8px; text-align: left;">Terminação Nom.</th>
            <th style="padding: 8px; text-align: left;">Terminação Loc.</th>
            <th style="padding: 8px; text-align: left;">Nominativo</th>
            <th style="padding: 8px; text-align: left;">Locativo</th>
            <th style="padding: 8px; text-align: left;">Tradução</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 8px; font-weight: 700;">-as</td>
            <td style="padding: 8px; color: var(--success); font-weight: 700;">-e</td>
            <td style="padding: 8px;">nam<b>as</b> (casa)</td>
            <td style="padding: 8px; font-family: var(--font-mono);">nam<b>e</b></td>
            <td style="padding: 8px;">em casa / na casa</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 8px; font-weight: 700;">-us</td>
            <td style="padding: 8px; color: var(--success); font-weight: 700;">-uje</td>
            <td style="padding: 8px;">Vilni<b>us</b> (Vilnius)</td>
            <td style="padding: 8px; font-family: var(--font-mono);">Vilni<b>uje</b></td>
            <td style="padding: 8px;">em Vilnius</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 8px; font-weight: 700;">-a</td>
            <td style="padding: 8px; color: var(--success); font-weight: 700;">-oje</td>
            <td style="padding: 8px;">Lietuv<b>a</b> (Lituânia)</td>
            <td style="padding: 8px; font-family: var(--font-mono);">Lietuv<b>oje</b></td>
            <td style="padding: 8px;">na Lituânia</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 8px; font-weight: 700;">-ė</td>
            <td style="padding: 8px; color: var(--success); font-weight: 700;">-ėje</td>
            <td style="padding: 8px;">kavin<b>ė</b> (café)</td>
            <td style="padding: 8px; font-family: var(--font-mono);">kavin<b>ėje</b></td>
            <td style="padding: 8px;">no café / cafeteria</td>
          </tr>
        </tbody>
      </table>

      <h3>Exemplo Prático:</h3>
      <p style="font-size: 1.1rem; text-align: center; margin: 1rem 0; color: white;">
        <i>"Aš gyvenu Lietuv<b>oje</b>, Vilni<b>uje</b>."</i><br>
        <span style="font-size: 0.9rem; color: var(--text-secondary);">(Eu moro na Lituânia, em Vilnius.)</span>
      </p>
    `
  },
  {
    id: "lesson-4",
    moduleId: 3,
    title: "O Caso Genitivo (Kilmės)",
    badge: "Casos • A1",
    description: "Aprenda a expressar posse (de quem?) e domine a regra de ouro do lituano: o uso obrigatório do Genitivo para negações.",
    content: `
      <h3>O Caso Genitivo</h3>
      <p>O caso Genitivo responde principalmente a duas perguntas: <b>Kieno? (De quem?)</b> e expressa falta/ausência de algo.</p>
      
      <h3>1. Relação de Posse (De quem?)</h3>
      <p>Ao contrário do português onde dizemos "o carro *do* amigo", no lituano a posse vem **antes** do objeto possuído, e a palavra do possuidor vai para o Genitivo:</p>
      
      <ul style="padding-left: 1.5rem; margin: 1rem 0;">
        <li>Nominativo: draugas (amigo), mašina (carro)</li>
        <li>Genitivo de draugas: <b>draugo</b></li>
        <li>Frase: <b>draugo mašina</b> (carro do amigo)</li>
      </ul>

      <h3>2. A Regra de Negação (Regra de Ouro 🌟)</h3>
      <p>Em lituano, quando você nega a existência ou a posse de alguma coisa usando o prefixo <b>ne-</b> (ex: <i>neturiu</i> - não tenho), o objeto obrigatoriamente **deve ir para o Genitivo**, nunca para o Acusativo.</p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
        <div style="background: rgba(16, 185, 129, 0.03); padding: 0.75rem; border-radius: 6px; border: 1px solid rgba(16, 185, 129, 0.1);">
          <span style="color: var(--success); font-weight: 700;">🟢 Afirmativo:</span><br>
          Aš turiu <b>kavą</b> (Acusativo)<br>
          <i>(Eu tenho café)</i>
        </div>
        <div style="background: rgba(239, 68, 68, 0.03); padding: 0.75rem; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.1);">
          <span style="color: var(--danger); font-weight: 700;">🔴 Negativo:</span><br>
          Aš neturiu <b>kavos</b> (Genitivo)<br>
          <i>(Eu não tenho café)</i>
        </div>
      </div>

      <h4 style="margin-top: 1rem; color: white;">Terminações básicas do Genitivo Singular:</h4>
      <ul>
        <li>Masculino: <b>-as</b> se torna <b>-o</b> (brolis -> brolio, namas -> namo)</li>
        <li>Feminino: <b>-a</b> se torna <b>-os</b> (kava -> kavos)</li>
        <li>Feminino: <b>-ė</b> se torna <b>-ės</b> (katė -> katės)</li>
      </ul>
    `
  }
];
