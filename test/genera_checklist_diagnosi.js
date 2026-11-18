// Genera validazione_diagnosi_bozza.md dai dati in index.html.  Uso: node test/genera_checklist_diagnosi.js > validazione_diagnosi_bozza.md
const path = require("path");
const { DIAGNOSI, esitoDiagnosi } = require(path.join(__dirname, "extract.js"));

// Dubbi specifici: punti in cui la bozza contiene un'affermazione che va controllata
// oltre all'alterazione definente. Scritti da Claude, non dalla fonte.
const DUBBI = {
  dfsp: ["Partner alternativo COL6A3::PDGFD: confermare che sia citato dalla WHO."],
  gist: ["Riga SDH con classe `snv`: il deficit SDH può essere anche epimutazione (SDHC) → classe da rivedere.", "Fonte doppia (Digestive + STB): tenerne una sola?"],
  tmi: ["Frequenza «circa metà» per ALK: verificare.", "Altri partner non elencati (es. PDGFRB, RET): aggiungere?"],
  ntrk_spindle: ["Stato WHO dell'entità (definitiva o «emergente»): verificare e, se emergente, dirlo nell'etichetta."],
  ewing: ["FUS come partner alternativo di EWSR1 e ERG tra i partner: confermare."],
  rms_alveolare: ["Affermazione «lo stato di fusione ha valore prognostico»: serve la fonte."],
  pecoma: ["«TSC2 più frequente di TSC1»: verificare.", "«Rilevanza per inibitori mTOR» è predittiva: fonte WHO o regolatoria?"],
  condrosarcoma: ["«Supporta l'origine cartilaginea vs osteosarcoma condroblastico»: verificare.", "Lista `escludi` (dedifferenziato, periferico, periostale, secondario, mesenchimale, a cellule chiare, extrascheletrico, mixoide): completa e corretta?"],
  pilocitico: ["«NF1 spesso nel contesto sindromico»: verificare.", "Il link apre lo scenario Gliomi: è il contesto giusto?"],
  secretorio: ["La forma tiroidea (WHO Endocrine 2022) è esclusa: aggiungerla come voce a sé?", "ETV6::RET come minoranza nelle salivari: confermare."],
  adenoidocistico: ["«IHC MYB non specifica» come alternativa: va bene così?"],
  granulosa_adulto: ["Avviso «solo tipo adulto»: verificare la formulazione sul giovanile."],
  endometrio: ["Ordine POLE → dMMR → p53 nell'avviso: la fonte è WHO FGT 2020 o ESGO/ESTRO/ESP? Citarla.", "Riga MSI: va bene «MSI complementare, standard IHC MMR»?"],
  uroteliale: ["`_W.REG` segnaposto. Inclusione delle fusioni FGFR2 accanto a FGFR3: verificare sull'indicazione regolatoria attuale."],
  prostata: ["`_W.REG` segnaposto. ATM nell'elenco HRR: confermare."],
  spitz: ["Raggruppare nevo, melanocitoma e melanoma di Spitz in una sola voce con avviso: va bene, o meglio tre voci?", "Elenco dei partner di fusione: completo per lo scopo?"],
};

const COP = { coperta: "✓", parziale: "⚠️ altra classe", non_coperta: "✗" };
const ESITO = { si: "sì", fusione: "solo fusioni (da verificare)", parziale: "parziale", no: "no" };
const L = [];
L.push("# Validazione tabella DIAGNOSI (bozza)", "",
  `Generato da \`index.html\` il ${new Date().toISOString().slice(0, 10)}: ${DIAGNOSI.length} voci. Spuntare ogni casella; correggere direttamente in \`index.html\` (costante \`DIAGNOSI\`), poi rigenerare.`, "",
  "Per ogni voce controllare: **(1)** alterazione definente e partner, **(2)** sinonimi ed esclusioni (non devono unire entità distinte), **(3)** ruolo, nota, test alternativo, **(4)** fonte. La colonna «Pannello» è calcolata da `PANEL` e non va validata a mano: va controllata solo la classe assegnata (snv / fusions / cnv / del).", "",
  "Alla fine: rimuovere `stato:\"bozza\"` dalle voci validate (il badge «BOZZA non validata» sparisce solo per quelle).", "");
DIAGNOSI.forEach((d, n) => {
  const r = esitoDiagnosi(d);
  L.push(`## ${n + 1}. ${d.label}  \`${d.id}\``, "",
    `- Esito attuale: **${ESITO[r.esito]}** · Fonte: ${d.fonte}`,
    `- Sinonimi: ${d.sinonimi.join(" · ")}` + (d.escludi ? `  \n- Esclusi se il testo contiene: ${d.escludi.join(" · ")}` : ""));
  if (d.scenario) L.push(`- Collegata allo scenario: \`${d.scenario}\``);
  if (d.avviso) L.push(`- Avviso: ${d.avviso}`);
  L.push("", "| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |", "|---|---|---|---|---|---|");
  d.alterazioni.forEach((a, i) => L.push(`| ${a.alt} | ${a.classe} | ${a.ruolo} | ${COP[r.copertura[i]]} | ${(a.nota || "").replace(/\|/g, "/")} | ${a.alternativa || ""} |`));
  L.push("", "- [ ] alterazioni e partner corretti", "- [ ] sinonimi/esclusioni corretti", "- [ ] note e alternative corrette", "- [ ] fonte corretta");
  (DUBBI[d.id] || []).forEach(x => L.push(`- [ ] **Dubbio:** ${x}`));
  L.push("");
});
const senzaVoce = Object.keys(DUBBI).filter(k => !DIAGNOSI.some(d => d.id === k));
if (senzaVoce.length) throw new Error("DUBBI per id inesistenti: " + senzaVoce.join(", "));
process.stdout.write(L.join("\n"));
