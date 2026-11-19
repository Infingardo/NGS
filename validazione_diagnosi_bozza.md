# Validazione tabella DIAGNOSI (bozza)

Generato da `index.html` il 2026-11-19: 29 voci. Spuntare ogni casella; correggere direttamente in `index.html` (costante `DIAGNOSI`), poi rigenerare.

Per ogni voce controllare: **(1)** alterazione definente e partner, **(2)** sinonimi ed esclusioni (non devono unire entità distinte), **(3)** ruolo, nota, test alternativo, **(4)** fonte. La colonna «Pannello» è calcolata da `PANEL` e non va validata a mano: va controllata solo la classe assegnata (snv / fusions / cnv / del).

Le voci già confermate da Filippo non hanno `stato:"bozza"`; quelle ancora in bozza richiedono una verifica per voce. Le decisioni sui dubbi di copertura sono documentate in `validazione_fonti_diagnosi_2026-11.md`.

## 1. Dermatofibrosarcoma protuberans  `dfsp`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: dermatofibrosarcoma · dfsp · tumore di bednar · dfsp fibrosarcomatoso

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| COL1A1::PDGFB | fusions | diagnostico | ✗ | Alterazione definente nella grande maggioranza dei casi (rari partner alternativi, es. COL6A3::PDGFD). | FISH break-apart PDGFB o pannello RNA esteso |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 2. Tumore stromale gastrointestinale (GIST)  `gist`

- Stato: **confermata da Filippo** · Esito attuale: **sì** · Fonte: WHO Digestive System Tumours, 5ª ed. (2019); WHO Soft Tissue and Bone Tumours, 6ª ed. (2026), sintesi in Hornick et al., Am J Surg Pathol 2026 (PMID 42839882)
- Sinonimi: gist · tumore stromale gastrointestinale · tumore stromale gastro intestinale  
- Esclusi se il testo contiene: sdh deficien · sdh carent · deficit sdh · deficit di sdh · carenza sdh · carenza di sdh · perdita sdh · perdita di sdh
- Collegata allo scenario: `gist`
- Avviso: Il GIST SDH-deficiente è una categoria separata nella WHO 2026: vedere la sua scheda (cercare «GIST SDH-deficiente»).

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| KIT mutazione | snv | misto | ✓ | Driver più frequente. |  |
| PDGFRA mutazione | snv | misto | ✓ | Include D842V (vedi scheda gene). |  |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 3. GIST SDH-deficiente  `gist_sdh`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 6ª ed. (2026), sintesi in Hornick et al., Am J Surg Pathol 2026 (PMID 42839882); WHO Digestive System Tumours, 5ª ed. (2019)
- Sinonimi: gist sdh deficiente · gist sdh carente · sdh deficient gist · gist con deficit sdh · gist con deficit di sdh · gist con carenza di sdh · gist con carenza sdh · tumore stromale gastrointestinale con deficit di sdh · sdh deficient gastrointestinal stromal tumor · tumore stromale gastrointestinale sdh deficiente · tumore stromale gastrointestinale con deficit sdh
- Avviso: Categoria separata dal GIST convenzionale nella WHO 2026 (patogenesi molecolare distinta, possibile associazione sindromica familiare, comportamento clinico diverso).

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| Deficit SDH (SDHA/B/C/D) | snv | diagnostico | ✗ | KIT/PDGFRA wild-type. | IHC SDHB; consulenza genetica |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 4. Tumore miofibroblastico infiammatorio  `tmi`

- Stato: **confermata da Filippo** · Esito attuale: **solo fusioni (da verificare)** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: tumore miofibroblastico infiammatorio · imt · tmi · inflammatory myofibroblastic tumor
- Avviso: Le fusioni elencate sono esempi; la lista dei riarrangiamenti possibili non è esaustiva.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| Fusione ALK | fusions | misto | ✓ | Sottogruppo ALK-riarrangiato. | IHC ALK |
| Fusione ROS1 | fusions | misto | ✓ | Sottogruppo ALK-negativo. |  |
| ETV6::NTRK3 | fusions | misto | ✓ | Sottogruppo ALK-negativo. |  |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 5. Fibrosarcoma infantile (nel rene: nefroma mesoblastico congenito cellulare)  `fibrosarcoma_infantile`

- Stato: **confermata da Filippo** · Esito attuale: **solo fusioni (da verificare)** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020); WHO Soft Tissue and Bone Tumours, 6ª ed. (2026), sintesi in Hornick et al., Am J Surg Pathol 2026 (PMID 42839882)
- Sinonimi: fibrosarcoma infantile · fibrosarcoma congenito · infantile fibrosarcoma · nefroma mesoblastico congenito cellulare · cellular congenital mesoblastic nephroma  
- Esclusi se il testo contiene: classic · mist · mixed
- Avviso: Nel rene la WHO 2026 accetta il termine «nefroma mesoblastico congenito cellulare» per questa entità: la scheda NON vale per il tipo classico né per quello misto.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| ETV6::NTRK3 | fusions | misto | ✓ | Alterazione tipica; esistono casi con altri riarrangiamenti di NTRK o della via MAPK. |  |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 6. Neoplasia a cellule fusate con alterazioni di chinasi (incluso riarrangiamento NTRK)  `ntrk_spindle`

- Stato: **confermata da Filippo** · Esito attuale: **solo fusioni (da verificare)** · Fonte: WHO Soft Tissue and Bone Tumours, 6ª ed. (2026), sintesi in Hornick et al., Am J Surg Pathol 2026 (PMID 42839882); WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: neoplasia a cellule fusate con alterazioni di chinasi · neoplasia a cellule fusate con alterazione di chinasi · kinase altered spindle cell neoplasm · neoplasia a cellule fusate ntrk · ntrk rearranged spindle cell neoplasm · neoplasia mesenchimale ntrk
- Avviso: WHO 2026: la categoria emergente «riarrangiamento NTRK» della 5ª ed. è stata ampliata alle neoplasie a cellule fusate con alterazioni di chinasi, che comprendono un ampio spettro di fusioni di chinasi e anche mutazioni puntiformi. Qui sono elencati solo NTRK1/2/3, come esempio NON esaustivo: le altre chinasi non sono riportate in questa scheda. L'esito mostrato vale SOLO per le fusioni NTRK elencate, non per l'intera categoria: altre fusioni o mutazioni di chinasi vanno cercate per gene. La presenza della fusione non stabilisce da sola comportamento o grado.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| Fusioni NTRK1/2/3 | fusions | misto | ✓ | Esempio non esaustivo delle alterazioni di chinasi; integrare con la morfologia. |  |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 7. Sarcoma sinoviale  `sinoviale`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: sarcoma sinoviale · synovial sarcoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| SS18::SSX1/2/4 | fusions | diagnostico | ✗ | Alterazione definente. | IHC SS18-SSX / SSX C-term; FISH SS18 |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 8. Sarcoma di Ewing  `ewing`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020); CAP Ewing Sarcoma Protocol v5.0.0.1 (2025)
- Sinonimi: sarcoma di ewing · ewing  
- Esclusi se il testo contiene: simil · like · cic · bcor

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| EWSR1 (o FUS)::FLI1/ERG | fusions | diagnostico | ✗ | Alterazione definente. | FISH EWSR1 break-apart; pannello RNA esteso |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 9. Rabdomiosarcoma alveolare  `rms_alveolare`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: rabdomiosarcoma alveolare · alveolar rhabdomyosarcoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| PAX3/PAX7::FOXO1 | fusions | diagnostico | ✗ | Alterazione definente. | FISH FOXO1 |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 10. Liposarcoma mixoide  `lps_mixoide`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: liposarcoma mixoide · liposarcoma a cellule rotonde · myxoid liposarcoma  
- Esclusi se il testo contiene: pleomorf

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| FUS (o EWSR1)::DDIT3 | fusions | diagnostico | ✗ | Alterazione definente. | FISH DDIT3 |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 11. Liposarcoma ben differenziato / dedifferenziato (tumore lipomatoso atipico)  `lps_wd_dd`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020); PMID: 26146760, 27508976
- Sinonimi: liposarcoma ben differenziato · liposarcoma dedifferenziato · tumore lipomatoso atipico · wdlps · ddlps
- Avviso: Il pannello non analizza nessuna amplificazione MDM2 o CDK4. Una mutazione CDK4 non dimostra l'amplificazione: per il sospetto diagnostico usare FISH MDM2; l'IHC CDK4 è solo di supporto.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| Amplificazione MDM2 | cnv | diagnostico | ✗ | Alterazione definente. | FISH MDM2 |
| Amplificazione CDK4 | cnv | diagnostico | ⚠️ altra classe | Frequente co-amplificazione; la mutazione CDK4 letta dal pannello non la documenta. | FISH MDM2; IHC CDK4 solo come supporto |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 12. Sarcoma a cellule chiare dei tessuti molli  `cellule_chiare`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: sarcoma a cellule chiare · clear cell sarcoma  
- Esclusi se il testo contiene: rene · renale · kidney

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| EWSR1::ATF1 (o CREB1) | fusions | diagnostico | ✗ | Distingue dal melanoma. | FISH EWSR1 |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 13. Sarcoma alveolare delle parti molli  `asps`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: sarcoma alveolare delle parti molli · alveolar soft part sarcoma · asps

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| ASPSCR1::TFE3 | fusions | diagnostico | ✗ | Alterazione definente. | IHC TFE3; FISH TFE3 |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 14. Tumore fibroso solitario  `sft`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: tumore fibroso solitario · emangiopericitoma · solitary fibrous tumor · sft

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| NAB2::STAT6 | fusions | diagnostico | ✗ | Alterazione definente. | IHC STAT6 nucleare |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 15. Fibromatosi desmoide  `desmoide`

- Stato: **confermata da Filippo** · Esito attuale: **sì** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: fibromatosi desmoide · desmoide · tumore desmoide · fibromatosi aggressiva

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| CTNNB1 mutazione | snv | diagnostico | ✓ | Forme sporadiche. |  |
| APC (forme associate a FAP) | snv | diagnostico | ✗ | Forme sindromiche. | Test germinale APC se sospetto clinico |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 16. PEComa  `pecoma`

- Stato: **confermata da Filippo** · Esito attuale: **sì** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: pecoma · tumore a cellule epitelioidi perivascolari · angiomiolipoma epitelioide
- Avviso: L'alterazione principale (inattivazione di TSC2) e le fusioni TFE3 NON sono rilevate dal pannello, che legge solo SNV/InsDel di TSC1: un risultato negativo non esclude la diagnosi.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| TSC2 inattivazione | snv | misto | ✗ | Via TSC/mTOR. |  |
| TSC1 mutazione | snv | misto | ✓ | Il pannello rileva SNV/InsDel di TSC1, non le delezioni. |  |
| Fusione TFE3 | fusions | diagnostico | ✗ | Sottogruppo distinto. | IHC/FISH TFE3 |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 17. Sarcoma epitelioide  `epitelioide`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: sarcoma epitelioide · epithelioid sarcoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| Perdita SMARCB1 (INI1) | del | diagnostico | ✗ | Inattivazione, spesso per delezione. | IHC INI1 (perdita) |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 18. Condrosarcoma convenzionale centrale (incluso tumore cartilagineo atipico)  `condrosarcoma`

- Stato: **confermata da Filippo** · Esito attuale: **sì** · Fonte: WHO Soft Tissue and Bone Tumours, 6ª ed. (2026), sintesi in Hornick et al., Am J Surg Pathol 2026 (PMID 42839882); WHO Soft Tissue and Bone Tumours, 5ª ed. (2020); PMID: 33239505
- Sinonimi: condrosarcoma · chondrosarcoma · tumore cartilagineo atipico · atypical cartilaginous tumor  
- Esclusi se il testo contiene: dedifferenziat · dedifferentiated · periferic · peripheral · periostal · periosteal · secondari · mesenchimal · mesenchymal · cellule chiare · clear cell · extrascheletric · extraskeletal · mixoide
- Avviso: Questa scheda riguarda solo il tipo convenzionale centrale. Terminologia WHO per il basso grado: «tumore cartilagineo atipico» nello scheletro appendicolare (ossa tubulari lunghe e corte), «condrosarcoma, grado 1» nello scheletro assiale (pelvi, scapola, base cranica); i due termini non sono intercambiabili. Se è scritto soltanto «condrosarcoma», definirne il sottotipo prima di applicare l'esito. IDH1/2 non distingue encondroma e condrosarcoma.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| IDH1 / IDH2 mutazione | snv | diagnostico | ✓ | Supporta l'origine cartilaginea. Presente anche nell'encondroma: NON distingue lesione benigna da maligna. |  |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 19. Astrocitoma pilocitico  `pilocitico`

- Stato: **confermata da Filippo** · Esito attuale: **sì** · Fonte: WHO CNS Tumours, 5ª ed. (2021)
- Sinonimi: astrocitoma pilocitico · pilocytic astrocytoma
- Collegata allo scenario: `glioma`
- Avviso: L'alterazione principale (fusione KIAA1549::BRAF) NON è rilevata dal pannello, che legge BRAF solo come SNV: un risultato negativo non esclude la diagnosi.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| KIAA1549::BRAF | fusions | diagnostico | ⚠️ altra classe | Alterazione più frequente; BRAF è nel pannello solo come SNV. | Pannello RNA esteso / FISH |
| BRAF V600E | snv | misto | ✓ | Minoranza dei casi. | IHC VE1 |
| FGFR1 mutazione | snv | diagnostico | ✓ | Minoranza dei casi. |  |
| NF1 inattivazione | snv | diagnostico | ✓ | Minoranza dei casi. |  |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 20. Carcinoma secretorio (mammella / ghiandole salivari)  `secretorio`

- Stato: **confermata da Filippo** · Esito attuale: **solo fusioni (da verificare)** · Fonte: WHO Breast Tumours, 5ª ed. (2019); WHO Head and Neck Tumours, 5ª ed.
- Sinonimi: carcinoma secretorio · secretory carcinoma · mammary analogue secretory carcinoma · masc  
- Esclusi se il testo contiene: tiroid · thyroid

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| ETV6::NTRK3 | fusions | misto | ✓ | Alterazione tipica. |  |
| ETV6::RET (salivari, minoranza) | fusions | misto | ✓ | Minoranza dei casi salivari. |  |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 21. Carcinoma mucoepidermoide  `mucoepidermoide`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Head and Neck Tumours, 5ª ed.
- Sinonimi: carcinoma mucoepidermoide · mucoepidermoid carcinoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| CRTC1 (o CRTC3)::MAML2 | fusions | diagnostico | ✗ | Alterazione tipica. | FISH MAML2 |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 22. Carcinoma adenoido-cistico  `adenoidocistico`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Head and Neck Tumours, 5ª ed.
- Sinonimi: carcinoma adenoido cistico · carcinoma adenoidocistico · adenoid cystic carcinoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| MYB (o MYBL1)::NFIB | fusions | diagnostico | ✗ | Alterazione tipica. | FISH MYB; IHC MYB (non specifica) |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 23. Tumore a cellule della granulosa, tipo adulto  `granulosa_adulto`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Female Genital Tumours, 5ª ed. (2020)
- Sinonimi: tumore a cellule della granulosa · tumore della granulosa · granulosa cell tumor  
- Esclusi se il testo contiene: giovanile · juvenile
- Avviso: Scheda valida solo per il tipo ADULTO. Il tumore a cellule della granulosa giovanile è un'entità distinta, in cui FOXL2 p.C134W non è l'alterazione tipica: stabilire il tipo prima di usare questa scheda.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| FOXL2 c.402C>G (p.C134W) | snv | diagnostico | ✗ | Alterazione definente della forma adulta. | Test mutazionale mirato FOXL2 |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 24. Carcinoma endometriale (classificazione molecolare)  `endometrio`

- Stato: **confermata da Filippo** · Esito attuale: **sì** · Fonte: WHO Female Genital Tumours, 5ª ed. (2020); FIGO 2023 (Berek et al., Int J Gynaecol Obstet 2023) per l'ordine dei classificatori
- Sinonimi: carcinoma endometriale · carcinoma dell endometrio · adenocarcinoma endometrioide · carcinoma endometrioide · carcinoma sieroso dell endometrio · carcinoma sieroso di alto grado dell endometrio · carcinoma sieroso endometriale · carcinoma sieroso uterino · carcinoma a cellule chiare dell endometrio · carcinoma a cellule chiare endometriale · carcinosarcoma dell endometrio · carcinosarcoma endometriale · carcinosarcoma uterino
- Avviso: I tre classificatori non sono equivalenti: con più alterazioni coesistenti l'ordine è POLE patogenetico → dMMR/MSI → p53. Una mutazione TP53 non assegna il sottogruppo p53-abnormal se coesistono POLE patogenetico o dMMR; il sottogruppo p53 si definisce per IHC.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| POLE mutazione patogenetica (dominio esonucleasico) | snv | misto | ✓ | Sottogruppo POLE-mutato; le VUS non classificano. |  |
| MSI (surrogato di dMMR) | msi | misto | ✓ | Lo standard per il sottogruppo è l'IHC MMR; MSI è complementare. | IHC MLH1/PMS2/MSH2/MSH6 |
| TP53 mutazione | snv | diagnostico | ✓ | Il sottogruppo p53-abnormal si definisce per IHC (WT / iperespressione / null); la mutazione NGS è di supporto, non sostitutiva. | IHC p53 |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 25. Carcinoma sieroso di alto grado (ovaio / tuba / peritoneo)  `hgsc`

- Stato: **confermata da Filippo** · Esito attuale: **sì** · Fonte: WHO Female Genital Tumours, 5ª ed. (2020)
- Sinonimi: carcinoma sieroso di alto grado · hgsc · carcinoma sieroso alto grado · carcinoma sieroso tubarico · carcinoma sieroso peritoneale  
- Esclusi se il testo contiene: endometrio · endometriale · utero · uterino · basso grado

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| TP53 mutazione | snv | diagnostico | ✓ | Quasi costante; supporto diagnostico (vs basso grado). | IHC p53 |
| BRCA1 / BRCA2 / HRD | snv | predittivo | ✗ | Non nel pannello: richiedere test BRCA tumorale/germinale e HRD. | Test BRCA tumorale/germinale; test HRD |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 26. Carcinoma sieroso di basso grado (ovaio)  `lgsc`

- Stato: **confermata da Filippo** · Esito attuale: **sì** · Fonte: WHO Female Genital Tumours, 5ª ed. (2020)
- Sinonimi: carcinoma sieroso di basso grado · lgsc · carcinoma sieroso basso grado

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| KRAS / BRAF / NRAS mutazione | snv | misto | ✓ | Via MAPK. |  |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 27. Carcinoma uroteliale  `uroteliale`

- Stato: **confermata da Filippo** · Esito attuale: **sì** · Fonte: WHO Urinary and Male Genital Tumours, 5ª ed. (2022)
- Sinonimi: carcinoma uroteliale · urothelial carcinoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| FGFR3 mutazione | snv | predittivo | ✓ | Bersaglio terapeutico: farmaci ed evidenze nella scheda del gene FGFR3. |  |
| FGFR3 fusione | fusions | predittivo | ✓ | Bersaglio terapeutico: farmaci ed evidenze nella scheda del gene FGFR3. |  |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 28. Adenocarcinoma prostatico  `prostata`

- Stato: **confermata da Filippo** · Esito attuale: **no** · Fonte: WHO Urinary and Male Genital Tumours, 5ª ed. (2022)
- Sinonimi: adenocarcinoma prostatico · carcinoma prostatico · adenocarcinoma della prostata

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| BRCA1 / BRCA2 | snv | predittivo | ✗ | Non nel pannello: richiedere test BRCA tumorale/germinale. | Test BRCA1/BRCA2 tumorale/germinale |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta

## 29. Neoplasie spitzoidi (nevo di Spitz, melanocitoma spitzoide, melanoma di Spitz)  `spitz`

- Stato: **confermata da Filippo** · Esito attuale: **sì** · Fonte: WHO Skin Tumours, 5ª ed.
- Sinonimi: nevo di spitz · tumore di spitz · melanocitoma spitzoide · melanoma di spitz · spitz
- Avviso: Scheda di famiglia, non diagnosi di grado. Le alterazioni elencate orientano verso la linea spitzoide ma NON distinguono nevo, melanocitoma e melanoma di Spitz; i partner riportati sono esempi, non una lista esaustiva.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| HRAS mutazione | snv | diagnostico | ✓ |  |  |
| Fusioni ALK, ROS1, NTRK1/3, RET, MET | fusions | diagnostico | ✓ | Definiscono sottotipi spitzoidi. |  |
| Fusioni BRAF o MAP3K8 | fusions | diagnostico | ⚠️ altra classe | BRAF è nel pannello solo come SNV. | Pannello RNA esteso |

- [x] alterazioni e partner corretti
- [x] sinonimi/esclusioni corretti
- [x] note e alternative corrette
- [x] fonte corretta
