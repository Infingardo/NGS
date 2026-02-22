# NGS Panel — Decision Support Tool

Strumento di supporto decisionale per anatomopatologi.  
Basato sul pannello **Diatech Pharmacogenetics** (48 SNV/InsDel · 12 fusioni · 3 CNV · MSI Bethesda esteso).

> **Versione: 1.5 · Febbraio 2026**  
> 🌐 **https://infingardo.github.io/NGS/**  
> Uso interno di reparto — non sostituisce le linee guida istituzionali.

---

## Come si usa

**Non serve installare nulla.**

1. Apri direttamente online: **https://infingardo.github.io/NGS/**
2. Oppure scarica `index.html` e aprilo con qualsiasi browser — funziona completamente offline

```bash
git clone https://github.com/infingardo/NGS.git
cd NGS
# apri index.html con doppio click
```

---

## File

| File | Descrizione |
|------|-------------|
| `index.html` | Tool completo — tutto in un file, zero dipendenze |
| `README.md` | Questo file |
| `pannello_NGS_Diatech_documento_clinico.md` | Documento clinico-metodologico completo (fonte per NotebookLM) |

---

## Funzionalità

- **10 scenari tumorali**: CRC, NSCLC, Gastrico/GEJ, Mammario, Melanoma, Pancreas/CCA, GIST, Tiroide, Gliomi/SNC, Agnostico
- **Classificazione patologica** (vedi sotto): 🔬 Diagnostico / 📋 Refertuale / 💊 Terapeutico
- **Filtro per ruolo del biomarcatore**: Diagnostico / Predittivo / Prognostico / Diag+Pred
- **Livello di evidenza**: FDA / EMA / NCCN Cat 1 / AIOM / Trial F3 / Prognostico / Diag WHO
- **Box referto sdoppiato**: per i biomarcatori SNC con ruolo diagnostico, il referto è separato in sezione diagnostica e sezione predittiva — con pulsante Copia indipendente per ciascuna
- **Verifica copertura pannello**: ogni gene confrontato in tempo reale con il pannello Diatech (✓/✗)
- **Ricerca libera**: per gene, farmaco, istotipo, livello di evidenza

---

## Logica di classificazione (prospettiva patologica)

Il tool classifica i biomarcatori secondo la logica dell'anatomopatologo, non dell'oncologo:

| Livello | Significato |
|---------|-------------|
| 🔬 **Diagnostico** | Il risultato **cambia la diagnosi nosologica o il grading** secondo classificazione WHO/AIOM vigente. Senza questo dato il referto è incompleto o errato. Esempi: IDH1/2 nel glioma, MSI in CRC/gastrico/endometrio, TERT in GBM IDH-WT. |
| 📋 **Refertuale** | Non cambia la diagnosi ma **completa il referto** con informazione prognostica o biologica rilevante. Il patologo la include perché appartiene alla caratterizzazione della neoplasia. Esempi: BRAF V600E nel CRC (fenotipo serrated, prognosi), KIT/PDGFRA nel GIST (tipizzazione esone), STK11/KEAP1 in NSCLC. |
| 💊 **Terapeutico** | Il valore primario è **per il clinico**: il patologo lo referta, ma è l'oncologo che lo usa per decidere la terapia. Esempi: KRAS/NRAS in CRC, EGFR/ALK in NSCLC, ERBB2 in gastrico/mammella. |

Questa distinzione è critica soprattutto in ambito SNC: IDH1/2 nel glioma non è un biomarcatore terapeutico accessorio — è la diagnosi stessa secondo WHO CNS5 2021.

---

## Logica del referto sdoppiato (SNC)

Per i biomarcatori con `role: "diagnostico"` o `"misto"` (principalmente gliomi/SNC), il box referto è diviso in due sezioni indipendenti:

**🔬 Ruolo Diagnostico** — valore classificativo WHO CNS5 2021, cosa non si può diagnosticare senza quel dato, limiti del pannello (es. 1p/19q non coperto)

**💊 Ruolo Predittivo** — se esiste un target approvato, in quale contesto è applicabile, dove l'indicazione non regge (es. IDH1 in Gr4 fuori dall'approvazione vorasidenib)

---

## Pannello Diatech (copertura)

- **SNV/InsDel**: 48 geni
- **Fusioni**: 12 geni (ALK, FGFR1-3, MET, NRG1, NTRK1-3, PPARG, RET, ROS1)
- **CNV**: EGFR, ERBB2, MET
- **MSI**: 8 marcatori Bethesda nominali + 118 mononucleotidici

---

## Note cliniche importanti

- **SNC**: la classificazione WHO CNS5 2021 richiede **1p/19q** (FISH/CGH) e **CDKN2A/B delezione** per grading. Questi test **non sono coperti** dal pannello NGS — richiedere separatamente.
- **TERT in SNC**: valore esclusivamente diagnostico/classificativo nel glioma. Non targetabile. Non confondere con TERT nel DTC tiroideo (valore prognostico distinto).
- **KRAS pancreas**: la tipizzazione esatta del codone 12 è prerequisito terapeutico — "KRAS mutato" senza specificazione della variante è referto clinicamente incompleto.
- **MSI**: classificato come 🔬 Diagnostico perché l'IHC MMR è già eseguita dall'anatomopatologo e il risultato cambia la gestione nosologica (fenotipo MSI-H, screening Lynch). Il pannello NGS Bethesda esteso (126 marcatori) è la conferma molecolare.

---

## Come aggiornare i contenuti

Tutto il contenuto clinico è nella variabile `SC` in `index.html` (sezione `<script>`).

Struttura base di ogni entry:

```js
{
  genes: ["KRAS"],
  histotype: "Adenocarcinoma colorettale",
  type: ["snv"],              // snv | cnv | fusions | msi
  role: "predittivo",         // diagnostico | predittivo | prognostico | misto
  priority: "TERAPEUTICO",    // DIAGNOSTICO | REFERTUALE | TERAPEUTICO
  evidence: "FDA I linea · NCCN Cat 1",
  drug: "Anti-EGFR (cetuximab/panitumumab)",
  note: "Note tecniche",
  action: "Azione clinica",
  referto: "Frase standardizzata. {GENI} viene sostituito con i nomi dei geni."
}
```

Per entries SNC con `role: "diagnostico"` o `"misto"`, usare referto sdoppiato:

```js
{
  // ... campi base ...
  referto_diag: "[RUOLO DIAGNOSTICO] Testo sezione classificativa. {GENI} sostituito automaticamente.",
  referto_pred: "[RUOLO PREDITTIVO] Testo sezione terapeutica. {GENI} sostituito automaticamente."
}
```

---

## Disclaimer

Strumento ad uso interno di reparto. Le informazioni riflettono lo stato regolatorio FDA/EMA/AIFA a **Febbraio 2026**.  
Non sostituisce le linee guida istituzionali (AIOM, ESMO, WHO), il giudizio clinico, né la consulenza oncologica multidisciplinare.  
Verificare sempre l'aggiornamento delle approvazioni regolatorie e la disponibilità locale (rimborso AIFA, contratti regionali).

---

*SC Anatomia Patologica — ASST Fatebenefratelli-Sacco, Milano*  
*https://infingardo.github.io/NGS/*
