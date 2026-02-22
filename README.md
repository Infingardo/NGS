# NGS Panel — Decision Support Tool

Strumento di supporto decisionale per anatomopatologi e oncologi.  
Basato sul pannello **Diatech Pharmacogenetics** (48 SNV/InsDel · 12 fusioni · 3 CNV · MSI Bethesda esteso).

> **Versione: 1.4 · Febbraio 2026**  
> Uso interno di reparto — non sostituisce le linee guida istituzionali.

---

## Come si usa

**Non serve installare nulla.**

1. Scarica `index.html`
2. Aprilo con qualsiasi browser (Chrome, Firefox, Safari, Edge)
3. Usa il tool — funziona completamente offline

```bash
git clone https://github.com/TUO-USERNAME/ngs-decision-support.git
cd ngs-decision-support
# apri index.html con doppio click
```

Oppure pubblica su **GitHub Pages** (Settings → Pages → branch main) per un link condivisibile senza download.

---

## File

| File | Descrizione |
|------|-------------|
| `index.html` | Tool completo — tutto in un file, zero dipendenze |
| `README.md` | Questo file |

---

## Funzionalità

- **10 scenari tumorali**: CRC, NSCLC, Gastrico/GEJ, Mammario, Melanoma, Pancreas/CCA, GIST, Tiroide, Gliomi/SNC, Agnostico
- **Filtri per priorità**: URGENTE / ALTO / MEDIO (definizione regolatoria FDA/EMA/AIFA)
- **Campo istotipo**: ogni entry specifica l'istotipo di riferimento
- **Ruolo del biomarcatore**: Diagnostico / Predittivo / Prognostico / Diag+Pred
- **Livello di evidenza**: FDA / EMA / NCCN Cat 1 / AIOM / Trial F3 / Prognostico / Diag WHO
- **Box referto sdoppiato**: per i biomarcatori con ruolo diagnostico (es. SNC/WHO), il referto è separato in sezione diagnostica e sezione predittiva — con pulsante Copia indipendente per ciascuna
- **Verifica copertura pannello**: ogni gene confrontato in tempo reale con il pannello Diatech (✓/✗)
- **Ricerca libera**: per gene, farmaco, istotipo, livello di evidenza

---

## Logica del referto sdoppiato (SNC)

Per i biomarcatori con `role: "diagnostico"` o `"misto"` (principalmente gliomi/SNC), il box referto è diviso in due sezioni indipendenti:

**🔬 Ruolo Diagnostico** — valore classificativo WHO CNS5 2021, cosa non si può diagnosticare senza quel dato, limiti del pannello (es. 1p/19q non coperto)

**💊 Ruolo Predittivo** — se esiste un target approvato, in quale contesto è applicabile, dove l'indicazione non regge (es. IDH1 in Gr4 fuori dall'approvazione vorasidenib)

Questa distinzione è clinicamente critica: IDH1/2 nel glioma non è un biomarcatore terapeutico — è la diagnosi stessa.

---

## Definizione delle priorità

| Livello | Significato |
|---------|-------------|
| ⚡ URGENTE | Approvazione FDA/EMA/AIFA in I–II linea. Senza il test il paziente non accede alla terapia standard. |
| 🔶 ALTO | Approvazione in linee successive, off-label con evidenza robusta, o forte impatto prognostico/predittivo. |
| 🟢 MEDIO | Predittivo negativo, prognostico puro, o target in trial clinico. |

---

## Pannello Diatech (copertura)

- **SNV/InsDel**: 48 geni
- **Fusioni**: 12 geni (ALK, FGFR1-3, MET, NRG1, NTRK1-3, PPARG, RET, ROS1)
- **CNV**: EGFR, ERBB2, MET
- **MSI**: 8 marcatori Bethesda nominali + 118 mononucleotidici

---

## Note cliniche importanti

- **SNC**: la classificazione WHO CNS5 2021 richiede **1p/19q** (FISH/CGH) e **CDKN2A/B** per grading. Questi test **non sono coperti** dal pannello NGS — richiedere separatamente.
- **TERT in SNC**: valore esclusivamente diagnostico/classificativo nel glioma. Non targetabile. Non confondere con TERT in DTC tiroideo.
- **KRAS pancreas**: la tipizzazione esatta del codone 12 è prerequisito terapeutico — "KRAS mutato" senza codone è referto incompleto.
- **MSI**: pannello Bethesda esteso 126 marcatori. dMMR (IHC) e MSI-H (NGS) non sempre concordanti — valutare entrambi.

---

## Come aggiornare i contenuti

Tutto il contenuto clinico è nella variabile `SC` in `index.html` (sezione `<script>`).

Struttura base di ogni entry:

```js
{
  genes: ["KRAS"],
  histotype: "Adenocarcinoma colorettale",
  type: ["snv"],           // snv | cnv | fusions | msi
  role: "predittivo",      // diagnostico | predittivo | prognostico | misto
  priority: "URGENTE",     // URGENTE | ALTO | MEDIO
  evidence: "FDA I linea · NCCN Cat 1",
  drug: "Anti-EGFR (cetuximab/panitumumab)",
  note: "Note tecniche",
  action: "Azione clinica",
  referto: "Frase standardizzata per referto. {GENI} viene sostituito con i nomi dei geni."
}
```

Per entries con `role: "diagnostico"` o `"misto"`, usare invece:

```js
{
  // ... campi base ...
  referto_diag: "[RUOLO DIAGNOSTICO] Testo sezione diagnostica. {GENI} sostituito automaticamente.",
  referto_pred: "[RUOLO PREDITTIVO] Testo sezione predittiva. {GENI} sostituito automaticamente."
}
```

---

## Disclaimer

Strumento ad uso interno di reparto. Le informazioni riflettono lo stato regolatorio FDA/EMA/AIFA a **Febbraio 2026**.  
Non sostituisce le linee guida istituzionali (AIOM, ESMO, WHO), il giudizio clinico, né la consulenza oncologica multidisciplinare.  
Verificare sempre l'aggiornamento delle approvazioni regolatorie e la disponibilità locale (rimborso AIFA, contratti regionali) prima di applicare le indicazioni.

---

*SC Anatomia Patologica — ASST Fatebenefratelli-Sacco, Milano*
