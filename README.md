# NGS Panel — Decision Support

**Strumento ad uso interno di reparto · ASST FBF-Sacco · SC Anatomia Patologica FBF-Melloni-Territorio**

[![Versione](https://img.shields.io/badge/versione-1.5.4-green)](https://infingardo.github.io/NGS/)
[![Pannello](https://img.shields.io/badge/pannello-Diatech_Pharmacogenetics-blue)](https://infingardo.github.io/NGS/)
[![Revisione dati](https://img.shields.io/badge/dati_revisionati-marzo_2026-orange)](https://infingardo.github.io/NGS/)

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

---

## Funzionalità principali

### Due modalità di navigazione
- **Cerca per Gene** — dato un gene alterato nel referto NGS, mostra scenari clinici, farmaci, evidenze, frase per referto
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

### Referto Rapido
Modalità compatta con frasi di referto precompilate, pronte per copia. Per i biomarcatori a doppio ruolo (diagnostico + predittivo), produce due frasi separate con pulsanti di copia indipendenti.

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

## Changelog selezionato

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
I dati regolatori sono aggiornati alla revisione indicata nel badge versione; il panorama approvatorio cambia rapidamente.

---

*SC Anatomia Patologica · Presidio FBF-Melloni-Territorio · ASST Fatebenefratelli-Sacco · Milano*
