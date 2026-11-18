# Validazione tabella DIAGNOSI (bozza)

Generato da `index.html` il 2026-11-17: 28 voci. Spuntare ogni casella; correggere direttamente in `index.html` (costante `DIAGNOSI`), poi rigenerare.

Per ogni voce controllare: **(1)** alterazione definente e partner, **(2)** sinonimi ed esclusioni (non devono unire entità distinte), **(3)** ruolo, nota, test alternativo, **(4)** fonte. La colonna «Pannello» è calcolata da `PANEL` e non va validata a mano: va controllata solo la classe assegnata (snv / fusions / cnv / del).

Alla fine: rimuovere `stato:"bozza"` dalle voci validate (il badge «BOZZA non validata» sparisce solo per quelle).

## 1. Dermatofibrosarcoma protuberans  `dfsp`

- Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: dermatofibrosarcoma · dfsp · tumore di bednar · dfsp fibrosarcomatoso

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| COL1A1::PDGFB | fusions | diagnostico | ✗ | Alterazione definente nella grande maggioranza dei casi (rari partner alternativi, es. COL6A3::PDGFD). | FISH break-apart PDGFB o pannello RNA esteso |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** Partner alternativo COL6A3::PDGFD: confermare che sia citato dalla WHO.

## 2. Tumore stromale gastrointestinale (GIST)  `gist`

- Esito attuale: **sì** · Fonte: WHO Digestive System Tumours, 5ª ed. (2019); WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: gist · tumore stromale gastrointestinale · tumore stromale gastro intestinale
- Collegata allo scenario: `gist`

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| KIT mutazione | snv | misto | ✓ | Driver più frequente. |  |
| PDGFRA mutazione | snv | misto | ✓ | Include D842V (vedi scheda gene). |  |
| Deficit SDH (SDHA/B/C/D) | snv | diagnostico | ✗ | GIST SDH-deficiente, KIT/PDGFRA wild-type. | IHC SDHB; consulenza genetica |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** Riga SDH con classe `snv`: il deficit SDH può essere anche epimutazione (SDHC) → classe da rivedere.
- [ ] **Dubbio:** Fonte doppia (Digestive + STB): tenerne una sola?

## 3. Tumore miofibroblastico infiammatorio  `tmi`

- Esito attuale: **solo fusioni (da verificare)** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: tumore miofibroblastico infiammatorio · imt · tmi · inflammatory myofibroblastic tumor

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| Fusione ALK | fusions | misto | ✓ | Circa metà dei casi. | IHC ALK |
| Fusione ROS1 | fusions | misto | ✓ | Sottogruppo ALK-negativo. |  |
| ETV6::NTRK3 | fusions | misto | ✓ | Sottogruppo ALK-negativo. |  |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** Frequenza «circa metà» per ALK: verificare.
- [ ] **Dubbio:** Altri partner non elencati (es. PDGFRB, RET): aggiungere?

## 4. Fibrosarcoma infantile  `fibrosarcoma_infantile`

- Esito attuale: **solo fusioni (da verificare)** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: fibrosarcoma infantile · fibrosarcoma congenito · infantile fibrosarcoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| ETV6::NTRK3 | fusions | misto | ✓ | Alterazione tipica; esistono casi con altri riarrangiamenti di NTRK o della via MAPK. |  |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta

## 5. Neoplasia a cellule fusate con riarrangiamento NTRK  `ntrk_spindle`

- Esito attuale: **solo fusioni (da verificare)** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: neoplasia a cellule fusate ntrk · ntrk rearranged spindle cell neoplasm · neoplasia mesenchimale ntrk
- Avviso: Tumori con fusioni RAF1, BRAF o RET hanno morfologia sovrapponibile ma NON rientrano in questa entità, definita dal riarrangiamento NTRK.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| Fusioni NTRK1/2/3 | fusions | misto | ✓ | Entità definita dal riarrangiamento. |  |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** Stato WHO dell'entità (definitiva o «emergente»): verificare e, se emergente, dirlo nell'etichetta.

## 6. Sarcoma sinoviale  `sinoviale`

- Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: sarcoma sinoviale · synovial sarcoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| SS18::SSX1/2/4 | fusions | diagnostico | ✗ | Alterazione definente. | IHC SS18-SSX / SSX C-term; FISH SS18 |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta

## 7. Sarcoma di Ewing  `ewing`

- Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: sarcoma di ewing · ewing

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| EWSR1 (o FUS)::FLI1/ERG | fusions | diagnostico | ✗ | Alterazione definente. | FISH EWSR1 break-apart; pannello RNA esteso |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** FUS come partner alternativo di EWSR1 e ERG tra i partner: confermare.

## 8. Rabdomiosarcoma alveolare  `rms_alveolare`

- Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: rabdomiosarcoma alveolare · alveolar rhabdomyosarcoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| PAX3/PAX7::FOXO1 | fusions | diagnostico | ✗ | Lo stato di fusione ha valore prognostico. | FISH FOXO1 |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** Affermazione «lo stato di fusione ha valore prognostico»: serve la fonte.

## 9. Liposarcoma mixoide  `lps_mixoide`

- Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: liposarcoma mixoide · liposarcoma a cellule rotonde · myxoid liposarcoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| FUS (o EWSR1)::DDIT3 | fusions | diagnostico | ✗ | Alterazione definente. | FISH DDIT3 |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta

## 10. Liposarcoma ben differenziato / dedifferenziato (tumore lipomatoso atipico)  `lps_wd_dd`

- Esito attuale: **parziale** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: liposarcoma ben differenziato · liposarcoma dedifferenziato · tumore lipomatoso atipico · alt wdl · wdlps · ddlps

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| Amplificazione MDM2 | cnv | diagnostico | ✗ | Alterazione definente. | FISH MDM2 |
| Amplificazione CDK4 | cnv | diagnostico | ⚠️ altra classe | Frequente co-amplificazione. | FISH/IHC CDK4 |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta

## 11. Sarcoma a cellule chiare dei tessuti molli  `cellule_chiare`

- Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: sarcoma a cellule chiare · clear cell sarcoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| EWSR1::ATF1 (o CREB1) | fusions | diagnostico | ✗ | Distingue dal melanoma. | FISH EWSR1 |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta

## 12. Sarcoma alveolare delle parti molli  `asps`

- Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: sarcoma alveolare delle parti molli · alveolar soft part sarcoma · asps

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| ASPSCR1::TFE3 | fusions | diagnostico | ✗ | Alterazione definente. | IHC TFE3; FISH TFE3 |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta

## 13. Tumore fibroso solitario  `sft`

- Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: tumore fibroso solitario · emangiopericitoma · solitary fibrous tumor · sft

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| NAB2::STAT6 | fusions | diagnostico | ✗ | Alterazione definente. | IHC STAT6 nucleare |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta

## 14. Fibromatosi desmoide  `desmoide`

- Esito attuale: **sì** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: fibromatosi desmoide · desmoide · tumore desmoide · fibromatosi aggressiva

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| CTNNB1 mutazione | snv | diagnostico | ✓ | Forme sporadiche. |  |
| APC (forme associate a FAP) | snv | diagnostico | ✗ | Forme sindromiche. | Test germinale APC se sospetto clinico |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta

## 15. PEComa  `pecoma`

- Esito attuale: **sì** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: pecoma · tumore a cellule epitelioidi perivascolari · angiomiolipoma epitelioide

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| TSC2 inattivazione | snv | misto | ✗ | Più frequente di TSC1; rilevanza per inibitori mTOR. |  |
| TSC1 mutazione | snv | misto | ✓ | Il pannello rileva SNV/InsDel di TSC1, non le delezioni. |  |
| Fusione TFE3 | fusions | diagnostico | ✗ | Sottogruppo distinto. | IHC/FISH TFE3 |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** «TSC2 più frequente di TSC1»: verificare.
- [ ] **Dubbio:** «Rilevanza per inibitori mTOR» è predittiva: fonte WHO o regolatoria?

## 16. Sarcoma epitelioide  `epitelioide`

- Esito attuale: **no** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: sarcoma epitelioide · epithelioid sarcoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| Perdita SMARCB1 (INI1) | del | diagnostico | ✗ | Inattivazione, spesso per delezione. | IHC INI1 (perdita) |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta

## 17. Condrosarcoma convenzionale centrale  `condrosarcoma`

- Esito attuale: **sì** · Fonte: WHO Soft Tissue and Bone Tumours, 5ª ed. (2020)
- Sinonimi: condrosarcoma · chondrosarcoma  
- Esclusi se il testo contiene: dedifferenziat · dedifferentiated · periferic · peripheral · periostal · periosteal · secondari · mesenchimal · mesenchymal · cellule chiare · clear cell · extrascheletric · extraskeletal · mixoide

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| IDH1 / IDH2 mutazione | snv | diagnostico | ✓ | Supporta l'origine cartilaginea (es. vs osteosarcoma condroblastico). Presente anche nell'encondroma: NON distingue lesione benigna da maligna. |  |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** «Supporta l'origine cartilaginea vs osteosarcoma condroblastico»: verificare.
- [ ] **Dubbio:** Lista `escludi` (dedifferenziato, periferico, periostale, secondario, mesenchimale, a cellule chiare, extrascheletrico, mixoide): completa e corretta?

## 18. Astrocitoma pilocitico  `pilocitico`

- Esito attuale: **sì** · Fonte: WHO CNS Tumours, 5ª ed. (2021)
- Sinonimi: astrocitoma pilocitico · pilocytic astrocytoma
- Collegata allo scenario: `glioma`

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| KIAA1549::BRAF | fusions | diagnostico | ⚠️ altra classe | Alterazione più frequente; BRAF è nel pannello solo come SNV. | Pannello RNA esteso / FISH |
| BRAF V600E | snv | misto | ✓ | Minoranza dei casi. | IHC VE1 |
| FGFR1 mutazione | snv | diagnostico | ✓ | Minoranza dei casi. |  |
| NF1 inattivazione | snv | diagnostico | ✓ | Minoranza dei casi; spesso nel contesto di NF1 sindromica. |  |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** «NF1 spesso nel contesto sindromico»: verificare.
- [ ] **Dubbio:** Il link apre lo scenario Gliomi: è il contesto giusto?

## 19. Carcinoma secretorio (mammella / ghiandole salivari)  `secretorio`

- Esito attuale: **solo fusioni (da verificare)** · Fonte: WHO Breast Tumours, 5ª ed. (2019); WHO Head and Neck Tumours, 5ª ed.
- Sinonimi: carcinoma secretorio · secretory carcinoma · mammary analogue secretory carcinoma · masc  
- Esclusi se il testo contiene: tiroid · thyroid

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| ETV6::NTRK3 | fusions | misto | ✓ | Alterazione tipica. |  |
| ETV6::RET (salivari, minoranza) | fusions | misto | ✓ | Minoranza dei casi salivari. |  |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** La forma tiroidea (WHO Endocrine 2022) è esclusa: aggiungerla come voce a sé?
- [ ] **Dubbio:** ETV6::RET come minoranza nelle salivari: confermare.

## 20. Carcinoma mucoepidermoide  `mucoepidermoide`

- Esito attuale: **no** · Fonte: WHO Head and Neck Tumours, 5ª ed.
- Sinonimi: carcinoma mucoepidermoide · mucoepidermoid carcinoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| CRTC1 (o CRTC3)::MAML2 | fusions | diagnostico | ✗ | Alterazione tipica. | FISH MAML2 |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta

## 21. Carcinoma adenoido-cistico  `adenoidocistico`

- Esito attuale: **no** · Fonte: WHO Head and Neck Tumours, 5ª ed.
- Sinonimi: carcinoma adenoido cistico · carcinoma adenoidocistico · adenoid cystic carcinoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| MYB (o MYBL1)::NFIB | fusions | diagnostico | ✗ | Alterazione tipica. | FISH MYB; IHC MYB (non specifica) |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** «IHC MYB non specifica» come alternativa: va bene così?

## 22. Tumore a cellule della granulosa, tipo adulto  `granulosa_adulto`

- Esito attuale: **no** · Fonte: WHO Female Genital Tumours, 5ª ed. (2020)
- Sinonimi: tumore a cellule della granulosa · tumore della granulosa · granulosa cell tumor  
- Esclusi se il testo contiene: giovanile · juvenile
- Avviso: Scheda valida solo per il tipo ADULTO. Il tumore a cellule della granulosa giovanile è un'entità distinta, in cui FOXL2 p.C134W non è l'alterazione tipica: stabilire il tipo prima di usare questa scheda.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| FOXL2 c.402C>G (p.C134W) | snv | diagnostico | ✗ | Alterazione definente della forma adulta. | Test mutazionale mirato FOXL2 |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** Avviso «solo tipo adulto»: verificare la formulazione sul giovanile.

## 23. Carcinoma endometriale (classificazione molecolare)  `endometrio`

- Esito attuale: **sì** · Fonte: WHO Female Genital Tumours, 5ª ed. (2020); FIGO 2023 (Berek et al., Int J Gynaecol Obstet 2023) per l'ordine dei classificatori
- Sinonimi: carcinoma endometriale · carcinoma dell endometrio · adenocarcinoma endometrioide · carcinoma endometrioide · carcinoma sieroso dell endometrio · carcinoma sieroso di alto grado dell endometrio · carcinoma sieroso endometriale · carcinoma sieroso uterino · carcinoma a cellule chiare dell endometrio · carcinoma a cellule chiare endometriale · carcinosarcoma dell endometrio · carcinosarcoma endometriale · carcinosarcoma uterino
- Avviso: I tre classificatori non sono equivalenti: con più alterazioni coesistenti l'ordine è POLE patogenetico → dMMR/MSI → p53. Una mutazione TP53 non assegna il sottogruppo p53-abnormal se coesistono POLE patogenetico o dMMR; il sottogruppo p53 si definisce per IHC.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| POLE mutazione patogenetica (dominio esonucleasico) | snv | misto | ✓ | Sottogruppo POLE-mutato; le VUS non classificano. |  |
| MSI (surrogato di dMMR) | msi | misto | ✓ | Lo standard per il sottogruppo è l'IHC MMR; MSI è complementare. | IHC MLH1/PMS2/MSH2/MSH6 |
| TP53 mutazione | snv | diagnostico | ✓ | Il sottogruppo p53-abnormal si definisce per IHC (WT / iperespressione / null); la mutazione NGS è di supporto, non sostitutiva. | IHC p53 |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** Ordine POLE → dMMR → p53 nell'avviso: la fonte è WHO FGT 2020 o ESGO/ESTRO/ESP? Citarla.
- [ ] **Dubbio:** Riga MSI: va bene «MSI complementare, standard IHC MMR»?

## 24. Carcinoma sieroso di alto grado (ovaio / tuba / peritoneo)  `hgsc`

- Esito attuale: **sì** · Fonte: WHO Female Genital Tumours, 5ª ed. (2020)
- Sinonimi: carcinoma sieroso di alto grado · hgsc · carcinoma sieroso alto grado · carcinoma sieroso tubarico · carcinoma sieroso peritoneale  
- Esclusi se il testo contiene: endometrio · endometriale · utero · uterino · basso grado

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| TP53 mutazione | snv | diagnostico | ✓ | Quasi costante; supporto diagnostico (vs basso grado). | IHC p53 |
| BRCA1 / BRCA2 / HRD | snv | predittivo | ✗ | Non nel pannello: richiedere test BRCA tumorale/germinale e HRD. | Test BRCA tumorale/germinale; test HRD |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta

## 25. Carcinoma sieroso di basso grado (ovaio)  `lgsc`

- Esito attuale: **sì** · Fonte: WHO Female Genital Tumours, 5ª ed. (2020)
- Sinonimi: carcinoma sieroso di basso grado · lgsc · carcinoma sieroso basso grado

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| KRAS / BRAF / NRAS mutazione | snv | misto | ✓ | Via MAPK. |  |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta

## 26. Carcinoma uroteliale  `uroteliale`

- Esito attuale: **sì** · Fonte: WHO Urinary and Male Genital Tumours, 5ª ed. (2022); rilevanza predittiva: fonte regolatoria da citare (non WHO)
- Sinonimi: carcinoma uroteliale · urothelial carcinoma

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| FGFR3 mutazione | snv | predittivo | ✓ | Rilevanza per inibitori FGFR. |  |
| FGFR2/FGFR3 fusione | fusions | predittivo | ✓ | Rilevanza per inibitori FGFR. |  |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** `_W.REG` segnaposto. Inclusione delle fusioni FGFR2 accanto a FGFR3: verificare sull'indicazione regolatoria attuale.

## 27. Adenocarcinoma prostatico  `prostata`

- Esito attuale: **no** · Fonte: WHO Urinary and Male Genital Tumours, 5ª ed. (2022); rilevanza predittiva: fonte regolatoria da citare (non WHO)
- Sinonimi: adenocarcinoma prostatico · carcinoma prostatico · adenocarcinoma della prostata

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| BRCA1 / BRCA2 / ATM e altri geni HRR | snv | predittivo | ✗ | Rilevanza per inibitori PARP: NON coperta dal pannello. | Pannello HRR tumorale/germinale |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** `_W.REG` segnaposto. ATM nell'elenco HRR: confermare.

## 28. Neoplasie spitzoidi (nevo di Spitz, melanocitoma spitzoide, melanoma di Spitz)  `spitz`

- Esito attuale: **sì** · Fonte: WHO Skin Tumours, 5ª ed.
- Sinonimi: nevo di spitz · tumore di spitz · melanocitoma spitzoide · melanoma di spitz · spitz
- Avviso: Le alterazioni elencate collocano la lesione nella famiglia spitzoide, NON ne stabiliscono il grado: nevo, melanocitoma e melanoma di Spitz restano distinti su base morfologica e clinico-patologica.

| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |
|---|---|---|---|---|---|
| HRAS mutazione | snv | diagnostico | ✓ | Spesso con guadagno 11p. |  |
| Fusioni ALK, ROS1, NTRK1/3, RET, MET | fusions | diagnostico | ✓ | Definiscono sottotipi spitzoidi. |  |
| Fusioni BRAF o MAP3K8 | fusions | diagnostico | ⚠️ altra classe | BRAF è nel pannello solo come SNV. | Pannello RNA esteso |

- [ ] alterazioni e partner corretti
- [ ] sinonimi/esclusioni corretti
- [ ] note e alternative corrette
- [ ] fonte corretta
- [ ] **Dubbio:** Raggruppare nevo, melanocitoma e melanoma di Spitz in una sola voce con avviso: va bene, o meglio tre voci?
- [ ] **Dubbio:** Elenco dei partner di fusione: completo per lo scopo?
