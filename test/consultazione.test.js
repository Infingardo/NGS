/* Harness per lo strumento di consultazione — nessuna dipendenza, nessuna rete.
   Uso:  node test/consultazione.test.js

   Verifica le tre proprietà che tengono in piedi lo strumento:
   1. ogni gene del pannello è consultabile e ha una descrizione utile;
   2. nessuna entry dichiara una classe di alterazione che il saggio non produce;
   3. non esiste nessun modo di copiare una frase di referto da qui. */

const { PANEL, GENE_DESC, SC, buildGeneIndex, makeRef, evClass, SOURCE } = require("./extract.js");

let pass = 0, fail = 0;
const failures = [];
const check = (nome, cond, dettaglio) => {
  if (cond) { pass++; console.log(`  ✓ ${nome}`); }
  else { fail++; failures.push(nome); console.log(`  ✗ ${nome}${dettaglio ? `\n      ${dettaglio}` : ""}`); }
};
const group = t => console.log(`\n── ${t}`);

const GENI_PANNELLO = [...new Set([...PANEL.snv, ...PANEL.fusions, ...PANEL.cnv])];

/* ─────────────────────────────────────────────────────────────── */
group("Ogni gene del pannello è consultabile");

const indice = buildGeneIndex();
const mancanti = GENI_PANNELLO.filter(g => !(g in indice));
check(`tutti i ${GENI_PANNELLO.length} geni del pannello sono nell'indice`,
  mancanti.length === 0, `mancano: ${mancanti.join(", ")}`);

const senzaDesc = [...GENI_PANNELLO, ...Object.keys(indice)].filter(g => !GENE_DESC[g]);
check("nessun gene consultabile è privo di descrizione",
  senzaDesc.length === 0, `senza GENE_DESC: ${[...new Set(senzaDesc)].join(", ")}`);

const generiche = Object.keys(indice).filter(g => /^Gene con rilevanza oncologica/.test(GENE_DESC[g] || ""));
check("nessuna descrizione è il fallback generico",
  generiche.length === 0, `generiche: ${generiche.join(", ")}`);

/* ─────────────────────────────────────────────────────────────── */
group("Copertura: nessuna entry promette in silenzio ciò che il saggio non rileva");

// Un'entry PUÒ parlare di una classe che il pannello non rileva — è spesso
// l'informazione più utile ("il pannello vede BRAF V600E ma non KIAA1549::BRAF").
// Ciò che non può fare è dichiararla SENZA avvertire. Questo è l'invariante.
const CLASSE = { snv: "snv", fusions: "fusions", cnv: "cnv", msi: "msi", ihc: null };
const mute = [], avvisate = [];
for (const sc of SC) {
  for (const e of sc.entries) {
    for (const t of e.type) {
      const col = CLASSE[t];
      if (!col) continue;
      for (const g of e.genes) {
        if (PANEL[col].includes(g)) continue;
        (e.panel_coverage_warning ? avvisate : mute).push(`${sc.id}/${g}: type "${t}" fuori da PANEL.${col}`);
      }
    }
  }
}
check("ogni classe fuori pannello è accompagnata da un panel_coverage_warning",
  mute.length === 0, mute.slice(0, 4).join("\n      "));
console.log(`      (${avvisate.length} dichiarazioni fuori pannello, tutte con avviso: ${avvisate.join("; ") || "nessuna"})`);

check("la CNV resta limitata a EGFR, ERBB2, MET",
  JSON.stringify([...PANEL.cnv].sort()) === JSON.stringify(["EGFR", "ERBB2", "MET"]),
  `PANEL.cnv = ${PANEL.cnv}`);

/* ─────────────────────────────────────────────────────────────── */
group("{GENI}: alternativi con «/», co-mutazioni con «,»");

const ras = SC.find(s => s.id === "tiroide").entries.find(e => e.genes.includes("NRAS"));
check("geni alternativi separati da «/»",
  /NRAS \/ HRAS \/ KRAS/.test(makeRef(ras)),
  makeRef(ras).slice(0, 60));

const stk = SC.find(s => s.id === "nsclc").entries.find(e => e.genes.includes("STK11"));
check("co-mutazione STK11+KEAP1 resta una congiunzione",
  /STK11, KEAP1/.test(makeRef(stk)),
  makeRef(stk).slice(0, 60));

check("con un gene noto, la frase nomina solo quello",
  makeRef(ras, "NRAS").includes("mutazione di NRAS,") && !makeRef(ras, "NRAS").includes("HRAS"));

/* ─────────────────────────────────────────────────────────────── */
group("Nessuna frase di referto è copiabile da questo strumento");

for (const [nome, re] of [
  ["nessun handler di copia", /onclick="(copyRef|copyRefSplit|rrCopy|rvCopy)\(/],
  ["nessun pulsante .btn-copy / .rr-copy", /class="(btn-copy|rr-copy|rv-btn-copy)"/],
  // solo riferimenti eseguibili: il commento che documenta la rimozione può citarli
  ["nessuna modalità Referto Rapido", /state\.refertoRapido|function toggleRR|onclick="toggleRR/],
  ["nessuna funzione safeCopy", /function safeCopy/],
  ["nessun residuo del lettore referti", /parseReferto|renderVariantCard|rvOCR|Tesseract/],
]) check(nome, !re.test(SOURCE));

check("l'intestazione non promette l'interpretazione del referto",
  !/Interpreta Referto/.test(SOURCE));

/* ─────────────────────────────────────────────────────────────── */
group("Indice delle trappole: generato, non scritto");

const trappole = SC.flatMap(s => s.entries.filter(e => e.trappola).map(e => `${s.id}/${e.genes[0]}`));
const warnings = SC.flatMap(s => s.entries.filter(e => e.panel_coverage_warning).map(e => `${s.id}/${e.genes[0]}`));

check("esiste la vista trappole", /function renderTrappole/.test(SOURCE) && /id="trap-view"/.test(SOURCE));
check("il contenuto è raccolto dal database", /function raccogliTrappole/.test(SOURCE));
check("nessuna trappola è scritta a mano nell'HTML della vista",
  /id="trap-view"[^>]*><\/div>/.test(SOURCE),
  "il contenitore #trap-view deve essere vuoto: il contenuto lo genera renderTrappole()");

check("le trappole vivono in un campo dedicato, non dentro `note`",
  !SC.some(s => s.entries.some(e => e.note && /TRAPPOLA/i.test(e.note))),
  "una nota contiene ancora la parola TRAPPOLA: spostala nel campo `trappola`");

check(`${trappole.length} trappole e ${warnings.length} limiti di copertura sono indicizzabili`,
  trappole.length > 0 && warnings.length > 0,
  `trappole=${trappole.join(", ")} · warning=${warnings.join(", ")}`);

check("l'indice dichiara la propria incompletezza",
  /non è completo, e non può esserlo/.test(SOURCE) && /nessuno l'ha ancora scritta/.test(SOURCE));

/* ─────────────────────────────────────────────────────────────── */
group("Note di scenario");

const conNote = SC.filter(s => s.notes).map(s => s.id);
check("gli scenari con limiti noti dichiarano cosa il pannello NON copre",
  conNote.includes("tiroide") && conNote.includes("glioma"),
  `hanno notes: ${conNote.join(", ") || "nessuno"}`);
console.log(`      (${conNote.length}/${SC.length} scenari hanno note — gli altri sono un debito aperto)`);

/* ─────────────────────────────────────────────────────────────── */
group("Stato regolatorio: raccomandazione ≠ indicazione approvata");

const evBadgesTesto = ev => ev.split("·").map(x => x.trim()).filter(Boolean);
const entryDi = (scId, gene) => SC.find(s => s.id === scId).entries.find(e => e.genes.includes(gene));
const testo = e => [e.evidence, e.drug, e.note, e.action, e.referto].join(" ");

// KRAS G12C nel PDAC: sotorasib/adagrasib non hanno indicazione di label nel PDAC
// (FDA: solo NSCLC/CRC); l'unica base è la raccomandazione NCCN.
const krasPdac = entryDi("pancreas", "KRAS");
check("KRAS PDAC: nessuna dicitura FDA/approvazione che attivi il badge di approvazione",
  evClass(krasPdac.evidence) === "ev-NCCN" && !/FDA/i.test(krasPdac.evidence),
  `evidence="${krasPdac.evidence}" → ${evClass(krasPdac.evidence)}`);
const senzaNegazioni = [krasPdac.evidence, krasPdac.drug, krasPdac.note, krasPdac.action, krasPdac.referto]
  .join(" ").replace(/no target approvati/g, "");
check("KRAS PDAC: nessuna affermazione di approvazione (solo «no target approvati» per le altre varianti)",
  !/approvat|con approvazione/i.test(senzaNegazioni), senzaNegazioni.match(/.{30}approvat.{20}/i)?.[0]);
check("KRAS PDAC: il badge NCCN dichiara 2A/2B e «non Cat 1» (la legenda dello stile NCCN è Cat 1)",
  /NCCN cat\. 2A\/2B, non Cat 1/.test(krasPdac.evidence) && evBadgesTesto(krasPdac.evidence).some(t => /non Cat 1/.test(t)));
check("KRAS PDAC: G12C attribuito a NCCN, con versione e categorie 2A e 2B",
  /NCCN/.test(krasPdac.evidence) && /v3\.2026/.test(krasPdac.note) && /2A/.test(krasPdac.note) && /2B/.test(krasPdac.note));
check("KRAS PDAC: il referto limita la negazione alla label FDA e dichiara EMA/AIFA non verificati",
  /non è un'indicazione di label FDA nel PDAC \(stato EMA\/AIFA non verificato\)/.test(krasPdac.referto));
check("KRAS PDAC: la nota separa raccomandazione, label e stato italiano",
  /raccomandazione, non un'indicazione di label/.test(krasPdac.note) && /EMA\/AIFA non verificato/.test(krasPdac.note) && /rimborsabilità in Italia/.test(krasPdac.note));
check("KRAS PDAC: G12D resta in trial, nessun target approvato per le altre varianti",
  /G12D.*trial/.test(krasPdac.referto) && /no target approvati/.test(krasPdac.referto));

// Il documento clinico non deve contraddire la scheda (G12C nel PDAC ≠ approvato).
const DOC = require("fs").readFileSync(require("path").join(__dirname, "..", "pannello_NGS_Diatech_documento_clinico.md"), "utf8");
const rigaDoc = DOC.split("\n").find(r => r.startsWith("**KRAS nel PDAC**")) || "";
check("documento clinico (riga KRAS nel PDAC): G12C = opzione NCCN, non indicazione approvata",
  /sotorasib\/adagrasib sono opzioni NCCN/.test(rigaDoc) && /v3\.2026/.test(rigaDoc) && !/indica sotorasib/.test(rigaDoc)
  && rigaDoc.includes("non un'indicazione di label FDA nel PDAC") && !/(^|[^n]\s)un'indicazione (approvata|di label FDA)/.test(rigaDoc));
check("documento clinico (riga KRAS nel PDAC): la categoria 2A è dichiarata dedotta, la 2B esplicita",
  /2A.*dedotta.*2B.*esplicita/.test(rigaDoc));
check("KRAS PDAC: la nota dichiara la 2A dedotta e la 2B esplicita, e la fonte come adattamento polacco",
  /2A.*dedotta.*2B.*esplicita/.test(krasPdac.note) && /adattamento polacco/.test(krasPdac.note));
check("documento clinico (riga KRAS nel PDAC): limite FDA, EMA/AIFA non verificati, non equivale a rimborsabilità in Italia",
  /label FDA nel PDAC \(stato EMA\/AIFA non verificato/.test(rigaDoc) && /rimborsabilità in Italia/.test(rigaDoc));

// NRG1 (zenocutuzumab): approvazione FDA accelerata, dopo terapia precedente. Guardia di regressione.
for (const [scId, nome] of [["nsclc", "NSCLC"], ["pancreas", "PDAC"]]) {
  const e = entryDi(scId, "NRG1");
  check(`NRG1 ${nome}: approvazione FDA accelerata, dopo terapia precedente`,
    /FDA accel/i.test(e.evidence) && /precedent/i.test(testo(e)), `evidence="${e.evidence}"`);
}

/* ─────────────────────────────────────────────────────────────── */
group("Correzioni verificate su fonti primarie (FDA/EMA, 06/11/2026)");

const tutto = e => [e.evidence, e.drug, e.note, e.action, e.referto, e.referto_diag, e.referto_pred].filter(Boolean).join(" ");
const tag = (e, re) => evBadgesTesto(e.evidence).find(t => re.test(t));
const docRiga = inizio => DOC.split("\n").find(r => r.startsWith(inizio)) || "";

// 1. NRG1 PDAC: approvazione FDA accelerata del 4 dicembre 2024 (non agosto).
const nrgPdac = entryDi("pancreas", "NRG1");
check("NRG1 PDAC: data di approvazione FDA 4 dicembre 2024, nessun «agosto 2024»",
  /4 dicembre 2024/.test(nrgPdac.note) && !/agosto 2024/i.test(tutto(nrgPdac)), nrgPdac.note);

// 2. BRAF CRC: I linea con FOLFOX autorizzata anche da EMA; nessuna dicitura «in valutazione».
const brafCrc = entryDi("crc", "BRAF");
check("BRAF CRC: nessuna dicitura «in valutazione»/CHMP/divergenza FDA-EMA ancora aperta",
  !/in valutazione|CHMP|DIVERGENZA/i.test(tutto(brafCrc)), tutto(brafCrc).match(/.{30}(in valutazione|CHMP|DIVERGENZA).{30}/i)?.[0]);
check("BRAF CRC: badge EMA copre la I linea (non solo «post-prior»)",
  /I\+II linea/.test(tag(brafCrc, /^EMA/) || "") && evClass(tag(brafCrc, /^EMA/) || "") === "ev-EMA", brafCrc.evidence);
check("BRAF CRC: la I linea indica FOLFOX per EMA e mFOLFOX6 per FDA; il backbone resta encorafenib+cetuximab",
  /FDA.*mFOLFOX6/.test(brafCrc.referto_pred) && /EMA.*FOLFOX/.test(brafCrc.referto_pred) && /NON encorafenib\+binimetinib/.test(brafCrc.note));

// 3. iCCA FGFR2: infigratinib ritirato (FDA 16/05/2024), mai autorizzato in EU.
const fgfrIcca = entryDi("pancreas", "FGFR2");
check("iCCA FGFR2: infigratinib non è proposto tra i farmaci né nel referto",
  !/infigratinib/i.test(fgfrIcca.drug) && !/infigratinib/i.test(fgfrIcca.referto) && !/infigratinib/i.test(fgfrIcca.action));
check("iCCA FGFR2: la nota dichiara ritiro FDA 16/05/2024 e assenza in EU",
  /Infigratinib: approvazione FDA ritirata il 16\/05\/2024/.test(fgfrIcca.note) && /mai autorizzato in EU/.test(fgfrIcca.note));
check("documento clinico (FGFR2 iCCA): infigratinib non più tra gli approvati, ritiro dichiarato",
  !/pemigatinib, infigratinib/.test(docRiga("**FGFR2 nel CCA")) && /16\/05\/2024/.test(docRiga("**FGFR2 nel CCA")));

// 4. Vorasidenib: FDA 06/08/2024; EU più ristretto.
const idhGlioma = entryDi("glioma", "IDH1");
check("glioma IDH: nessun «2023» associato a vorasidenib; FDA 2024 in evidenza e referto",
  /vorasidenib 2024/.test(idhGlioma.evidence) && /6 agosto 2024/.test(idhGlioma.referto_pred) && !/2023/.test(tutto(idhGlioma)), idhGlioma.evidence);
check("glioma IDH: indicazione EU (Gr2 prevalentemente non captante, dopo sola chirurgia) in evidenza, nota e referto",
  /EMA \(Gr2 non captante\)/.test(idhGlioma.evidence) && /non captante/.test(idhGlioma.note) && /non captante/.test(idhGlioma.referto_pred)
  && evClass(tag(idhGlioma, /^EMA/) || "") === "ev-EMA");
check("glioma IDH: il perimetro Gr2 (non Gr3, non Gr4) resta dichiarato",
  /EU: Gr2 non captante/.test(idhGlioma.action) && /NON Gr3, NON Gr4/.test(idhGlioma.note) && /NON si estende al Grado 3 né al Grado 4/.test(idhGlioma.referto_pred));
for (const [inizio, nome] of [["**Scenario A", "scenario A"], ["**IDH1/IDH2 — ruolo", "ruolo diagnostico"]]) {
  const r = docRiga(inizio);
  check(`documento clinico (vorasidenib, ${nome}): 6 agosto 2024, grado 2, nessun «2023» né «grado 1-2»`,
    /6 agosto 2024/.test(r) && !/vorasidenib[^.]*2023/i.test(r) && !/Gr1-2|grado 1-2/i.test(r), r.slice(0, 160));
}

// 5. Pralsetinib: autorizzazione EU ritirata il 24/10/2024.
for (const [scId, nome] of [["nsclc", "NSCLC"], ["tiroide", "tiroide"]]) {
  const e = entryDi(scId, "RET");
  // ogni campo che nomina pralsetinib deve riportare anche il ritiro dell'AIC EU
  const campi = ["drug", "note", "action", "referto", "referto_diag", "referto_pred"].filter(k => /pralsetinib/i.test(e[k] || ""));
  const senza = campi.filter(k => !/24\/10\/2024/.test(e[k]));
  check(`RET ${nome}: ogni campo che cita pralsetinib riporta il ritiro dell'AIC EU (24/10/2024)`,
    campi.length > 0 && senza.length === 0, `campi: ${campi.join(", ")}; senza ritiro: ${senza.join(", ") || "nessuno"}`);
}
check("RET: la descrizione sintetica del gene riporta il ritiro EU di pralsetinib",
  /pralsetinib[^.]*24\/10\/2024/.test(GENE_DESC.RET), GENE_DESC.RET);
check("documento clinico (RET MTC): pralsetinib con ritiro EU del 24/10/2024",
  /pralsetinib \(per pralsetinib l'autorizzazione EU è stata ritirata il 24\/10\/2024\)/.test(docRiga("**RET nel carcinoma midollare")));
check("RET agnostico: selpercatinib resta l'unico farmaco (EMA agnostico verificato)",
  entryDi("agnostico", "RET").drug === "Selpercatinib" && /EMA/.test(entryDi("agnostico", "RET").evidence));

// 6. AKT1: capivasertib autorizzato anche in EU.
const akt1 = entryDi("mammella", "AKT1");
check("AKT1: badge FDA e EMA; nota con indicazione EU PIK3CA/AKT1/PTEN",
  evClass(tag(akt1, /^FDA/) || "") === "ev-FDA" && evClass(tag(akt1, /^EMA/) || "") === "ev-EMA" && /PIK3CA\/AKT1\/PTEN/.test(akt1.note) && /EU/.test(akt1.note) && /dopo ricorrenza o progressione su terapia endocrina/.test(akt1.note), akt1.evidence);

/* ─────────────────────────────────────────────────────────────── */
console.log(`\n${"─".repeat(60)}\n  ${pass} passati, ${fail} falliti`);
if (fail) { console.log("\n  Difetti:"); failures.forEach(f => console.log(`    · ${f}`)); }
process.exitCode = fail ? 1 : 0;
