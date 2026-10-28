Blueprint do Aplicativo de Aprendizado de Lituano (Nível A1/A2)

1. Visão Geral e Objetivos do Projeto

Este projeto define a arquitetura pedagógica e técnica de uma solução EdTech para o ensino de língua lituana a falantes de português, focando especificamente no estágio inicial de aquisição (A1/A2). O objetivo central é a preparação estruturada para o Exame de Proficiência da Lituânia (Categoria I), garantindo que o usuário desenvolva as competências necessárias para a certificação oficial.

Objetivos Principais:

* Aprovação na Categoria I: Alinhamento total com os requisitos do exame estatal lituano.
* Domínio de Casos Gramaticais: Uso funcional dos quatro casos fundamentais (Nominativo, Genitivo, Acusativo e Locativo).
* Comunicação Prática: Habilitar o usuário para interações em serviços, compras e situações de trabalho básico.
* Alfabetização Fonética: Garantir a correta soletração e pronúncia utilizando o sistema de diacríticos da língua.

2. Arquitetura do Módulo de Lições

O fluxo de aprendizagem foi projetado para converter o input linguístico em competência comunicativa através de quatro pilares de funcionalidade técnica:

2.1. Input (Entrada de Conteúdo)

Apresentação de diálogos e textos adaptados da obra de referência Mano ir tavo šalis Lietuva. O sistema prioriza o módulo "Pokalbiai" para contextualização.

* Lógica de Apresentação: Exibição de frases de identidade e localização.
* Exemplos Adaptados: "Mano vardas yra..." (Meu nome é...), "Aš esu iš..." (Eu sou de...), "Aš gyvenu Vilniuje" (Eu moro em Vilnius).

2.2. Flashcards (Vocabulário)

Motor de memorização léxica categorizado para facilitar a taxonomia mental do estudante.

* Países/Valstybės: Airija, Anglija, Vokietija, Lenkija, Rusija.
* Cidades e Capitais/Sostinės: Vilnius, Ryga, Talinas, Berlynas, Varšuva.
* Profissões e Pessoas: italas/italė, mokinys/mokinė, vyras, moteris, draugas/draugė.

2.3. Módulo de Gramática

Visualização analítica das propriedades morfológicas. Foco imediato na distinção binária de gênero:

* Masculino: Terminações em -as, -is, -ys, -us (ex: italas, latvis, Panevėžys, Paulius).
* Feminino: Terminações em -a, -ė (ex: Lietuva, Eglė).

2.4. Exercícios Práticos

Atividades de output para validação do conhecimento:

* Pabaikite sakinius: Completar diálogos contextuais.
* Atsakykite į klausimus: Respostas a perguntas diretas de compreensão.
* Paraidžiui (Soletrar): Exercícios de escrita baseados nos nomes fonéticos das letras (ex: soletrar "Penčeva" como Pė, e, en, cė, ha, e, vė, a).

3. Especificações do Dicionário Dinâmico e Motor Morfológico

3.1. Lógica do Motor Morfológico

O motor deve executar uma operação de suffix-stripping (extração de sufixos) para identificar o lema no dicionário. Ao encontrar uma palavra flexionada (ex: "Vilniuje"), o sistema deve identificar o sufixo de caso ("-iuje" = Locativo) e mapeá-lo à sua forma base (Lema: "Vilnius").

3.2. Alfabeto e Fonética (Abėcėlė)

Tabela de referência técnica para o módulo de soletração e reconhecimento de voz:

Letra	Nome (Apoio Fonético)	Letra	Nome (Apoio Fonético)
A a	a	Y y	i ilgoji
Ą ą	a nosinė	J j	jot
B b	bė	K k	ka
C c	cė	L l	el
Č č	čė	M m	em
D d	dė	N n	en
E e	e	O o	o
Ę ę	e nosinė	P p	pė
Ė ė	ė	R r	er
F f	ef	S s	es
G g	gė	Š š	eš
H h	ha	T t	tė
I i	i trumpoji	U u	u trumpoji
Į į	i nosinė	Ų ų	u nosinė
V v	vė	Ū ū	u ilgoji
Z z	zė	Ž ž	žė

3.3. Tabela de Declinação de Substantivos (Regras do Motor)

Caso	Masculino (Sing.)	Feminino (Sing.)	Plural (Geral)
Nominativo (Kas?)	-as, -is, -ys, -ius	-a, -ė	-ai, -iai / -os, -ės
Genitivo (Ko?)	-o, -io, -io, -iaus	-os, -ės	-ų, -ių (Regra de Ouro)
Acusativo (Ką?)	-ą, -ę, -į, -ų	-ą, -ę, -į, -ų	-us, -ius / -as, -es
Locativo (Kur?)	-e, -yje, -yje, -iuje	-oje, -ėje	-uose, -iuose / -ose, -ėse

3.4. Sistema de Verbos

Diferenciação obrigatória entre verbos regulares e o verbo irregular de estado:

* Verbo Būti (Irregular): 3ª pessoa (Jis/Ji/Jie/Jos) utiliza a forma fixa yra.
* 1ª Asmenuotė (Regulares): Terminações de presente: aš -u, tu -i, mes -ame, jūs -ate, jis/ji -a.
* Verbos de Ação: turėti, dirbti, norėti, eiti, gyventi, kalbėti, suprasti.

4. Cronograma de Estudos de 12 Semanas (Foco A1/A2)

Mês	Sem.	Tema de Conteúdo	Prática Recomendada
1	1	Fonética e Identidade	Alfabeto (nomes das letras) e saudações.
	2	Estruturas Iniciais	Números 0-20, pronomes e o verbo būti.
	3	Gêneros e Objetos	Identificação de substantivos M e F.
	4	Localização (Locativo)	Prática: "Aš esu Vilniuje" ou "darbe".
2	5	Rotina e Presente	Conjugação dos verbos dirbti e gyventi.
	6	Compras (Acusativo)	Prática de pedidos: "Aš noriu kavos".
	7	Tempo e Clima	Dias da semana e leitura de horas.
	8	Movimento e Direções	Verbos eiti/važiuoti e preposições į/iš.
3	9	Passado e Futuro Simples	Uso de buvo/būsiu e turėjo/turėsiu.
	10	Saúde e Trabalho	Vocabulário de bem-estar e atendimento ao cliente.
	11	Escrita Formal	Preenchimento de formulários e textos curtos.
	12	Simulado da Categoria I	Simulação de interação em compras e serviços (12 min).

5. Dashboard de Progresso e Gamificação

* Proficiency Heatmaps: Mapas de calor visualizando o domínio de cada caso gramatical (ex: precisão de 90% no Locativo).
* Competency Matrix (Categoria I): Matriz de conclusão de módulos obrigatórios:
  * [ ] Dados Pessoais: Identidade, idade e família.
  * [ ] Rotina e Clima: Descrição temporal e cotidiana.
  * [ ] Cidade e Transporte: Orientação espacial e meios de transporte.
  * [ ] Compras e Serviços: Interação em lojas, cafés e restaurantes.
  * [ ] Saúde e Emergência: Partes do corpo e sintomas simples.

6. Guia de Referência Rápida

Saudações e Educação:

* Formal: Labas rytas, Laba diena, Labas vakaras.
* Informal: Labas, Sveikas (m), Sveika (f), Iki.
* Gratidão/Desculpas: Ačiū, Prašom, Atsiprašau, Nieko tokio.

Pronomes e Possessivos (Módulo de Identidade Completo):

Pessoa	Pronome Pessoal	Pronome Possessivo
1ª Sing.	aš (eu)	mano (meu/minha)
2ª Sing.	tu (tu)	tavo (teu/tua)
3ª Sing.	jis / ji (ele/ela)	jo / jos (dele/dela)
1ª Plural	mes (nós)	mūsų (nosso/nossa)
2ª Plural	jūs (vocês)	jūsų (vosso/vossa)
3ª Plural	jie / jos (eles/elas)	jų (deles/delas)
