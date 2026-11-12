# NGS Panel — Decision Support

**Strumento ad uso interno di reparto · ASST FBF-Sacco · SC Anatomia Patologica FBF-Melloni-Territorio**

[![Versione](https://img.shields.io/badge/versione-2.0-green)](https://infingardo.github.io/NGS/)
[![Pannello](https://img.shields.io/badge/pannello-Diatech_Pharmacogenetics-blue)](https://infingardo.github.io/NGS/)
[![Revisione generale](https://img.shields.io/badge/revisione_generale-marzo_2026-orange)](https://infingardo.github.io/NGS/)
[![Aggiornamento parziale](https://img.shields.io/badge/aggiornamento_parziale-novembre_2026-yellow)](https://infingardo.github.io/NGS/)

---

## Accesso

**→ [infingardo.github.io/NGS](https://infingardo.github.io/NGS/)**

---

## Descrizione

Tool HTML/JS standalone per il supporto decisionale in anatomia patologica oncologica molecolare.  
Basato sul pannello NGS **Diatech Pharmacogenetics v3** (SNV/InsDel + Fusioni + CNV + MSI).  
Sviluppato per uso interno — non sostituisce linee guida AIOM/ESMO/WHO né il giudizio clinico.

---

## Pannello Diatech v3 — cosa analizza

| Tipo | Geni / Marcatori |
|------|-----------------|
| **SNV / InsDel** | 48 geni (KRAS, EGFR, BRAF, IDH1/2, TERT, PIK3CA, ecc.) |
| **Fusioni geniche** | 12 geni (ALK, RET, NTRK1/2/3, ROS1, FGFR1/2/3, NRG1, ecc.) |
| **CNV** | 3 geni (EGFR, ERBB2, MET) |
| **MSI** | 126 marcatori (pannello Bethesda esteso) |

### Cosa il pannello **NON** analizza

- 1p/19q codelezione → oligodendroglioma (FISH/CGH)
- +7/−10 cromosomico → GBM IDH-WT (FISH/CGH)
- KIAA1549-BRAF fusione → astrocitoma pilocitico (RNA panel)
- CDKN2A/B delezione omozigote → grading astrocitomi WHO Gr4 (FISH/CGH)
- Metilazione MLH1 → sporadico vs Lynch
- TMB formale (mut/Mb) → pannello ampio dedicato
- DPYD germinale → sangue
- PD-L1 → solo IHC (22C3/28-8/SP263)
- CLDN18.2 → solo IHC (Ventana 43-14A RxDx)

## Diagnostica molecolare complementare — invii esterni mirati

**Promemoria operativo (12/11/2026).** Selezione dei test più utili nella diagnostica corrente **non eseguibili con il pannello Diatech v3**. Non è un catalogo di tutte le indagini molecolari né una dichiarazione che tali esami siano indisponibili in ogni laboratorio della rete: **verificare la disponibilità locale** e richiedere un invio esterno solo quando necessario. L'indicazione nasce sempre da **morfologia, IHC, sede e quesito diagnostico**; il pannello NGS negativo non sostituisce un test strutturale, di metilazione o germinale non previsto dal kit.

| Ambito / scenario | Test complementare | Quando richiederlo | Metodica e limite interpretativo |
|---|---|---|---|
| **SNC — glioma IDH-mutato con ATRX conservato**, sospetto oligodendroglioma | **Codelezione completa 1p/19q** | Necessaria per la diagnosi integrata di oligodendroglioma | Preferibile profilo *whole-arm* tramite SNP-array/array-CGH o metodica CNV validata; la FISH a singoli loci può confondere delezioni parziali con codelezione completa |
| **SNC — astrocitoma IDH-mutato** | **Delezione omozigote CDKN2A/B** | Ricerca del criterio molecolare di **CNS WHO grado 4** anche senza necrosi/proliferazione microvascolare | FISH, MLPA, array-CGH/SNP-array o CNV dedicata; distinguere delezione **omozigote** da eterozigote. La variante SNV di CDKN2A eventualmente presente nel kit non documenta la delezione |
| **SNC — glioma diffuso IDH-wildtype dell'adulto** senza criteri istologici di grado 4 | **Profilo cromosomico +7/−10** | Se necessario per la classificazione integrata e non già risolta da **mutazione TERT** o **amplificazione EGFR** nei contesti WHO pertinenti | Profilo genomico CNV o FISH adeguatamente validata; il criterio è **gain del cromosoma 7 e loss del cromosoma 10**, non una singola alterazione focale |
| **SNC — glioblastoma** | **Metilazione del promotore MGMT** | Biomarker **predittivo** di beneficio dagli agenti alchilanti, particolarmente rilevante nelle decisioni sulla temozolomide | Test di metilazione validato (es. pirosequenziamento); **non** definisce il tipo tumorale o il grado |
| **Ematopatologia — linfoma B a grandi cellule/aggressivo** | **FISH MYC**, poi **BCL2/BCL6** se MYC riarrangiato | Identificazione di riarrangiamenti con impatto classificativo e clinico | FISH *break-apart* e, se indicato, partner di MYC. **MYC/BCL2 double-expressor IHC ≠ double-hit**. Nella **WHO-HAEM5**, la categoria DLBCL/HGBCL con MYC e BCL2 riarrangiati non comprende i soli MYC/BCL6 |
| **CRC o carcinoma endometriale dMMR** con perdita IHC di **MLH1/PMS2** | **Metilazione del promotore MLH1** | Triage della possibile eziologia sporadica e del percorso per sindrome di Lynch | Metilazione su DNA tumorale. **BRAF V600E è utile come triage solo nel CRC**, non nell'endometrio; BRAF wildtype non esclude metilazione MLH1. Un risultato metilato non esclude in assoluto un rischio ereditario in presenza di forte sospetto clinico |
| **Tessuti molli — tumore adipocitico atipico o sospetto liposarcoma dedifferenziato** | **Amplificazione MDM2** | Differenziale con lipoma, lesione adipocitica benigna e altri sarcomi | Preferire FISH/analisi CNV validata; IHC MDM2/CDK4 da sola non equivale a prova di amplificazione |
| **Tessuti molli — sospetto sarcoma sinoviale** | **Riarrangiamento SS18 / fusione SS18::SSX** | Conferma di un'ipotesi formulata su morfologia e IHC | FISH SS18 oppure RNA-seq mirato alla fusione; privilegiare la dimostrazione del partner quando necessaria |
| **Tessuti molli — sospetta fascite nodulare**, specie lesioni profonde, atipiche o su piccola biopsia | **Riarrangiamento USP6** | Supporto al differenziale con neoplasie fusocellulari maligne | FISH USP6 o RNA-seq mirato; la negatività non esclude la diagnosi per limiti preanalitici, analitici o eterogeneità dei partner |

**Caso mirato, non test di routine:** per **fascite/miosite proliferativa dell'adulto** con cellule simil-gangliari, **FOS** (IHC e, selettivamente, FISH/RNA-seq) è più pertinente di USP6 come prima ipotesi molecolare. Il dato è ancora da integrare criticamente: una serie del 2026 ha documentato espressione nucleare diffusa di FOS in circa il 60% dei casi adulti e sensibilità non ottimale delle indagini di riarrangiamento. **Un FOS negativo non esclude la lesione**. Non estendere automaticamente il test a tutte le proliferazioni miofibroblastiche.

**Prima dell'invio:** selezionare il blocco a maggior contenuto lesionale, stimare cellularità e fissazione, indicare il quesito differenziale, specificare **tipo di alterazione cercata** (fusione, amplificazione, delezione, metilazione), metodica richiesta e limite atteso di un risultato negativo. Evitare FISH generiche **EWSR1** come screening indiscriminato: il riarrangiamento, senza partner e contesto morfologico, è poco specifico.

**Riferimenti selezionati:**
- [EANO, strumenti diagnostici molecolari per WHO CNS5 (2023)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10547522/): codelezione *whole-arm*, CDKN2A/B e +7/−10; [EANO, gliomi diffusi (2021)](https://pmc.ncbi.nlm.nih.gov/articles/PMC7904519/): MGMT e triage.
- [EHA, Large B-cell lymphoma Clinical Practice Guidelines (2025)](https://onlinelibrary.wiley.com/doi/full/10.1002/hem3.70207): strategia FISH MYC → BCL2/BCL6.
- [EMQN, best practice per MSI/dMMR (2025)](https://pmc.ncbi.nlm.nih.gov/articles/PMC12816731/): metilazione MLH1 e limiti di BRAF.
- [Linee guida di testing molecolare nei sarcomi (2023)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10209662/): selezione morphology-based; [guideline MDM2/SS18 (2020)](https://pubmed.ncbi.nlm.nih.gov/32092619/).
- [USP6 e fascite nodulare (2025)](https://pubmed.ncbi.nlm.nih.gov/41293881/); [FOS nella fascite/miosite proliferativa (AJSP, 2026)](https://pubmed.ncbi.nlm.nih.gov/41882504/).

---

## Funzionalità principali

### Due modalità di navigazione
- **Cerca per Gene** — dato un gene alterato nel referto NGS, mostra scenari clinici, farmaci, evidenze e informazioni da valutare nel referto (senza generare frasi copiabili)
- **Cerca per Istotipo** — dato l'istotipo, mostra tutti i biomarcatori rilevanti con priorità clinica

### Sistema di priorità
| Badge | Significato |
|-------|-------------|
| 🔬 **Diagnostico** | Cambia diagnosi nosologica o grading WHO — senza questo dato il referto è incompleto |
| 📋 **Refertuale** | Completa il referto con informazione prognostica/biologica obbligatoria |
| 💊 **Terapeutico** | Valore primario per l'oncologo — il patologo lo referta, il clinico lo usa |

### Livelli di evidenza

| Badge | Significato |
|-------|-------------|
| `FDA I linea` | Approvazione FDA come prima linea |
| `FDA` | Approvazione FDA (linee successive / agnostica) |
| `FDA accel.` | FDA Accelerated Approval — condizionale, dati confermatori attesi |
| `EMA` | Approvazione EMA |
| `NCCN Cat 1` | NCCN Category 1 |
| `AIOM` | Linee guida AIOM |
| `Trial F3` | Trial fase III con risultati disponibili |
| `Trial F1/2` | Sviluppo clinico precoce |
| `MDT` | Solo discussione multidisciplinare |
| `Sviluppo interrotto` | Sviluppo regolatorio formalmente abbandonato dal promotore |

### Copertura pannello — logica "coverage-aware"
Il tool distingue tre livelli di copertura:

- ✓ **verde** — gene nel pannello, alterazione clinicamente rilevante coperta
- ⚠️ **arancione** — gene nel pannello come SNV, ma l'alterazione terapeuticamente rilevante non è coperta (es. FGFR2 CNV/overespressione, CDKN2A delezione omozigote, fusioni KIAA1549-BRAF)
- ✗ **rosso** — gene fuori pannello

### Cosa questo strumento NON fa

**Non genera testo da incollare nel referto.** Le schede riportano il significato di ciascuna alterazione e cosa segnalare, ma non offrono frasi copiabili: qui il gene è solo un gene, la classe di alterazione del paziente non è nota, e una frase pronta sarebbe un'asserzione non verificabile. Per compilare la Parte B del referto si usa l'[Assistente di Refertazione](https://github.com/Infingardo/NGS-50-geni), che parte dalla variante selezionata dal patologo.

**Non interpreta i referti.** La lettura del testo Diatech, l'OCR delle immagini e il parser delle varianti sono stati rimossi (luglio 2026): lo strumento risponde a due domande — *"cosa posso fare con questo kit su questo tumore"* e *"questo gene cosa fa"* — e a nient'altro.

---

## Scenari clinici coperti

- Carcinoma Colorettale (CRC metastatico, stadio II-III)
- Carcinoma Polmonare (NSCLC stadio III-IV)
- Gastrico / GEJ (adenocarcinoma)
- Carcinoma Mammario (BC metastatico, HR+/HER2-/TNBC)
- Melanoma (cutaneo, uveale)
- Pancreas / CCA (PDAC, colangiocarcinoma intraepatico)
- GIST / Tumori Stromali
- Carcinoma Tiroideo (DTC, ATC, MTC)
- Gliomi / Tumori SNC (WHO CNS5 2021)
- Test Tumore-Agnostico (NTRK, RET, MSI-H, POLE, ROS1, PD-L1)

---

## Architettura tecnica

- File HTML/CSS/JS singolo, **zero dipendenze esterne**, zero framework
- Nessuna connessione di rete in runtime — completamente offline dopo il primo caricamento
- Compatibile con qualsiasi browser moderno (Chrome, Firefox, Safari, Edge)
- Responsive su mobile

---

## Stato della revisione dei dati

- **Revisione generale: 03/2026** (`DATA_REVIEWED`). Ultima revisione sistematica del database; da considerare baseline documentale.
- **Aggiornamento parziale: 11/2026** (`DATA_PARTIAL`). Verifica selettiva su fonti primarie (FDA, EMA, WHO CNS5 2021, WHO Endocrine 2022). Non è una validazione integrale dei contenuti.
- **`last_review` della singola scheda** documenta la data in cui quella scheda è stata verificata. Le schede con `last_review: "2026-11"` sono quelle verificate nell'aggiornamento parziale; le altre restano alla data precedente. Le etichette di classe NCCN e AIOM non sono state riverificate.
- La **versione del software** (v2.0) è distinta dallo stato della revisione scientifica.

## Changelog selezionato

### v2.0 (novembre 2026)
Versione del software 2.0. Aggiornamento parziale dei contenuti, **non** una revisione completa del database.

- **README, 12/11/2026 (solo documentazione)**: aggiunta selezione di esami molecolari complementari da richiedere, se non disponibili in-house, per SNC, linfomi B aggressivi, dMMR e lesioni mesenchimali; distinti USP6 (fascite nodulare) e FOS (fascite/miosite proliferativa, uso selettivo). Nessuna modifica al database, ai badge o alla versione dell'app.

- **Stato regolatorio (fonti FDA/EMA)**:
  - NRG1 PDAC: approvazione FDA accelerata il 4 dicembre 2024.
  - BRAF colon-retto: I linea con encorafenib+cetuximab+FOLFOX indicata anche dall'EMA (EPAR Braftovi).
  - FGFR2 colangiocarcinoma intraepatico: infigratinib rimosso (approvazione FDA ritirata il 16/05/2024; mai autorizzato in EU).
  - Vorasidenib: approvazione FDA il 6 agosto 2024; indicazione EU più ristretta (Gr2 prevalentemente non captante).
  - Pralsetinib: autorizzazione EU ritirata il 24/10/2024.
  - AKT1 mammella: capivasertib autorizzato anche in EU.
  - BRAF tiroide: EMA solo per carcinoma differenziato refrattario a radioiodio; FDA per anaplastico.
  - Polmone: indicazioni EMA di MET (tepotinib, capmatinib), KRAS G12C (sotorasib, adagrasib: autorizzazione condizionata) e T-DXd (HER2 mutato: autorizzazione condizionata); stato FDA di T-DXd, sotorasib e adagrasib (approvazioni accelerate in corso, registro FDA).
  - Polmone, chiusura del lotto: EGFR (amivantamab + lazertinib, osimertinib + chemioterapia), alectinib adiuvante, restrizione EMA di entrectinib, tipo di approvazione FDA di tepotinib e capmatinib (convertite in ordinarie). Le categorie NCCN e AIOM restano non riverificate.
  - Novità terapeutiche: imlunestrant, zongertinib, sevabertinib, repotrectinib, taletrectinib, encorafenib+binimetinib (polmone, EMA). FDA, EMA e AIFA tenuti separati; lo stato EMA e AIFA è dichiarato «non verificato» dove ignoto.
- **Gliomi (WHO CNS5 2021)**: nel GBM IDH-wildtype basta uno tra TERT, amplificazione EGFR e +7/−10; frequenza di IDH1 R132H con denominatore esplicito; rimossa la frequenza di TERT non supportata; algoritmo di test IDH; H3 e ATRX tra i limiti del pannello; TERT negli IDH-mutati e grado 4 per CDKN2A/B nel documento clinico.
- **Tiroide (WHO Endocrine 2022)**: "doppio hit" TERT+BRAF limitato al PTC; BRAF nel PTC con frequenze per sottotipo, valore prognostico non dimostrato del solo BRAF, IHC VE1; varianti follicolari infiltrativa (BRAF-like) e invasiva incapsulata (RAS-like); RET nel carcinoma midollare (test germinale raccomandato, RAS nei RET-wildtype, prognosi per codone); frequenza delle fusioni RET nel PTC; profilo molecolare e prognosi dell'anaplastico; fusioni NTRK/ALK/RET nel PTC (documento clinico).
- **Documento clinico**: intestazione versione 2.0 (novembre 2026); riga BRAF nel colon-retto corretta (backbone encorafenib+cetuximab); PDF rigenerato.
- **Revisione**: `last_review: "2026-11"` solo sulle schede verificate; `DATA_PARTIAL` e dicitura «rev. 2026-03 · agg. parziale 2026-11» nell'intestazione dell'app.
- **Test**: harness `test/consultazione.test.js` esteso con controlli di regressione per ciascuna correzione.

### v1.5.4 (marzo 2026)
- **Bemarituzumab gastrico**: sviluppo regolatorio interrotto (Amgen, febbraio 2026, FORTITUDE-101/102). Badge `Sviluppo interrotto` rosso. Card mantenuta a scopo documentale.
- **Tucatinib+trastuzumab CRC**: badge corretto in `FDA accel.` (era `FDA` generico)
- Nuovo badge/classe `Sviluppo interrotto` (CSS `ev-Discont`) aggiunto a legenda e routing
- Nuovo badge `FDA accel.` (CSS `ev-FDAaccel`) — visivamente distinto dall'approvazione standard

### v1.5.3 (marzo 2026)
- Logica "coverage-aware": `panel_coverage_warning` su FGFR2 gastrico, BRAF glioma (KIAA1549), CDKN2A
- PD-L1 / CLDN18: type corretto da `["snv"]` a `["ihc"]` — erano semanticamente errati
- CRC BRAF: divergenza FDA/EMA esplicita su prima linea (FDA approvata 2024; EMA in valutazione CHMP)
- CRC HER2: rimosso "≥3 linee" — sostituito con formula FDA letterale
- FGFR2 gastrico: evidence degradata da `FDA · EMA` a warning + verifica

### v1.5.2 (marzo 2026)
- CRC BRAF: corretto backbone da encorafenib+binimetinib a encorafenib+cetuximab
- CRC HER2: tucatinib+trastuzumab promosso come opzione primaria FDA 2023
- iCCA IDH1: rimosso "in mantenimento" errato
- Glioma vorasidenib: approvazione ristretta a WHO Gr2 (non Gr3/Gr4)
- Melanoma NRAS: rimosso badge EMA (domanda ritirata)
- NRG1: zenocutuzumab-zbco (Bizengri) FDA accel. 2024 per NSCLC e PDAC
- KRAS G12D PDAC: corretto Trial F3 → Trial F1/2

---

## Disclaimer

Strumento ad uso **interno di reparto**, sviluppato e revisionato da personale specialistico.  
**Non sostituisce le linee guida AIOM, ESMO, WHO né il giudizio clinico del patologo e dell'oncologo.**  
I contenuti terapeutici devono essere verificati rispetto alle indicazioni approvate aggiornate prima di qualunque decisione clinica.  
I dati regolatori sono riferiti alla revisione scientifica della singola scheda (`last_review`), non al numero di versione software; il panorama approvatorio cambia rapidamente.

---

*SC Anatomia Patologica · Presidio FBF-Melloni-Territorio · ASST Fatebenefratelli-Sacco · Milano*
