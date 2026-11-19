// Genera validazione_diagnosi_bozza.md dai dati in index.html.  Uso: node test/genera_checklist_diagnosi.js > validazione_diagnosi_bozza.md
const path = require("path");
const { DIAGNOSI, esitoDiagnosi } = require(path.join(__dirname, "extract.js"));

const COP = { coperta: "✓", parziale: "⚠️ altra classe", non_coperta: "✗" };
const ESITO = { si: "sì", fusione: "solo fusioni (da verificare)", no: "no" };
const L = [];
L.push("# Validazione tabella DIAGNOSI (bozza)", "",
  `Generato da \`index.html\` il ${new Date().toISOString().slice(0, 10)}: ${DIAGNOSI.length} voci. Spuntare ogni casella; correggere direttamente in \`index.html\` (costante \`DIAGNOSI\`), poi rigenerare.`, "",
  "Per ogni voce controllare: **(1)** alterazione definente e partner, **(2)** sinonimi ed esclusioni (non devono unire entità distinte), **(3)** ruolo, nota, test alternativo, **(4)** fonte. La colonna «Pannello» è calcolata da `PANEL` e non va validata a mano: va controllata solo la classe assegnata (snv / fusions / cnv / del).", "",
  "Le voci già confermate da Filippo non hanno `stato:\"bozza\"`; quelle ancora in bozza richiedono una verifica per voce. Le decisioni sui dubbi di copertura sono documentate in `validazione_fonti_diagnosi_2026-11.md`.", "");
DIAGNOSI.forEach((d, n) => {
  const r = esitoDiagnosi(d);
  const spunta = d.stato === "bozza" ? " " : "x";
  L.push(`## ${n + 1}. ${d.label}  \`${d.id}\``, "",
    `- Stato: **${d.stato === "bozza" ? "bozza da verificare" : "confermata da Filippo"}** · Esito attuale: **${ESITO[r.esito]}** · Fonte: ${d.fonte}`,
    `- Sinonimi: ${d.sinonimi.join(" · ")}` + (d.escludi ? `  \n- Esclusi se il testo contiene: ${d.escludi.join(" · ")}` : ""));
  if (d.scenario) L.push(`- Collegata allo scenario: \`${d.scenario}\``);
  if (d.avviso) L.push(`- Avviso: ${d.avviso}`);
  L.push("", "| Alterazione | Classe | Ruolo | Pannello | Nota | Alternativa |", "|---|---|---|---|---|---|");
  d.alterazioni.forEach((a, i) => L.push(`| ${a.alt} | ${a.classe} | ${a.ruolo} | ${COP[r.copertura[i]]} | ${(a.nota || "").replace(/\|/g, "/")} | ${a.alternativa || ""} |`));
  L.push("", `- [${spunta}] alterazioni e partner corretti`, `- [${spunta}] sinonimi/esclusioni corretti`, `- [${spunta}] note e alternative corrette`, `- [${spunta}] fonte corretta`);
  L.push("");
});
process.stdout.write(L.join("\n"));
