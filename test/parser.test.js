/* Harness parser referti NGS — nessuna dipendenza, nessuna rete.
   Uso:  node test/parser.test.js
   I test descrivono il comportamento CORRETTO. Quelli che falliscono oggi
   sono difetti noti, non test sbagliati. */

const { parseReferto, lookupGeneInDB, checkVAF, renderVariantCard } = require("./extract.js");
const { REALE_NEGATIVO, IPOTETICI_POSITIVI, OCR_NOISE, NEGAZIONI } = require("./fixtures.js");

let pass = 0, fail = 0;
const failures = [];

function check(nome, cond, dettaglio) {
  if (cond) { pass++; console.log(`  ✓ ${nome}`); }
  else { fail++; failures.push(nome); console.log(`  ✗ ${nome}${dettaglio ? `\n      ${dettaglio}` : ""}`); }
}
function group(t) { console.log(`\n── ${t}`); }

/* ─────────────────────────────────────────────────────────────── */
group("SNV sul referto reale (funziona oggi)");

const p = parseReferto(REALE_NEGATIVO);
check("estrae 4 varianti", p.variants.length === 4, `trovate ${p.variants.length}`);
check("cellularità 30%", p.cellularity === 30, `${p.cellularity}`);
check("MSI = MSS", p.msi === "MSS", `${p.msi}`);
check("campione valutabile", p.notEvaluable === false);
check("TP53 stop_gained → Patogenetica",
  p.variants.some(v => v.gene === "TP53" && v.classif === "Patogenetica"));
check("ALK missense → VUS (non patogenetica)",
  p.variants.some(v => v.gene === "ALK" && v.classif === "VUS"));

/* ─────────────────────────────────────────────────────────────── */
group("Sezioni lette dal referto reale");

check("sezione CNV letta come negativa", p.sections.cnv.status === "negative", JSON.stringify(p.sections.cnv));
check("sezione Fusioni letta come negativa", p.sections.fusions.status === "negative", JSON.stringify(p.sections.fusions));
check("sbilanciamento ALK letto come negativo", p.sections.alk.status === "negative", JSON.stringify(p.sections.alk));
check("nessuna CNV, nessuna fusione", p.cnv.length === 0 && p.fusions.length === 0);

group("Guardia: nessuna frase può asserire ciò che il referto esclude");

const alk = p.variants.find(v => v.gene === "ALK");
const hits = lookupGeneInDB("ALK", "polmone");
// Il referto dice `Fusioni: assenza` e `Sbilanciamento di Alk: non positivo`.
const denied = { fusion: true, cnv: true };

const cardBloccata = renderVariantCard(alk, 0, hits, p.cellularity, denied);
check("la frase «Identificata fusione» NON viene emessa",
  !/Identificata fusione/i.test(cardBloccata),
  "la card contiene ancora l'asserzione di fusione");
check("compare invece il blocco esplicativo",
  /Frase non generata/.test(cardBloccata));
check("il pulsante Copia è rimosso per quella entry",
  !/rv-btn-copy/.test(cardBloccata));
check("farmaco ed evidenza restano visibili, con avviso",
  /Alectinib/.test(cardBloccata) && /rv-drug-caution/.test(cardBloccata));

// Regressione: se il referto NON esclude la fusione, la frase deve tornare.
const cardLibera = renderVariantCard(alk, 0, hits, p.cellularity, { fusion: false, cnv: false });
check("senza esclusione, la frase viene emessa normalmente",
  /Identificata fusione/i.test(cardLibera) && /rv-btn-copy/.test(cardLibera));

/* ─────────────────────────────────────────────────────────────── */
group("CNV / fusioni: sezioni numerate del formato reale");

for (const [nome, riga] of Object.entries(IPOTETICI_POSITIVI)) {
  const r = parseReferto(riga);
  const visto = r.cnv.length > 0 || r.fusions.length > 0;
  check(`rileva o segnala: ${nome}`, visto, `«${riga}» → cnv=[] fusions=[] (scartato in silenzio)`);
}

group("CNV / fusioni: le negazioni non devono generare alterazioni");

for (const riga of NEGAZIONI) {
  const r = parseReferto(riga);
  check(`nessuna CNV da: «${riga}»`, r.cnv.length === 0,
    `ha prodotto ${JSON.stringify(r.cnv)}`);
}

/* ─────────────────────────────────────────────────────────────── */
group("Robustezza al rumore OCR (Tesseract su foto)");

const attesoTP53 = v => v.length === 1 && v[0].gene === "TP53" && v[0].classif === "Patogenetica";
for (const [nome, riga] of Object.entries(OCR_NOISE)) {
  if (nome.startsWith("paren") || nome.startsWith("spazio_due") || nome.startsWith("due_letto")) continue;
  const v = parseReferto(riga).variants;
  check(`SNV sopravvive a: ${nome}`, attesoTP53(v),
    v.length ? JSON.stringify(v[0]) : "variante persa del tutto");
}

/* ─────────────────────────────────────────────────────────────── */
group("checkVAF: differenziale per VAF molto superiore all'attesa");

const vafAlk = checkVAF(58.1, 30);
check("VAF 58% con cellularità 30% viene segnalata", vafAlk.level !== "ok", `level=${vafAlk.level}`);
check("il differenziale menziona la variante germinale",
  /germinal/i.test(vafAlk.alertHtml),
  `dice solo: "${(vafAlk.alertHtml.match(/Compatibile con [^.<]*/) || ["?"])[0]}"`);

/* ─────────────────────────────────────────────────────────────── */
console.log(`\n${"─".repeat(60)}`);
console.log(`  ${pass} passati, ${fail} falliti`);
if (fail) {
  console.log(`\n  Difetti confermati:`);
  failures.forEach(f => console.log(`    · ${f}`));
}
process.exitCode = fail ? 1 : 0;
