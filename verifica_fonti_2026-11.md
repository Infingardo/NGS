# Verifica schede su fonti primarie — novembre 2026

Stato: le correzioni 1–6 della sezione A sono state applicate su istruzione di Filippo (schede, documento clinico `.md`, test). Le sezioni C e D restano non applicate. Il PDF del documento clinico non è stato rigenerato. Le colonne «Cosa dice ora» descrivono lo stato prima delle correzioni.
Fonti: pagine ufficiali FDA (fda.gov) ed EMA (EPAR su ema.europa.eu), lette direttamente il 06/11/2026.
Limite: i label su accessdata.fda.gov non sono raggiungibili da questa sessione (errore di certificato sul proxy); non ho aggirato il controllo.

## A. Discrepanze tra scheda e fonte (da correggere)

| # | Scheda (riga index.html) | Cosa dice ora | Cosa dice la fonte | Fonte |
|---|---|---|---|---|
| 1 | NRG1 PDAC (462) | «FDA accel. approvazione agosto 2024» | Approvazione accelerata il **4 dicembre 2024** (NSCLC e PDAC insieme) | [FDA](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-accelerated-approval-zenocutuzumab-zbco-non-small-cell-lung-cancer-and-pancreatic) |
| 2 | BRAF CRC (418, referto_pred) | I linea con mFOLFOX6: «EMA: in valutazione CHMP» | L'EPAR Braftovi riporta l'indicazione EU in **I linea con cetuximab + FOLFOX** (BRAF V600E, mCRC); pagina aggiornata 22/07/2026 | [EMA Braftovi](https://www.ema.europa.eu/en/medicines/human/EPAR/braftovi) |
| 3 | iCCA FGFR2 (459) | Evidenza «FDA · EMA · NCCN Cat 1», farmaci pemigatinib / **infigratinib** / futibatinib | Approvazione FDA di infigratinib **ritirata il 16/05/2024** (richiesta dello sponsor). Nessuna autorizzazione EMA (domanda ritirata) | [FDA](https://www.fda.gov/drugs/resources-information-approved-drugs/withdrawn-fda-grants-accelerated-approval-infigratinib-metastatic-cholangiocarcinoma) · [EMA withdrawal report](https://www.ema.europa.eu/en/documents/withdrawal-report/withdrawal-assessment-report-febseltiq_en.pdf) (solo titolo letto, non il testo) |
| 4 | Glioma IDH (479, referto_pred) | «Vorasidenib approvato FDA (2023)»; evidenza «FDA (vorasidenib 2023)» | Approvazione FDA il **6 agosto 2024**. L'indicazione EU esiste ed è più stretta: astrocitoma/oligodendroglioma Gr2 **prevalentemente non captanti**, IDH1 R132 / IDH2 R172, solo chirurgia, senza necessità immediata di RT/chemio | [FDA](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-vorasidenib-grade-2-astrocytoma-or-oligodendroglioma-susceptible-idh1-or-idh2-mutation) · [EMA Voranigo](https://www.ema.europa.eu/en/medicines/human/EPAR/voranigo) |
| 5 | RET NSCLC (431), tiroide (474), agnostico (487) | Pralsetinib citato come opzione con evidenza «FDA · EMA» | Autorizzazione EU di Gavreto **ritirata dalla Commissione il 24/10/2024**. Pralsetinib non è disponibile con AIC EU | [EMA Gavreto](https://www.ema.europa.eu/en/medicines/human/EPAR/gavreto) |
| 6 | AKT1 mammella (448) | Evidenza «FDA» | Capivasertib + fulvestrant è autorizzato anche in **EU** (PIK3CA/AKT1/PTEN, post terapia endocrina). La scheda è incompleta, non errata | [EMA Truqap](https://www.ema.europa.eu/en/medicines/human/EPAR/truqap) · [FDA](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-capivasertib-fulvestrant-breast-cancer) |

## B. Confermato dalla fonte

- **Tucatinib + trastuzumab CRC** (419): FDA approvazione accelerata 19/01/2023, RAS wild-type, dopo fluoropirimidina, oxaliplatino e irinotecano. L'EPAR Tukysa elenca in EU solo il carcinoma mammario, quindi la scheda («FDA accel.», nessuna dicitura EMA) è corretta. [FDA](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-accelerated-approval-tucatinib-trastuzumab-colorectal-cancer) · [EMA Tukysa](https://www.ema.europa.eu/en/medicines/human/EPAR/tukysa)
- **NRG1 NSCLC** (435): anno 2024 e «dopo terapia sistemica precedente» corretti.
- **Selpercatinib agnostico** (487): corretto anche per EU (tumori solidi RET fusion-positivi quando le alternative non RET-dirette hanno beneficio limitato o sono esaurite). La scheda indica «FDA agnostico 2022 · EMA», coerente. [EMA Retsevmo](https://www.ema.europa.eu/en/medicines/human/EPAR/retsevmo)
- **Elacestrant** (446): non verificato direttamente (visto solo il titolo della pagina FDA; lato EMA non letto).

## C. Novità non presenti nello strumento (omissioni, non errori)

Verificate su pagine FDA; per ciascuna decidi se aggiungere.

| Area | Novità | Data FDA | Fonte |
|---|---|---|---|
| ESR1 mammella (446) | Imlunestrant (monoterapia) | 25/09/2025 | [FDA](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-imlunestrant-er-positive-her2-negative-esr1-mutated-advanced-or-metastatic-breast) |
| HER2 mutato NSCLC (433) | Zongertinib (TKD HER2, non squamoso; dopo terapia precedente) | 08/08/2025 (accelerata) | [FDA](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-accelerated-approval-zongertinib-non-squamous-nsclc-her2-tkd-activating-mutations) |
| HER2 mutato NSCLC (433) | Sevabertinib | 19/11/2025 (accelerata); estesa 09/09/2026 | letto su FDA (aggiornato 06/11/2026) |
| ROS1 NSCLC (427) | Repotrectinib (15/11/2023; EMA condizionata 13/01/2025), taletrectinib (11/06/2025) | — | letto su FDA ed EPAR Augtyro (aggiornato 06/11/2026) |
| BRAF NSCLC (430) | Encorafenib + binimetinib, indicato nell'EPAR Braftovi per NSCLC BRAF V600E avanzato | EU: nell'EPAR | [EMA Braftovi](https://www.ema.europa.eu/en/medicines/human/EPAR/braftovi) |

Aggiornamento 06/11/2026: sono state lette sulle pagine FDA ed EMA le estensioni 2026 di zongertinib (26/02/2026), sevabertinib (09/09/2026) e imlunestrant + abemaciclib (18/09/2026), e l'autorizzazione EU di imlunestrant (09/01/2026). Restano non verificati: zenocutuzumab per colangiocarcinoma NRG1+ (08/05/2026). Da non usare finché non letti sulle pagine FDA.

## D. Non verificato

KRAS/NRAS e anti-EGFR CRC, EGFR, ALK, MET, KRAS G12C NSCLC, T-DXd (stato FDA/EMA), zolbetuximab, pembrolizumab MSI-H (lato EMA), larotrectinib/entrectinib, avapritinib, ripretinib, ivosidenib CCA lato EMA, dabrafenib+trametinib (glioma, tiroide, NSCLC), tebentafusp, binimetinib NRAS, imatinib/nilotinib KIT melanoma, DDR2, STK11/KEAP1, schede tiroide e gliomi diagnostiche (WHO). Le categorie NCCN (Cat 1, 2A) non sono verificabili da fonti pubbliche gratuite: servirebbero le linee guida.
