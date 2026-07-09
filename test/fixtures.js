/* ATTENZIONE — PRIVACY
   Questo repo è pubblico (GitHub Pages). Nessun referto reale non anonimizzato
   deve entrare qui: un commit resta nella history anche se il file viene cancellato.
   Le fixture contengono SOLO la sezione tecnica (da "RISULTATO:" in giù).
   Vietati: nome, cognome, data di nascita, sesso, n. esame, reparto, medico. */

/* Referto reale (Sacco, pannello Diatech "NGS cancer probe PLUS Myriapod").
   Anonimizzato. CNV e fusioni negative — come in tutti e 5 i referti disponibili. */
const REALE_NEGATIVO = `
Cellularità tumorale presente nel campione in seguito a macrodissezione manuale: circa 30%.
Quantità DNA estratto: adeguata.
RISULTATO:
1) Varianti identificate:
-ALK esone 28 c.4115A>C p.Asp1372Ala rs1448176747 missense_variant VAF 58.10  Variant of Uncertain Significance
-FGFR4 esone 13 c.1648G>A p.Val550Met missense_variant VAF 5.80 Variant of Uncertain Significance
-RB1 esone 25 c.2634T>G p.Asp878Glu missense_variant VAF 49.30 Variant of Uncertain Significance
-TP53 esone 5 c.548C>G p.Ser183* rs1555525970 stop_gained VAF 21.40 Pathogenic
2) CNV: assenza
3) Fusioni: assenza
4) Sbilanciamento di Alk: non positivo
5) Status microsatelliti: MSS (Stabilità Microsatellitare)
`;

/* Positivi IPOTETICI. Il formato della sezione (`N) Etichetta: valore`) è osservato
   su 5 referti reali; il *valore* in caso di positività non è mai stato visto.
   Per questo il parser deve fallire rumorosamente, non indovinare. */
const IPOTETICI_POSITIVI = {
  cnv_amplificazione: "2) CNV: ERBB2 amplificazione (ratio 4.2)",
  fusione_hgvs:       "3) Fusioni: EML4::ALK",
  fusione_trattino:   "3) Fusioni: EML4-ALK",
  alk_sbilanciato:    "4) Sbilanciamento di Alk: positivo",
};

/* Rumore OCR osservabile su Tesseract applicato a foto di stampa. */
const OCR_NOISE = {
  spazio_dopo_c:   "-TP53 esone 5 c. 548C>G p.Ser183* rs1555525970 stop_gained VAF 21.40 Pathogenic",
  vaf_attaccata:   "-TP53 esone 5 c.548C>G p.Ser183* rs1555525970 stop_gained VAF21.40 Pathogenic",
  classif_a_capo:  "-TP53 esone 5 c.548C>G p.Ser183* rs1555525970 stop_gained VAF 21.40\nPathogenic",
  paren_graffa:    "2} CNV: assenza",
  spazio_due_punti:"2) CNV : assenza",
  due_letto_z:     "Z) CNV: assenza",
};

/* Negazioni che NON devono generare una CNV. */
const NEGAZIONI = [
  "2) CNV: assenza",
  "3) Fusioni: assenza",
  "4) Sbilanciamento di Alk: non positivo",
  "Non sono state rilevate amplificazioni geniche",
  "ERBB2: amplificazione non rilevata",
  "Risultato: amplificazione",   // "Risultato" non è un gene
];

module.exports = { REALE_NEGATIVO, IPOTETICI_POSITIVI, OCR_NOISE, NEGAZIONI };
