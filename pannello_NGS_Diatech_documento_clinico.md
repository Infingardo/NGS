# Pannello NGS Diatech Pharmacogenetics — Documento Clinico-Metodologico
## Guida all'interpretazione, alle indicazioni e ai limiti diagnostici e predittivi

**Documento redatto per uso interno — SC Anatomia Patologica, ASST Fatebenefratelli-Sacco, Milano**  
**Versione 1.5 — Febbraio 2026**  
**Riferimenti: AIOM 2024-2025, ESMO 2022, WHO CNS5 2021, FDA/EMA Feb 2026**  
**Tool online: https://infingardo.github.io/NGS/**

---

## 1. Cos'è il pannello NGS Diatech e perché esiste

Il pannello NGS Diatech Pharmacogenetics è un test di sequenziamento di nuova generazione (Next Generation Sequencing) sviluppato per identificare alterazioni molecolari con rilevanza clinica nei tumori solidi. Non è un test di ricerca: è uno strumento diagnostico e predittivo progettato per guidare decisioni terapeutiche concrete nel contesto della medicina di precisione oncologica.

Il pannello esiste perché la terapia oncologica moderna non si basa più soltanto sulla sede anatomica del tumore o sull'istotipo, ma richiede la conoscenza del profilo molecolare della neoplasia. Questo significa che due carcinomi del colon con lo stesso aspetto istologico possono richiedere trattamenti radicalmente diversi a seconda dello stato mutazionale di KRAS, BRAF, MSI e HER2. Il pannello NGS consente di ottenere queste informazioni in modo sistematico, riproducibile e su materiale fissato in formalina incluso in paraffina (FFPE), che è il materiale standard dell'anatomia patologica.

L'anatomopatologo ha un ruolo centrale e non delegabile in questo processo: è il custode del campione, il garante della qualità del materiale inviato al sequenziamento, l'interprete del risultato molecolare nel contesto morfologico, e il responsabile della refertazione integrata.

---

## 2. Cosa analizza: copertura tecnica del pannello

Il pannello Diatech copre quattro categorie di alterazioni molecolari:

### 2.1 SNV/InsDel (Varianti a singolo nucleotide e piccole inserzioni/delezioni)
Analisi di 48 geni: AKT1, ALK, AR, BRAF, CDK4, CDKN2A, CTNNB1, DDR2, EGFR, ERBB2, ERBB3, ERBB4, ESR1, FGFR1, FGFR2, FGFR3, FGFR4, GNA11, GNAQ, GNAS, HRAS, IDH1, IDH2, KEAP1, KIT, KRAS, MAP2K1, MET, MTOR, NF1, NRAS, NTRK1, NTRK2, NTRK3, PDGFRA, PIK3CA, POLE, PTEN, RAF1, RB1, RET, ROS1, SMAD4, SMO, STK11, TERT, TP53, TSC1.

Questi 48 geni non sono stati scelti casualmente: rappresentano i principali oncogeni e geni oncosoppressori con rilevanza clinica documentata nei tumori solidi più frequenti. Le mutazioni puntiformi e le piccole inserzioni/delezioni in questi geni possono attivare pathways oncogenici (es. KRAS G12D attiva RAS/MAPK), conferire resistenza a terapie (es. KRAS mutato blocca la risposta ad anti-EGFR), o definire l'identità nosologica del tumore (es. IDH1 R132H nel glioma).

### 2.2 Fusioni geniche
Analisi di 12 geni: ALK, FGFR1, FGFR2, FGFR3, MET, NRG1, NTRK1, NTRK2, NTRK3, PPARG, RET, ROS1.

Le fusioni geniche sono riarrangiamenti cromosomici che generano proteine chimeriche con attività chinasica costitutiva. Sono alterazioni particolarmente importanti perché spesso si trovano in tumori altrimenti privi di target, e perché rispondono in modo spettacolare agli inibitori di chinasi specifici. La fusione EML4-ALK nel carcinoma polmonare adenocarcinoma e la fusione ETV6-NTRK3 nel carcinoma secretorio mammario sono paradigmi di questo approccio.

### 2.3 CNV (Copy Number Variation — Variazioni del numero di copie)
Analisi di 3 geni: EGFR, ERBB2, MET.

L'amplificazione genica è un meccanismo oncogenico distinto dalla mutazione puntiforme: invece di alterare la sequenza del gene, ne moltiplica il numero di copie, producendo sovraespressione della proteina. L'amplificazione di ERBB2 (HER2) è il caso paradigmatico: è il driver principale nei tumori HER2+ mammari e gastrici, e la base biologica della terapia anti-HER2. L'amplificazione di MET in NSCLC è un meccanismo di resistenza acquisita agli inibitori di EGFR, e anche un target terapeutico primario quando presente come alterazione de novo.

### 2.4 MSI — Instabilità dei microsatelliti (Pannello Bethesda esteso)
8 marcatori nominali: BAT25 (KIT), BAT26 (MSH2), CAT25 (CASP2), MONO27 (MAP4K3), NR21 (SLC7A8), NR22 (STT3A), NR24 (ZNF3), NR27 (BIRC3), più 118 marcatori mononucleotidici aggiuntivi.

L'instabilità dei microsatelliti è generata dalla disfunzione del sistema di riparazione del DNA per errori di appaiamento (MMR — Mismatch Repair). Un tumore MSI-H (alta instabilità microsatellitare) accumula un numero molto elevato di mutazioni, diventando altamente immunogenico e sensibile all'immunoterapia con inibitori del checkpoint PD-1/PD-L1. Il pannello Bethesda esteso a 126 marcatori ha una sensibilità e specificità superiore ai pannelli storici a 5 marcatori, riducendo i falsi negativi in tumori con instabilità parziale o atipica.

**Importante**: MSI da NGS e dMMR da immunoistochimica non sono sinonimi. La IHC per MLH1, MSH2, MSH6 e PMS2 è il test di screening del sistema MMR a livello proteico; il pannello MSI-NGS è il test di conferma molecolare dell'instabilità. In casi discordanti (dMMR all'IHC, MSS all'NGS o viceversa) è necessaria una valutazione integrativa.

---

## 3. Cosa NON analizza: le lacune note del pannello

La conoscenza dei limiti di un pannello è almeno altrettanto importante della conoscenza di cosa copre. Il pannello Diatech non analizza:

**1p/19q codelezione**: richiesta per la diagnosi di oligodendroglioma secondo WHO CNS5 2021. Questo test richiede FISH o array-CGH su tessuto e deve essere richiesto separatamente in tutti i casi di glioma diffuso IDH-mutato senza fenotipo chiaro da astrocitoma.

**Pattern cromosomico +7/-10**: criterio molecolare per GBM IDH-wild type insieme ad amplificazione EGFR e mutazione TERT. Richiede FISH o array-CGH.

**CDKN2A/B delezione per grading**: la delezione omozigote di CDKN2A/B è criterio WHO 2021 per upgrade a grado 4 degli astrocitomi IDH-mutati. Il pannello rileva mutazioni puntiformi di CDKN2A, ma non le delezioni estese di tipo CNV per questo gene specifico.

**Fusione KIAA1549-BRAF**: la fusione più frequente nell'astrocitoma pilocitico non è rilevabile con il pannello fusioni standard perché genera un riarrangiamento su cui i primer del pannello non si mappano efficacemente. Richiedere FISH o RNA fusion panel dedicato.

**Metilazione del promotore MLH1**: il silenziamento epigenetico di MLH1 (causa di MSI-H sporadica, non Lynch) non è rilevabile con NGS standard. Richiedere metilazione specifica in casi selezionati.

**TMB (Tumor Mutational Burden) formale**: il pannello non calcola il TMB come numero di mutazioni per megabase nel senso richiesto per l'approvazione regolatoria FDA. La presenza di mutazioni di POLE o MSI-H è un surrogato indiretto di TMB elevato, ma non un TMB certificato.

**DPYD**: la profilazione farmacogenetica per tossicità da fluoropirimidine viene effettuata su sangue periferico tramite test dedicato (gestione integrata con Oncologia/Genetica), non è nel pannello tissutale NGS.

---

## 4. La distinzione fondamentale: ruolo diagnostico vs ruolo predittivo

Questa è la distinzione più importante nell'interpretazione del pannello, spesso trascurata nei refertari automatici e nella comunicazione con gli oncologi.

### 4.1 Ruolo diagnostico

Un biomarcatore ha ruolo diagnostico quando la sua presenza (o assenza) è necessaria per formulare o confermare la diagnosi nosologica del tumore, indipendentemente da qualsiasi implicazione terapeutica. Senza quel dato, la diagnosi è incompleta o scorretta secondo la classificazione vigente.

**Esempi paradigmatici:**

**IDH1/IDH2 nei gliomi**: La mutazione IDH1 R132H (o IDH2 R172K) definisce la categoria diagnostica "glioma IDH-mutato" secondo WHO CNS5 2021. Un glioma diffuso senza stato IDH noto non può essere correttamente classificato. La distinzione tra glioma IDH-mutato e IDH-wild type non è una raffinatezza accademica: ha implicazioni dirette sulla prognosi, sul trattamento adiuvante e sull'accesso a vorasidenib. Non si tratta di un biomarcatore accessorio testato "per vedere se c'è un target" — è la base della diagnosi stessa.

**TERT nei gliomi IDH-wild type**: La mutazione del promotore TERT (C228T o C250T) è uno dei criteri molecolari che, insieme all'amplificazione EGFR e/o al pattern +7/-10, definisce un glioma IDH-wild type come glioblastoma WHO Gr4 indipendentemente dal grado istologico. Un glioma IDH-wild type con soli criteri morfologici è classificato come "astrocitoma diffuso IDH-wild type" (Gr3 di default), ma se presenta due dei tre criteri molecolari diventa glioblastoma per definizione molecolare. Questa distinzione cambia la prognosi comunicata al paziente e il trattamento.

**CDKN2A delezione omozigote negli astrocitomi**: In un astrocitoma IDH-mutato, la delezione omozigote di CDKN2A/B è sufficiente per l'upgrade a WHO Gr4, anche in assenza di necrosi di coagulazione o proliferazione microvascolare all'esame istologico. Senza questo dato, un tumore che morfologicamente appare di basso grado potrebbe essere sottotrattato.

**GNAQ/GNA11 nel melanoma uveale**: La presenza di mutazione in GNAQ o GNA11 (~80% dei melanomi uveali) ha valore diagnostico differenziale quando la sede primitiva non è chiara, oltre al valore predittivo per tebentafusp.

### 4.2 Ruolo predittivo

Un biomarcatore ha ruolo predittivo quando la sua presenza (o assenza) predice la risposta o la resistenza a un trattamento specifico. È il contesto che l'oncologo conosce meglio e per cui tipicamente richiede il test.

**Esempi paradigmatici:**

**KRAS/NRAS nel CRC metastatico**: La mutazione in esoni 2, 3, 4 di KRAS o NRAS predice la resistenza agli anticorpi anti-EGFR (cetuximab, panitumumab). Il paziente wild-type ha accesso a questi farmaci; il paziente mutato no. È un biomarcatore predittivo negativo: la mutazione non predice risposta a niente, predice resistenza a qualcosa.

**EGFR nell'adenocarcinoma polmonare**: Le mutazioni sensitizing (esone 19 delezione, L858R) predicono la risposta agli inibitori EGFR. T790M predice la resistenza agli inibitori di I-II generazione e la risposta a osimertinib. È un biomarcatore predittivo positivo per la terapia target.

**PIK3CA nel carcinoma mammario HR+ HER2-**: La mutazione predice la risposta ad alpelisib in combinazione con fulvestrant, con approvazione FDA/EMA.

### 4.3 Perché la distinzione è clinicamente critica

Il problema nasce quando un biomarcatore con ruolo diagnostico primario viene letto dall'oncologo come un semplice target terapeutico. Tre scenari concreti di errore interpretativo:

**Scenario A — IDH1 e vorasidenib in Gr4**: Un oncologo legge "IDH1 R132H mutato" e pensa a vorasidenib. Vorasidenib è approvato FDA per gliomi IDH-mutati di grado 1-2 (WHO 2021). Se il referto non specifica che il tumore è astrocitoma IDH-mutato WHO Gr4 (per delezione CDKN2A), l'oncologo potrebbe prescrivere vorasidenib in un contesto fuori indicazione, con potenziale danno al paziente e problemi medico-legali per il refertante.

**Scenario B — TERT come "target"**: Un oncologo inespert legge "mutazione TERT" e cerca un farmaco correlato. TERT non ha target approvati nel glioma. La sua presenza è un criterio classificativo. Il referto deve essere esplicito su questo, altrimenti genera confusione e richieste inappropriate.

**Scenario C — CDKN2A e CDK4/6 inibitori**: La delezione di CDKN2A nel glioma non è indicazione a palbociclib. I CDK4/6 inibitori sono approvati nel carcinoma mammario HR+. Nel glioma sono sperimentali. Se il referto riporta "CDKN2A perso" senza contestualizzazione, un oncologo potrebbe erroneamente associare la perdita di questo gene soppressore a un'indicazione terapeutica che non esiste in quel contesto.

**La soluzione**: il referto molecolare per i biomarcatori con ruolo diagnostico deve contenere due sezioni distinte — una di classificazione nosologica e una di implicazione terapeutica — con esplicita indicazione di dove l'indicazione approvata si applica e dove no.

---

## 5. Scenario per scenario: razionale delle scelte di testing

### 5.1 Carcinoma Colorettale (CRC)

Il CRC è lo scenario oncologico molecolare più consolidato. Il testing molecolare è standard of care da oltre un decennio.

**KRAS/NRAS** (esoni 2, 3, 4): test obbligatorio in tutti i CRC metastatici prima di qualsiasi decisione su anti-EGFR. La mutazione in qualsiasi esone dei due geni controindica cetuximab e panitumumab. Circa il 55-60% dei CRC è mutato in almeno uno dei due geni. Il referto deve indicare esplicitamente lo stato wild-type o mutato, e in caso di mutazione, il gene e il codone specifico — "KRAS mutato esone 2, codone 12, variante G12D".

**BRAF V600E**: test obbligatorio in tutti i CRC metastatici. La presenza di V600E ha valore sia prognostico (prognosi sfavorevole) che predittivo (sensibilità a encorafenib+binimetinib in II linea, e come informazione per la strategia di I linea). La V600E nel CRC è arricchita nei tumori MSI-H sporadici con silenziamento MLH1, ma non è esclusiva: può presentarsi anche in tumori MSS. Non commettere l'errore di assumere che "BRAF V600E = MSI-H".

**MSI/dMMR**: test obbligatorio in tutti i CRC, su biopsia o pezzo operatorio. MSI-H è indicazione a pembrolizumab in I linea (approvazione FDA/EMA). È anche il gateway per lo screening della sindrome di Lynch: in presenza di dMMR all'IHC, soprattutto con perdita di MLH1 isolata, è necessaria la valutazione della metilazione del promotore MLH1 e, se negativa, la consulenza genetica per test germinale. L'IHC per le quattro proteine MMR (MLH1, MSH2, MSH6, PMS2) rimane il test di screening; il pannello MSI-NGS è la conferma molecolare.

**ERBB2 (HER2)**: testing indicato nei CRC RAS/BRAF wild-type refrattari. L'amplificazione o mutazione attivante di HER2 può orientare verso terapia anti-HER2 (trastuzumab+pertuzumab off-label, o in trial). L'algoritmo corretto è IHC → FISH se 2+ → NGS per mutazioni attivanti se IHC/FISH negativi.

**NTRK1/2/3**: fusioni rare (<1% nel CRC) ma con approvazione agnostica FDA/EMA per larotrectinib ed entrectinib. Nel CRC sono prevalenti nei tumori MSI-H e nei tumori MSS RAS/BRAF wild-type. Non giustificano il testing universale in I linea secondo le linee guida AIOM 2024, ma vanno ricercate in contesti selezionati (CRC MSI-H, CRC wild-type dopo esaurimento linee standard).

### 5.2 Carcinoma Polmonare Non a Piccole Cellule (NSCLC)

Nel NSCLC il testing molecolare è cambiato il paradigma terapeutico più di qualsiasi altra neoplasia. Nell'adenocarcinoma polmonare avanzato, il reflex testing completo è obbligatorio prima dell'inizio di qualsiasi trattamento sistemico.

**EGFR**: test obbligatorio (reflex) in tutti gli adenocarcinomi polmonari avanzati o metastatici. Le mutazioni sensitizing (esone 19 delezione, esone 21 L858R) sono presenti in ~15% degli ADC caucasici e ~40% degli ADC asiatici. Indicano osimertinib in I linea. T790M è la mutazione di resistenza acquisita agli inibitori di I-II generazione e indica osimertinib. L'amplificazione EGFR (CNV) può co-occorrere con mutazioni e ha implicazioni per i meccanismi di resistenza.

**ALK**: test obbligatorio in ADC polmonare. Le fusioni ALK (~5% ADC) indicano inibitori ALK di II-III generazione (alectinib, brigatinib, lorlatinib). Lo screening IHC con clone D5F3 su piattaforma Ventana ha alta sensibilità e specificità; NGS è raccomandato per la conferma e per tipizzare il partner di fusione. ALK e EGFR sono mutualmente esclusivi nella quasi totalità dei casi.

**ROS1**: fusioni (~1-2% NSCLC) indicano crizotinib o entrectinib. L'IHC per ROS1 ha specificità inferiore rispetto ad ALK, quindi NGS o FISH sono preferibili per la conferma. Tipico in non-fumatori giovani.

**MET exon 14 skipping**: mutazione che elimina il sito di ubiquitinazione di MET, prevenendone la degradazione e portando ad attivazione costitutiva. ~3-4% degli ADC polmonari. Indica tepotinib o capmatinib. Distinta dall'amplificazione MET (meccanismo di resistenza acquisita ad EGFR TKI).

**KRAS G12C**: ~13% degli ADC caucasici. Sotorasib e adagrasib sono approvati FDA/EMA per NSCLC KRAS G12C-mutato. Attenzione: solo G12C è targetabile con farmaci approvati. Gli altri codoni 12 (G12D, G12V, G12A ecc.) non hanno target approvati. Il referto deve specificare la variante esatta, non limitarsi a "KRAS mutato".

**STK11 e KEAP1**: non sono target, ma predittori negativi di risposta all'immunoterapia. La co-presenza di mutazioni in entrambi i geni è associata a ridotta risposta a pembrolizumab anche in pazienti con PD-L1 alto (>50%). Dati di fase III confermano l'impatto anche sull'efficacia di sotorasib in KRAS G12C. Riportarli nel referto orientativo in NSCLC ADC perché cambiano la probabilità di risposta all'immunoterapia.

### 5.3 Carcinoma Gastrico e della Giunzione Esofago-Gastrica (GEJ)

**ERBB2 (HER2)**: testing obbligatorio in tutti gli adenocarcinomi gastrici/GEJ metastatici. L'amplificazione (IHC 3+ o IHC 2+/FISH+) indica trastuzumab in I linea. L'eterogeneità intratumorale è marcata nel gastrico: campionamento multiplo (almeno 5-7 biopsie) è raccomandato. Il CNV dal pannello NGS è un test complementare, non sostitutivo di IHC+FISH.

**FGFR2**: amplificazione o fusioni di FGFR2 (~7-10% degli adenocarcinomi gastrici) indicano bemarituzumab (anti-FGFR2b). Il test IHC con anticorpo anti-FGFR2b su piattaforma BenchMark (Ventana) è raccomandato per la selezione; NGS per la conferma e per identificare fusioni. Il test è preferibilmente eseguito in pazienti HER2-negativi e non MSI-H.

**MSI-H**: ~9% dei carcinomi gastrici. Indica pembrolizumab in I linea. I tumori gastrici MSI-H hanno una prognosi relativamente migliore rispetto ai tumori MSS e rispondono molto bene all'immunoterapia.

### 5.4 Carcinoma Mammario

**ERBB2**: amplificazione genica (IHC 3+ o IHC 2+/FISH+) definisce il sottotipo HER2+. Importante distinguere: l'amplificazione indica trastuzumab/pertuzumab; le mutazioni attivanti del dominio kinasico di ERBB2 (L755S, V777L, ecc.) in assenza di amplificazione indicano trastuzumab deruxtecan (T-DXd) — meccanismo completamente diverso.

**PIK3CA**: mutazione in ~40% dei carcinomi HR+ HER2-. Indica alpelisib in combinazione con fulvestrant in II linea (dopo progressione a CDK4/6 inibitore + ormonoterapia). Le varianti più frequenti sono E545K, E542K (esone 9) e H1047R (esone 20).

**ESR1**: mutazioni acquisite (D538G, Y537S/C/N) si sviluppano sotto pressione selettiva degli inibitori dell'aromatasi. Indicano resistenza agli AI e risposta a elacestrant. Il test su ctDNA in progressione è più informativo del test su tessuto primario, che precede l'esposizione agli AI.

**AKT1** (E17K) e **PTEN** (loss): fanno parte del profilo PIK3CA/AKT1/PTEN altered che seleziona i pazienti per capivasertib+fulvestrant (approvazione FDA 2023).

### 5.5 Melanoma

**BRAF V600E/V600K**: test obbligatorio in tutti i melanomi metastatici. V600E (~50%) e V600K (~10%) indicano terapia combinata BRAF+MEK inibitori in I linea. Le varianti non-V600 non rispondono agli inibitori approvati. Lo screening IHC con anticorpo VE1 è rapido e affidabile per V600E; NGS è necessario per le varianti non-V600.

**GNAQ/GNA11 nel melanoma uveale**: le mutazioni di questi geni (attivatori di Gq) sono presenti in ~80% dei melanomi uveali e quasi assenti negli altri sottotipi. Hanno valore diagnostico differenziale. Tebentafusp, un bispecifico anti-gp100/CD3, è approvato FDA (2022) per melanoma uveale metastatico HLA-A*02:01+ come prima terapia approvata specifica per questo sottotipo.

**KIT nel melanoma acrale e delle mucose**: a differenza del melanoma cutaneo classico, i melanomi acrali e delle mucose hanno un profilo mutazionale diverso, con frequenza di mutazioni KIT (~15-20%) che può rispondere a imatinib o nilotinib.

### 5.6 Carcinoma Pancreatico (PDAC) e Colangiocarcinoma (CCA)

**KRAS nel PDAC**: mutato in ~90% dei PDAC. La tipizzazione esatta del codone 12 è clinicamente critica: G12C (~1%) indica sotorasib/adagrasib; G12D (~40%) è oggetto di trial con MRTX1133; G12V (~30%) non ha target approvati. Un referto che riporta solo "KRAS mutato" senza specificare la variante è clinicamente incompleto nel 2026.

**FGFR2 nel CCA intraepatico**: fusioni FGFR2 in ~10-15% dei colangiocarcinomi intraepatici. Indicano inibitori FGFR (pemigatinib, infigratinib, futibatinib), tutti approvati FDA/EMA. Sono rare nel CCA extraepatico e nel PDAC. Il testing NGS è obbligatorio in tutti i CCA intraepatici al momento della diagnosi di malattia avanzata.

**IDH1/IDH2 nel CCA intraepatico**: mutazioni in ~15-20% dei CCA intraepatici. IDH1 indica ivosidenib in mantenimento (approvato FDA). Ha anche valore diagnostico differenziale con tumori epatici primari di altra natura.

### 5.7 GIST

**KIT**: mutato in ~85% dei GIST. La tipizzazione dell'esone è fondamentale per la dose di imatinib: esone 11 → 400 mg/die (risposta ottimale); esone 9 → 800 mg/die (necessità di dose maggiore per superare la ridotta affinità); esoni 13 e 17 → resistenza primaria a imatinib, necessità di TKI di seconda generazione.

**PDGFRA D842V**: la mutazione D842V (esone 18) è resistente a imatinib per resistenza strutturale del sito di legame. Indica avapritinib, specificamente approvato per questa variante. Le altre varianti di PDGFRA (esoni 12, 14) mantengono sensibilità a imatinib.

### 5.8 Carcinoma Tiroideo

**BRAF V600E nel carcinoma anaplastico (ATC)**: l'ATC è la neoplasia tiroidea più aggressiva, con sopravvivenza mediana di settimane. BRAF V600E è presente in ~40-50% degli ATC. Dabrafenib+trametinib è approvato FDA per ATC BRAF V600E-mutato e la sua identificazione è un'urgenza clinica. Il referto deve segnalare questo in modo esplicito.

**RET nel carcinoma midollare (MTC)**: le mutazioni germinali di RET definiscono la sindrome MEN2 (MEN2A con RET C634, MEN2B con RET M918T). Lo screening germinale è obbligatorio in tutti i pazienti con MTC alla diagnosi e implica lo screening dei familiari. Le mutazioni somatiche di RET (~40% MTC sporadici) indicano selpercatinib o pralsetinib.

**TERT promoter nel DTC (carcinoma differenziato)**: le mutazioni C228T e C250T del promotore TERT indicano prognosi sfavorevole nel carcinoma papillare e follicolare. La co-presenza di TERT promoter mutato + BRAF V600E ("doppio hit") identifica un sottogruppo ad alto rischio di recidiva e mortalità specifica.

### 5.9 Gliomi e Tumori del SNC (WHO CNS5 2021)

Il capitolo SNC è il più complesso perché qui la distinzione diagnostico/predittivo è massima e le conseguenze di una confusione sono clinicamente rilevanti.

**IDH1/IDH2 — ruolo diagnostico primario**: La mutazione IDH (R132H in IDH1, R172K in IDH2) definisce la categoria dei gliomi diffusi IDH-mutati. Senza questo dato, la classificazione WHO 2021 è incompleta. IDH1 R132H è identificabile con IHC (anticorpo anti-IDH1 R132H) come test di screening rapido su tessuto FFPE; le varianti non-R132H e IDH2 richiedono NGS. Vorasidenib è approvato FDA (2023) per gliomi IDH-mutati di basso grado (WHO Gr1-2), ma la sua applicazione richiede la conoscenza del grading completo — che a sua volta richiede 1p/19q e CDKN2A/B, non coperti da questo pannello.

**TERT promoter — ruolo diagnostico in GBM**: In un glioma IDH-wild type, la mutazione TERT promoter è uno dei tre criteri molecolari per la diagnosi di GBM (insieme ad amplificazione EGFR e +7/-10). Non ha target terapeutici approvati nel glioma. Non va confuso con TERT nel contesto del carcinoma tiroideo differenziato, dove ha un ruolo prognostico diverso.

**EGFR amplificazione — ruolo diagnostico in GBM**: L'amplificazione EGFR (CNV) è criterio molecolare per GBM IDH-WT secondo WHO 2021. TKI anti-EGFR hanno mostrato risposta assente o marginale nel GBM classico a causa di eterogeneità tumorale e vie di bypass. La variante EGFRvIII (delezione esone 2-7) è rilevabile con NGS e può orientare verso trial specifici.

**CDKN2A delezione omozigote — ruolo diagnostico di grading**: In astrocitoma IDH-mutato, la delezione omozigote di CDKN2A/B è criterio sufficiente per grading WHO Gr4. CDK4/6 inibitori non sono indicati nel glioma fuori da trial clinici — la perdita di CDKN2A nel glioma non è indicazione a palbociclib.

**BRAF V600E nei gliomi pediatrici e PXA**: ruolo misto diagnostico-predittivo. Diagnostico perché orienta verso PXA o glioma pediatrico di basso grado; predittivo perché indica dabrafenib+trametinib (approvati FDA/EMA per glioma pediatrico di basso grado BRAF V600E-mutato). Le fusioni KIAA1549-BRAF tipiche dell'astrocitoma pilocitico non sono rilevabili con il pannello standard.

---

## 6. Il sistema di classificazione: logica patologica

Le priorità nel tool NGS Decision Support v1.5 sono definite secondo la prospettiva dell'anatomopatologo, non dell'oncologo. La domanda di riferimento non è "esiste un farmaco approvato?" ma "cosa fa questo risultato per il mio referto?".

**🔬 DIAGNOSTICO** significa: il risultato cambia la diagnosi nosologica o il grading secondo la classificazione WHO/AIOM vigente. Senza questo dato il referto è incompleto o nosologicamente errato. Esempi: IDH1/2 nel glioma (definisce la categoria diagnostica WHO CNS5 2021), MSI in CRC/gastrico/endometrio (fenotipo MSI-H, gateway per screening Lynch — test che l'anatomopatologo già esegue con IHC MMR), TERT in GBM IDH-WT (criterio molecolare WHO per grading), CDKN2A delezione omozigote in astrocitoma IDH-mutato (upgrade obbligatorio a Gr4), GNAQ/GNA11 nel melanoma uveale (diagnosi differenziale molecolare).

**📋 REFERTUALE** significa: non cambia la diagnosi, ma l'informazione appartiene al referto patologico perché caratterizza biologicamente la neoplasia o ha valore prognostico rilevante che il clinico deve conoscere dal referto stesso, non da una consulenza separata. Esempi: BRAF V600E nel CRC (fenotipo serrated, prognosi sfavorevole, arricchimento in MSI-H sporadici), KIT/PDGFRA nel GIST con tipizzazione dell'esone (la dose di imatinib dipende dall'esone — informazione che appartiene alla caratterizzazione molecolare del tumore stromale), STK11/KEAP1 in NSCLC (predittori negativi di risposta all'IO che il patologo segnala nel referto molecolare), TERT promoter nel DTC tiroideo (prognosi, co-presenza con BRAF V600E = "doppio hit" ad alto rischio).

**💊 TERAPEUTICO** significa: il valore primario è per il clinico. Il patologo esegue il test e lo referta, ma la decisione conseguente (quale farmaco, quale linea, quale trial) appartiene all'oncologo. Esempi: KRAS/NRAS in CRC (il clinico esclude l'anti-EGFR), EGFR/ALK/ROS1 in NSCLC (il clinico sceglie il TKI), ERBB2 in gastrico e mammella (il clinico imposta la terapia anti-HER2), PIK3CA in mammella HR+ (il clinico valuta alpelisib), FGFR2 in CCA (il clinico valuta l'inibitore FGFR).

**La distinzione non è semantica**: ha ricadute dirette sulla struttura del referto, sulla comunicazione con il clinico, e sulla responsabilità medico-legale. Un biomarcatore Diagnostico non refertato è un referto incompleto. Un biomarcatore Terapeutico non aggiunge informazione diagnostica — aggiunge informazione terapeutica che il clinico deve contestualizzare.

**Questa classificazione non è statica**: nuove approvazioni FDA/EMA o nuove edizioni WHO possono spostare un biomarcatore da Terapeutico a Diagnostico (es. se un futuro aggiornamento WHO incorpora un nuovo criterio molecolare). Il documento deve essere aggiornato periodicamente (almeno semestralmente). Versione corrente: https://infingardo.github.io/NGS/

---

## 7. Integrazione nel flusso di lavoro dell'anatomia patologica

### 7.1 Selezione del campione

Il pannello NGS richiede materiale con adeguata cellularità tumorale (generalmente >20-30%). L'anatomopatologo è responsabile della selezione delle sezioni o dei blocchi da inviare al laboratorio molecolare. La qualità del DNA estratto da FFPE è critica: materiale sovrafissato o con ampie aree necrotiche può produrre risultati falsamente negativi per varianti in bassa frequenza allelica.

In biopsie piccole (NSCLC su biopsia broncoscopica, gastrico su biopsie endoscopiche), la cellularità tumorale deve essere verificata prima dell'estrazione. In presenza di insufficiente materiale, comunicarlo tempestivamente all'oncologo per valutare la necessità di una nuova biopsia o di test su biopsia liquida (ctDNA).

### 7.2 Flusso delle richieste

Il flusso standard nell'ASST FBF-Sacco prevede:
- Testing IHC per MMR, CLDN18.2, HER2 eseguito internamente
- Testing NGS per il pannello Diatech eseguito in collaborazione con il Laboratorio Molecolare ASST FBF-Sacco (sede Sacco-Buzzi)
- FISH per HER2 (se IHC 2+), ALK (conferma), ROS1 eseguito internamente o in collaborazione
- Test per 1p/19q, KIAA1549-BRAF, array-CGH richiedono laboratori di riferimento

Il TAT (Turnaround Time) per il pannello NGS è di circa 10 giorni lavorativi. Per i casi urgenti (ATC tiroideo, GBM in paziente giovane) è possibile richiedere priorità con nota esplicita nella richiesta.

### 7.3 Refertazione integrata

Il referto molecolare non deve essere un elenco di varianti trovate o non trovate. Deve contenere:

1. **Risultato tecnico**: variante identificata, frequenza allelica (VAF), qualità della sequenza
2. **Interpretazione biologica**: significato funzionale della variante (attivante, inattivante, variante di significato incerto)
3. **Implicazione diagnostica** (se applicabile): quale categoria nosologica la variante supporta o esclude
4. **Implicazione terapeutica**: quale farmaco è indicato o controindicato, con nota sul livello di evidenza e sullo stato regolatorio
5. **Limiti del test**: cosa il pannello non ha analizzato e che potrebbe essere rilevante per il caso specifico

---

## 8. Livelli di evidenza usati nel tool

### Classificazione patologica del biomarcatore

| Livello | Definizione |
|---------|-------------|
| 🔬 Diagnostico | Cambia la diagnosi nosologica o il grading (WHO/AIOM) |
| 📋 Refertuale | Completa il referto con informazione biologica/prognostica rilevante |
| 💊 Terapeutico | Valore primario per il clinico — il patologo lo referta, l'oncologo lo usa |

### Livello di evidenza regolatoria

| Livello | Definizione |
|---------|-------------|
| FDA I linea | Approvazione FDA come companion diagnostic o terapia di prima linea |
| EMA | Approvazione EMA (può essere in sede diversa dall'approvazione FDA) |
| NCCN Cat 1 | NCCN Category 1: evidenza di alta qualità uniforme, consenso unanime che il trattamento è appropriato |
| AIOM | Linee guida AIOM italiane (aggiornamento 2024-2025) |
| Trial F3 | Trial clinico di fase III con risultati pubblicati, senza approvazione regolatoria vigente |
| Trial F2 | Trial clinico di fase II con risultati preliminari |
| Off-label | Uso al di fuori dell'indicazione approvata, con evidenza da trial o case series |
| Prognostico | Solo valore prognostico, nessun target approvato correlato |
| Diag WHO | Criterio diagnostico della classificazione WHO (CNS5 2021 o altre edizioni) |

---

## 9. Domande frequenti sull'uso del tool e del pannello

**D: Il pannello NGS può sostituire l'IHC per HER2 nel gastrico?**  
R: No. L'IHC rimane il test primario per HER2 nel gastrico, con la FISH come test di conferma per i casi 2+. Il CNV del pannello NGS è complementare ma non sostitutivo dell'algoritmo IHC+FISH validato negli studi clinici registrativi.

**D: Se il pannello MSI è positivo (MSI-H), devo fare anche l'IHC per MMR?**  
R: Sì, in linea generale. L'IHC per le quattro proteine MMR fornisce informazioni diverse (quale proteina è persa, quindi quale gene è alterato) e is necessaria per lo screening Lynch. MSI-NGS e dMMR-IHC sono test complementari, non sononimi.

**D: KRAS G12C nel PDAC: è lo stesso che KRAS G12C nel NSCLC?**  
R: Biologicamente sì — è la stessa mutazione. Terapeuticamente, sotorasib e adagrasib sono approvati in NSCLC. Nel PDAC, G12C è rara (~1%) e non ha approvazione specifica; trial clinici sono in corso. Il contesto tumorale influenza la risposta anche in presenza della stessa mutazione driver.

**D: STK11 e KEAP1 sono nei geni URGENTE?**  
R: No, sono ALTO. Non sono companion diagnostic: non esiste un farmaco approvato "perché STK11 mutato". Sono predittori negativi: la loro presenza riduce la probabilità di risposta all'immunoterapia. Questa distinzione è importante per la comunicazione con l'oncologo.

**D: Perché TERT non ha un farmaco associato?**  
R: TERT è una telomerasi — inibire TERT ha effetti su tutti i tessuti a rapido rinnovamento, non solo sul tumore. Gli inibitori di TERT in sviluppo clinico non hanno ancora prodotto approvazioni. Nel glioma, TERT è usato come criterio classificativo; nel DTC tiroideo come marker prognostico.

---

## 10. Riferimenti normativi e bibliografici

- AIOM — Linee Guida Tumori del Colon 2024 (www.aiom.it)
- AIOM — Linee Guida Tumori del Retto e dell'Ano 2025
- ESMO Clinical Practice Guidelines — Metastatic Colorectal Cancer 2022
- ESMO Clinical Practice Guidelines — Early and Locally Advanced NSCLC 2022
- WHO Classification of Tumours of the Central Nervous System, 5th Edition (WHO CNS5 2021)
- FDA Hematology/Oncology Approvals — aggiornamento febbraio 2026
- EMA — European Public Assessment Reports — aggiornamento febbraio 2026
- NCCN Clinical Practice Guidelines in Oncology — aggiornamento 2025
- Diatech Pharmacogenetics — documentazione tecnica pannello NGS
- Roche Diagnostics — VENTANA CLDN18 (43-14A) RxDx Assay, brochure tecnica
- EMA — Guidelines on the use of fluoropyrimidines and DPD deficiency testing (2020)
- Louis DN et al. — The 2021 WHO Classification of Tumors of the Central Nervous System. Neuro-Oncology 2021
- Vorasidenib (INDIGO trial) — Mellinghoff IK et al. NEJM 2023

---

*Documento prodotto per uso interno di reparto — SC Anatomia Patologica, ASST Fatebenefratelli-Sacco, Milano.*  
*Non destinato alla distribuzione esterna. Aggiornamento previsto: settembre 2026.*  
*Curatore: Direttore SC Anatomia Patologica.*
