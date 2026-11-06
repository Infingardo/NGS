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

const rigaBrafDoc = docRiga("**BRAF V600E**: test obbligatorio");
check("documento clinico (BRAF V600E CRC): backbone encorafenib+cetuximab, binimetinib solo come schema del melanoma",
  /encorafenib\+cetuximab dopo terapia sistemica precedente/.test(rigaBrafDoc) && /FOLFOX/.test(rigaBrafDoc)
  && !/sensibilità a encorafenib\+binimetinib/.test(rigaBrafDoc) && /schema del melanoma, non del CRC/.test(rigaBrafDoc), rigaBrafDoc.slice(0, 200));

// GBM IDH-wild type (WHO CNS5): basta UNO tra TERT, EGFR amp, +7/-10 (non servono due o tre).
const tertGbm = entryDi("glioma", "TERT");
check("TERT GBM: l'azione dice che ne basta uno (non «TERT + EGFR + +7/-10» come somma)",
  /basta uno tra TERT mut, EGFR amp, \+7\/-10/.test(tertGbm.action) && !/TERT \+ EGFR amp/.test(tertGbm.action), tertGbm.action);
check("TERT GBM: il referto diagnostico non subordina TERT a «combinazione» con EGFR o +7/-10",
  /ne basta uno solo tra mutazione del promotore TERT, amplificazione EGFR e \+7\/-10/.test(tertGbm.referto_diag) && !/in combinazione/i.test(tertGbm.referto_diag), tertGbm.referto_diag);

for (const [inizio, nome] of [["**TERT nei gliomi IDH-wild type**", "riga TERT gliomi"], ["**TERT promoter — ruolo diagnostico in GBM**", "riga TERT ruolo diagnostico"], ["**Pattern cromosomico +7/-10**", "riga +7/-10"]]) {
  const r = docRiga(inizio);
  check(`documento clinico (GBM, ${nome}): ne basta uno dei tre criteri; nessun «due dei tre» né «insieme ad»`,
    /ne basta uno/.test(r) && !/due dei tre|insieme ad|Gr3 di default/.test(r), r.slice(0, 200));
}

// Tiroide (WHO Endocrine 2022, carcinoma follicolare): TERT+BRAF "doppio hit" solo nel PTC; nel FTC TERT con RAS.
const tertTir = entryDi("tiroide", "TERT");
check("TERT tiroide: il «doppio hit» con BRAF V600E è limitato al carcinoma papillare; nel follicolare TERT con RAS",
  /Nel PTC, con BRAF V600E = doppio hit/.test(tertTir.note) && /PTC: TERT \+ BRAF V600E/.test(tertTir.action) && /FTC: TERT spesso con RAS/.test(tertTir.action)
  && /Nel carcinoma papillare la co-presenza con BRAF V600E/.test(tertTir.referto) && /carcinoma follicolare TERT è spesso associato a mutazioni RAS/.test(tertTir.referto), tertTir.action);
const rigaTertDoc = docRiga("**TERT promoter nel DTC");
check("documento clinico (TERT nel DTC): doppio hit limitato al papillare; nel follicolare RAS, stadio, metastasi, mortalità",
  /Nel carcinoma papillare la co-presenza/.test(rigaTertDoc) && /carcinoma follicolare TERT è spesso associato a mutazioni RAS/.test(rigaTertDoc) && !/La co-presenza di TERT promoter mutato \+ BRAF/.test(rigaTertDoc), rigaTertDoc.slice(0,160));
const rasTir = entryDi("tiroide", "NRAS");
check("RAS tiroide: tra le entità con RAS compare la variante follicolare incapsulata del carcinoma papillare (testo WHO FTC) in trappola e referto",
  /variante follicolare incapsulata del carcinoma papillare/.test(rasTir.trappola) && /variante follicolare incapsulata del carcinoma papillare/.test(rasTir.referto)
  && /NIFTP/.test(rasTir.trappola) && /invasione capsulare e vascolare/.test(rasTir.referto), rasTir.trappola);

// BRAF tiroide: FDA per ATC; EMA solo per DTC refrattario a radioiodio (EPAR Tafinlar/Mekinist); nessun valore prognostico dimostrato del solo BRAF nel PTC (WHO 2022).
const brafTir = entryDi("tiroide", "BRAF");
check("BRAF tiroide: il badge EMA è limitato al DTC refrattario a radioiodio (non all'ATC)",
  /EMA \(DTC refrattario a radioiodio\)/.test(brafTir.evidence) && /FDA \(ATC\)/.test(brafTir.evidence) && evClass(tag(brafTir, /^EMA/) || "") === "ev-EMA", brafTir.evidence);
check("BRAF tiroide: la nota dichiara nessuna indicazione EMA nell'ATC e l'indicazione EU nel DTC; l'azione distingue FDA (ATC) ed EMA (DTC)",
  /EMA: nessuna indicazione nell'ATC/.test(brafTir.note) && /refrattario o non idoneo a radioiodio/.test(brafTir.note) && /\(FDA\)/.test(brafTir.action) && /\(EMA\)/.test(brafTir.action), brafTir.action);
check("BRAF tiroide: nessun «valore prognostico sfavorevole»/«comportamento aggressivo» attribuito al solo BRAF nel PTC",
  !/valore prognostico sfavorevole|valore diagnostico di comportamento aggressivo/.test(tutto(brafTir)) && /analisi multivariata/.test(brafTir.referto_pred) && /analisi multivariata/.test(brafTir.referto_diag), tutto(brafTir).slice(0, 120));
const rigaAtcDoc = docRiga("**BRAF V600E nel carcinoma anaplastico");
check("documento clinico (ATC): nessuna «sopravvivenza mediana di settimane»; 10–50%, test obbligatorio, EU = DTC non ATC",
  !/mediana di settimane|~40-50%/.test(rigaAtcDoc) && /10–50%/.test(rigaAtcDoc) && /obbligatoria/.test(rigaAtcDoc) && /non l'ATC/.test(rigaAtcDoc) && /inferiore a 2 anni/.test(rigaAtcDoc), rigaAtcDoc.slice(0, 160));

// RET nel carcinoma midollare (WHO Endocrine 2022): test germinale raccomandato (non «obbligatorio»); ~metà degli sporadici; MEN2A codoni cisteinici.
const retTir = entryDi("tiroide", "RET");
check("RET MTC (scheda): test germinale «raccomandato» (WHO/ATA), non «obbligatorio»",
  /test germinale di RET raccomandato in tutti i pazienti con MTC \(WHO 2022, ATA 2015\)/.test(retTir.note) && !/obbligatori/i.test(retTir.note), retTir.note);
const rigaMtcDoc = docRiga("**RET nel carcinoma midollare");
check("documento clinico (RET MTC): raccomandato; circa la metà degli sporadici (M918T fino all'80%); MEN2A codoni cisteinici, non solo C634",
  /raccomandato in tutti i pazienti/.test(rigaMtcDoc) && !/obbligatori/i.test(rigaMtcDoc) && /circa la metà dei MTC sporadici/.test(rigaMtcDoc) && !/~40%/.test(rigaMtcDoc)
  && /M918T fino all'80%/.test(rigaMtcDoc) && /codoni cisteinici di RET, in particolare C634/.test(rigaMtcDoc) && !/MEN2A con RET C634/.test(rigaMtcDoc), rigaMtcDoc.slice(0, 200));

// Omissioni MTC (WHO Endocrine 2022): RAS nei RET-wildtype, prognosi per codone, riarrangiamenti isolati, grading a due livelli.
check("RET MTC (scheda): RAS ~70% nei RET-wildtype (24% degli sporadici), esclusivo con RET; prognosi M918T; riarrangiamenti solo isolati",
  /RAS in circa il 70%/.test(retTir.note) && /24% degli sporadici/.test(retTir.note) && /esclusive con RET/.test(retTir.note)
  && /RET M918T \(esoni 15\/16\) = esito peggiore/.test(retTir.note) && /solo segnalazioni isolate/.test(retTir.note), retTir.note.slice(0, 160));
check("RAS tiroide (scheda 471) e descrizione HRAS: il RAS nel carcinoma midollare non è il fenotipo RAS-like follicolare",
  /driver alternativo a RET/.test(rasTir.note) && /RET-wildtype è la mutazione RAS più frequente/.test(GENE_DESC.HRAS), GENE_DESC.HRAS);
check("documento clinico (MTC): RAS, prognosi per codone, riarrangiamenti isolati e grading a due livelli (mitosi ≥5/2 mm², Ki-67 ≥5%, necrosi)",
  /circa il 70% ha mutazioni RAS/.test(rigaMtcDoc) && /M918T \(esoni 15 e 16\) = esito peggiore/.test(rigaMtcDoc) && /solo segnalazioni isolate/.test(rigaMtcDoc)
  && /mitosi ≥5\/2 mm², Ki-67 ≥5% e necrosi/.test(rigaMtcDoc), rigaMtcDoc.slice(-200));

// IDH1 R132H: frequenza con denominatore esplicito (WHO CNS5, Astrocytoma IDH-mutant); non il «~70%» senza denominatore.
check("glioma IDH: R132H con denominatore esplicito (83–91% dei gliomi IDH-mutati; ~90% delle mutazioni IDH sovratentoriali), nessun «~70%»; caveat infratentoriale",
  /83–91% dei gliomi IDH-mutati/.test(idhGlioma.note) && /circa il 90% delle mutazioni IDH negli astrocitomi sovratentoriali/.test(idhGlioma.note)
  && /infratentoriali circa l'80% è non-R132H/.test(idhGlioma.note) && !/~70%/.test(idhGlioma.note), idhGlioma.note.slice(0, 160));

check("TERT GBM: nessuna frequenza «~80%» non supportata dalla fonte WHO; resta il criterio molecolare",
  !/~80%/.test(tertGbm.note) && /criterio molecolare WHO 2021/.test(tertGbm.note), tertGbm.note);

check("BRAF PTC: ~60% come stima generale dichiarata non-WHO, con frequenze per sottotipo (cellule alte ~80%, sclerosante diffuso ~20%) e pattern follicolare RAS-like",
  /circa il 60% dei PTC complessivamente \(stima da casistiche, variabile tra serie; non è un dato WHO\)/.test(brafTir.note) && /~80% nel sottotipo a cellule alte/.test(brafTir.note)
  && /~20% nello sclerosante diffuso/.test(brafTir.note) && /prevalentemente RAS-like/.test(brafTir.note) && !/98–99%/.test(brafTir.note) && /ATC: terapia urgente/.test(brafTir.note), brafTir.note.slice(0, 200));

check("RET PTC: nessuna percentuale complessiva «~10-20%» non supportata; frequenza variabile per area e radio-indotto, CCDC6/NCOA4 (WHO 2022)",
  !/~10-20%/.test(retTir.note) && /variabile per area geografica e più alta nel PTC radio-indotto/.test(retTir.note)
  && /CCDC6::RET 60–70% e NCOA4::RET 20–30% delle fusioni/.test(retTir.note) && /test germinale di RET raccomandato/.test(retTir.note), retTir.note.slice(0, 200));

// Limiti del pannello nei gliomi: H3 (K27-altered, G34-mutant) e ATRX non coperti (WHO CNS5).
const noteGlioma = SC.find(s => s.id === "glioma").notes;
check("glioma (nota di scenario): H3 K27-altered/G34-mutant non valutabili, accertamenti mirati prima di GBM IDH-wildtype",
  /H3 K27-altered e H3 G34-mutant non valutabili con il pannello/.test(noteGlioma) && /prima della classificazione come glioblastoma IDH-wildtype/.test(noteGlioma), noteGlioma.slice(0, 160));
check("glioma (nota di scenario): ATRX non valutabile; perdita nucleare supporta astrocitoma senza 1p/19q; ATRX conservato → 1p/19q; ATRX = linea, non grado",
  /ATRX non valutabile con il pannello/.test(noteGlioma) && /senza necessità routinaria di 1p\/19q/.test(noteGlioma) && /Se ATRX è conservato, è necessaria la valutazione della codelezione 1p\/19q/.test(noteGlioma)
  && /marcatore di linea, non di grado/.test(noteGlioma), noteGlioma.slice(-200));
check("documento clinico (1p/19q e TERT GBM): ATRX e H3 integrati; nessun «senza fenotipo chiaro»",
  /ATRX non valutabile con il pannello/.test(docRiga("**1p/19q codelezione**")) && !/senza fenotipo chiaro/.test(docRiga("**1p/19q codelezione**"))
  && /H3 K27-altered e H3 G34-mutant non valutabili con il pannello/.test(docRiga("**TERT nei gliomi IDH-wild type**")), docRiga("**1p/19q codelezione**").slice(0, 200));

// Algoritmo di test IDH (WHO CNS5/EANO): l'età ≥55 non basta da sola per evitare il sequenziamento.
const ihcIdh = idhGlioma.ihc.note;
check("glioma IDH (IHC): esenzione dal sequenziamento solo con ≥55 anni + GBM classico + sede non mediana + ATRX conservato + nessun glioma precedente",
  /eccetto nei pazienti ≥55 anni con GBM istologicamente classico, sede non mediana, ATRX conservato e nessun precedente glioma di grado inferiore/.test(ihcIdh)
  && /sequenziare IDH1 \(codone 132\) e IDH2 \(codone 172\)/.test(ihcIdh), ihcIdh.slice(0, 200));
check("glioma IDH (IHC): infratentoriali con denominatore corretto (astrocitomi infratentoriali IDH-mutati, ~80% non-R132H), non «tutti i gliomi infratentoriali»",
  /negli astrocitomi infratentoriali IDH-mutati circa l'80% delle varianti è non-R132H/.test(ihcIdh) && !/NGS necessario per varianti non-R132H e IDH2/.test(ihcIdh), ihcIdh.slice(-160));
check("TERT GBM (scheda e documento): EGFR e +7/−10 negativi non escludono il GBM; nessuna sensibilità 59%/36% nella scheda operativa",
  /la negatività per amplificazione di EGFR e per \+7\/−10 non esclude il glioblastoma/.test(tertGbm.note) && !/59%|36%/.test(tertGbm.note)
  && /non esclude il glioblastoma/.test(docRiga("**TERT nei gliomi IDH-wild type**")), tertGbm.note.slice(-200));
check("documento clinico (IDH, riga ruolo diagnostico): algoritmo di sequenziamento con le cinque condizioni di esenzione",
  /eccetto nei pazienti ≥55 anni con GBM istologicamente classico, sede non mediana, ATRX conservato e nessun precedente glioma di grado inferiore/.test(docRiga("**IDH1/IDH2 — ruolo diagnostico primario**")), docRiga("**IDH1/IDH2 — ruolo diagnostico primario**").slice(0, 200));

check("documento clinico (CDKN2A negli astrocitomi): «necrosi e/o proliferazione microvascolare», nessuna «necrosi di coagulazione»",
  /anche in assenza di necrosi e\/o proliferazione microvascolare/.test(docRiga("**CDKN2A delezione omozigote negli astrocitomi**")) && !/coagulazione/.test(docRiga("**CDKN2A delezione omozigote negli astrocitomi**")));
const r81 = docRiga("**TERT nei gliomi IDH-wild type**");
check("documento clinico (TERT negli IDH-mutati): dato WHO distinto dall'interpretazione; TERT/ATRX «generalmente» esclusivi; 1p/19q non sostituito",
  /rare negli astrocitomi IDH-mutati e frequenti negli oligodendrogliomi IDH-mutati, 1p\/19q-codeleti, e nei glioblastomi IDH-wildtype \(WHO CNS5\)/.test(r81)
  && /generalmente mutualmente esclusive con le alterazioni di ATRX/.test(r81) && /interpretazione, non dato WHO/.test(r81) && /non sostituisce la dimostrazione della codelezione 1p\/19q/.test(r81), r81.slice(-260));
check("scheda 480 non modificata sul punto TERT negli IDH-mutati (resta solo GBM IDH-wildtype)",
  !/oligodendrogliom/i.test(tertGbm.note) && !/oligodendrogliom/i.test(tertGbm.referto_diag));

// Anaplastico (WHO Endocrine 2022): profilo molecolare, prognosi (associazioni), MMR ≠ MSI-H; TERT nella scheda 475.
check("TERT tiroide (scheda 475): istotipo include ATC; nota con TERT nell'ATC (30–75%, progressione, TP53)",
  /PTC \/ FTC \/ ATC/.test(tertTir.histotype) && /nel carcinoma anaplastico tiroideo, la mutazione del promotore TERT è un evento associato alla progressione anaplastica \(30–75%\), frequentemente accompagnato da alterazioni di TP53/i.test(tertTir.note), tertTir.note.slice(-200));
const rigaAtc = docRiga("**BRAF V600E nel carcinoma anaplastico");
check("documento clinico (ATC): frequenze RAS/BRAF/TP53/TERT/PIK3CA/PTEN/EIF1AX e prognosi come associazioni, non fattori indipendenti",
  /RAS \(10–50%\) e BRAF \(10–50%\)/.test(rigaAtc) && /TP53 \(40–80%\) e mutazioni del promotore TERT \(30–75%\)/.test(rigaAtc) && /PIK3CA \(5–25%\), PTEN \(10–25%\) ed EIF1AX \(5–15%\)/.test(rigaAtc)
  && /non di fattori prognostici indipendenti validati/.test(rigaAtc) && /Rilevanza prognostica e predittiva vanno tenute distinte/.test(rigaAtc), rigaAtc.slice(-300));
check("documento clinico (ATC): MMR ≠ MSI-H; nessun PD-L1",
  /non implica necessariamente deficit funzionale del sistema né instabilità microsatellitare/.test(rigaAtc) && /MSI-H è un biomarcatore potenzialmente predittivo/.test(rigaAtc) && !/PD-?L1/i.test(rigaAtc));

// PTC (WHO Endocrine 2022): IHC VE1 come alternativa (cut-off qualificato), fusioni NTRK/ALK, varianti follicolari.
check("BRAF tiroide (scheda 473): riga IHC VE1 «alternativa», ≥90% come criterio da letteratura (non WHO universale), VE1 negativa ≠ wild-type",
  brafTir.ihc && brafTir.ihc.type === "alternative" && /VE1/.test(brafTir.ihc.test) && /≥90% delle cellule tumorali secondo i criteri proposti in letteratura/.test(brafTir.ihc.note)
  && /conferma molecolare/.test(brafTir.ihc.note) && /VE1 negativa non equivale a BRAF wild-type/.test(brafTir.ihc.note), JSON.stringify(brafTir.ihc || {}).slice(0, 160));
check("RAS tiroide (scheda 471): variante follicolare infiltrativa BRAF-like ≠ invasiva incapsulata RAS-like; nessuna IHC RAS/RET/ALK/pan-TRK",
  /PTC follicolare infiltrativo presenta prevalentemente un profilo BRAF-like/.test(rasTir.note) && /invasivo incapsulato, descritto in una voce separata nella WHO 2022, presenta prevalentemente un profilo RAS-like/.test(rasTir.note)
  && !rasTir.ihc, rasTir.note.slice(-260));
const rFus = docRiga("**Fusioni nel PTC (NTRK, ALK, RET)**");
check("documento clinico (fusioni PTC): NTRK 3–5%, ALK senza frequenza WHO, sclerosante diffuso e solido/trabecolare, indicazione RNA-based marcata non-WHO",
  /NTRK1\/3 \(3–5%\)/.test(rFus) && /il WHO 2022 non riporta una frequenza per ALK/.test(rFus) && /sclerosante diffuso/.test(rFus) && /NCOA4::RET, CCDC6::RET ed ETV6::NTRK3/.test(rFus)
  && /non dato WHO\): un pannello DNA/.test(rFus) && /RNA-based/.test(rFus), rFus.slice(0, 200));

// Tracciabilità: last_review 2026-11 solo sulle schede verificate; revisione generale 03/2026 invariata, aggiornamento parziale 11/2026.
const verificate = [["crc","BRAF"],["crc","ERBB2"],["nsclc","NRG1"],["mammella","AKT1"],["pancreas","NRG1"],["tiroide","NRAS"],["tiroide","PPARG"],["tiroide","BRAF"],["tiroide","RET"],["tiroide","TERT"],["glioma","IDH1"],["glioma","TERT"],["glioma","EGFR"],["glioma","CDKN2A"]];
const nonVerificate = [["pancreas","FGFR2"],["nsclc","RET"],["agnostico","RET"],["crc","KRAS"],["nsclc","EGFR"],["gist","KIT"]];
check("last_review 2026-11 sulle 14 schede verificate",
  verificate.every(([sc,g]) => entryDi(sc,g).last_review === "2026-11"), verificate.filter(([sc,g]) => entryDi(sc,g).last_review !== "2026-11").join(" | "));
check("last_review NON aggiornato sulle schede solo parzialmente o non verificate (FGFR2 iCCA, RET NSCLC, RET agnostico, KRAS/EGFR/KIT)",
  nonVerificate.every(([sc,g]) => entryDi(sc,g).last_review !== "2026-11"), nonVerificate.map(([sc,g]) => `${sc}/${g}=${entryDi(sc,g).last_review}`).join(" "));
check("DATA_REVIEWED resta 2026-03 (revisione generale); DATA_PARTIAL 2026-11; intestazione «rev. … · agg. parziale …»",
  /const DATA_REVIEWED="2026-03";/.test(SOURCE) && /const DATA_PARTIAL="2026-11";/.test(SOURCE) && /rev\. \$\{DATA_REVIEWED\} · agg\. parziale \$\{DATA_PARTIAL\}/.test(SOURCE));
const README = require("fs").readFileSync(require("path").join(__dirname, "..", "README.md"), "utf8");
check("README: changelog v2.0 senza dichiarare revisione completa; stato della revisione con revisione generale 03/2026 e aggiornamento parziale 11/2026",
  /### v2\.0 \(novembre 2026\)/.test(README) && /\*\*non\*\* una revisione completa del database/.test(README)
  && /Revisione generale: 03\/2026/.test(README) && /Aggiornamento parziale: 11\/2026/.test(README) && /versione del software\*\* \(v2\.0\) è distinta dallo stato della revisione scientifica/.test(README));

// Novità terapeutiche (FDA/EMA, 06/11/2026): stati regolatori separati; «non verificato» mai «non approvato»; last_review invariato.
const esr1 = entryDi("mammella", "ESR1"), her2L = SC.find(s => s.id === "nsclc").entries.find(e => e.genes.includes("ERBB2")), ros1 = entryDi("nsclc", "ROS1"), brafL = entryDi("nsclc", "BRAF");
check("ESR1: imlunestrant FDA 25/09/2025 ed EMA 09/01/2026; associazione con abemaciclib solo FDA 18/09/2026, EMA non verificato; AIFA non verificato",
  /imlunestrant/.test(esr1.drug) && /FDA 25\/09\/2025, EMA \(autorizzazione 09\/01\/2026\)/.test(esr1.note) && /imlunestrant \+ abemaciclib: FDA 18\/09\/2026; stato EMA non verificato/.test(esr1.note)
  && /AIFA\/rimborsabilità non verificato/.test(esr1.note) && /elacestrant e a imlunestrant/.test(esr1.referto) && !/non approvat/i.test(tutto(esr1)), esr1.note.slice(-260));
check("HER2 polmone: zongertinib (08/08/2025, estesa 26/02/2026) e sevabertinib (19/11/2025, estesa 09/09/2026) come FDA accelerata; EMA non verificato; badge FDA accel.",
  /zongertinib/.test(her2L.drug) && /sevabertinib/.test(her2L.drug) && /08\/08\/2025/.test(her2L.note) && /26\/02\/2026/.test(her2L.note) && /19\/11\/2025/.test(her2L.note) && /09\/09\/2026/.test(her2L.note) && !/senza il requisito/.test(her2L.note) && /non solo le inserzioni dell'esone 20/.test(her2L.note) && /non limitate alle inserzioni dell'esone 20/.test(her2L.referto)
  && /Stato EMA di zongertinib e sevabertinib non verificato/.test(her2L.note) && evClass(tag(her2L, /accel/) || "") === "ev-FDAaccel" && /T-DXd approvato FDA\/EMA/.test(her2L.note), her2L.evidence);
check("ROS1 polmone: repotrectinib FDA 15/11/2023 ed EMA condizionata 13/01/2025; taletrectinib FDA 11/06/2025, EMA non verificato; indicazione NTRK EU distinta",
  /repotrectinib \/ taletrectinib/.test(ros1.drug) && /FDA 15\/11\/2023/.test(ros1.note) && /popolazione di efficacia inclusi pazienti già trattati/.test(ros1.note) && /condizionata dal 13\/01\/2025/.test(ros1.note) && /FDA 11\/06\/2025/.test(ros1.note)
  && /stato EMA non verificato/.test(ros1.note) && /fusione NTRK \(non pertinente a ROS1\)/.test(ros1.note) && /taletrectinib; per taletrectinib stato EMA non verificato/.test(ros1.referto), ros1.note.slice(-220));
check("BRAF polmone: encorafenib+binimetinib autorizzato EMA (EPAR Braftovi/Mektovi), FDA non verificato; dabrafenib+trametinib invariato",
  /encorafenib \+ binimetinib \(EMA\)/.test(brafL.drug) && /stato FDA non verificato/.test(brafL.note) && /dabrafenib\+trametinib oppure encorafenib\+binimetinib \(EMA\)/.test(brafL.action) && !/nessuna restrizione di linea/.test(brafL.note) && /Dabrafenib \+ trametinib/.test(brafL.drug));
check("le quattro schede aggiornate NON ricevono last_review 2026-11 (verifica integrale della scheda non ancora fatta)",
  [esr1, her2L, ros1, brafL].every(e => e.last_review === "2026-03") && ![esr1, her2L, ros1, brafL].some(e => /non approvat/i.test(tutto(e))), [esr1, her2L, ros1, brafL].map(e => e.last_review).join(" "));

check("descrizioni dei geni (ROS1, ESR1, ERBB2, BRAF) e documento clinico allineati alle novità terapeutiche",
  /repotrectinib, taletrectinib/.test(GENE_DESC.ROS1) && /imlunestrant/.test(GENE_DESC.ESR1) && /zongertinib\/sevabertinib/.test(GENE_DESC.ERBB2) && /encorafenib\+binimetinib \(EMA\)/.test(GENE_DESC.BRAF)
  && /repotrectinib o taletrectinib/.test(docRiga("**ROS1**")) && /elacestrant e a imlunestrant/.test(docRiga("**ESR1**")), GENE_DESC.ROS1);

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
