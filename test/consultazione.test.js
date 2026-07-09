/* Harness per lo strumento di consultazione — nessuna dipendenza, nessuna rete.
   Uso:  node test/consultazione.test.js

   Verifica le tre proprietà che tengono in piedi lo strumento:
   1. ogni gene del pannello è consultabile e ha una descrizione utile;
   2. nessuna entry dichiara una classe di alterazione che il saggio non produce;
   3. non esiste nessun modo di copiare una frase di referto da qui. */

const { PANEL, GENE_DESC, SC, buildGeneIndex, makeRef, SOURCE } = require("./extract.js");

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
console.log(`\n${"─".repeat(60)}\n  ${pass} passati, ${fail} falliti`);
if (fail) { console.log("\n  Difetti:"); failures.forEach(f => console.log(`    · ${f}`)); }
process.exitCode = fail ? 1 : 0;
