/* Estrae costanti e funzioni da index.html per testarle in node.
   Legge il sorgente a runtime: non va aggiornato quando index.html cambia,
   purché i nomi restino gli stessi.

   Il conteggio delle parentesi ignora stringhe, template literal, commenti e
   letterali regex — altrimenti un `}` dentro una regex (o un `[` dentro una
   stringa) sbilancia il conteggio e l'estrazione produce codice troncato. */
const fs = require("fs");
const path = require("path");

const SRC_PATH = path.join(__dirname, "..", "index.html");
const SRC = fs.readFileSync(SRC_PATH, "utf8");

/* Un `/` inizia una regex solo se l'ultimo carattere significativo è uno di questi. */
const REGEX_OK = new Set(["", "(", ",", "=", ":", "[", "!", "&", "|", "?", "{", "}", ";", "+", "-", "*", "%", "<", ">", "~", "^", "\n"]);

/* Ritorna il testo da `start` fino alla chiusura bilanciata di open/close. */
function balanced(src, start, open, close) {
  let i = start, state = "code", depth = 0, started = false, prev = "";
  const tmpl = [];
  let reClass = false;

  while (i < src.length) {
    const c = src[i], c2 = src.substr(i, 2);

    if (state === "code") {
      if (c2 === "//") { state = "line"; i += 2; continue; }
      if (c2 === "/*") { state = "block"; i += 2; continue; }
      if (c === "'") { state = "sq"; i++; continue; }
      if (c === '"') { state = "dq"; i++; continue; }
      if (c === "`") { state = "tmpl"; i++; continue; }
      if (c === "/" && REGEX_OK.has(prev)) { state = "re"; reClass = false; i++; continue; }

      if (c === "{") { if (tmpl.length) tmpl[tmpl.length - 1]++; }
      if (c === "}") {
        if (tmpl.length && --tmpl[tmpl.length - 1] === 0) { tmpl.pop(); state = "tmpl"; i++; continue; }
      }
      if (c === open) { depth++; started = true; }
      else if (c === close) { if (--depth === 0 && started) return src.slice(start, i + 1); }

      if (!/\s/.test(c)) prev = c;
      i++; continue;
    }

    if (state === "line") { if (c === "\n") state = "code"; i++; continue; }
    if (state === "block") { if (c2 === "*/") { state = "code"; i += 2; continue; } i++; continue; }
    if (state === "sq" || state === "dq") {
      if (c === "\\") { i += 2; continue; }
      if ((state === "sq" && c === "'") || (state === "dq" && c === '"')) { state = "code"; prev = c; }
      i++; continue;
    }
    if (state === "tmpl") {
      if (c === "\\") { i += 2; continue; }
      if (c2 === "${") { tmpl.push(1); state = "code"; i += 2; continue; }
      if (c === "`") { state = "code"; prev = c; }
      i++; continue;
    }
    if (state === "re") {
      if (c === "\\") { i += 2; continue; }
      if (c === "[") reClass = true;
      else if (c === "]") reClass = false;
      else if (c === "/" && !reClass) {
        state = "code"; prev = "/"; i++;
        while (i < src.length && /[a-z]/.test(src[i])) i++;
        continue;
      }
      i++; continue;
    }
  }
  return null;
}

function fn(name) {
  const at = SRC.indexOf(`function ${name}(`);
  if (at < 0) throw new Error(`funzione non trovata in index.html: ${name}`);
  const body = balanced(SRC, at, "{", "}");
  if (!body) throw new Error(`graffe non bilanciate per: ${name}`);
  return body;
}

function decl(name, open, close) {
  const at = SRC.search(new RegExp(`^const ${name}\\s*=`, "m"));
  if (at < 0) throw new Error(`costante non trovata in index.html: ${name}`);
  const body = balanced(SRC, at, open, close);
  if (!body) throw new Error(`parentesi non bilanciate per: ${name}`);
  return body + ";";
}

const src = [
  decl("PANEL", "{", "}"),
  decl("GENE_DESC", "{", "}"),
  decl("SC", "[", "]"),
  fn("buildGeneIndex"),
  fn("inPanel"),
  fn("_geni"),
  fn("makeRef"), fn("makeRefDiag"), fn("makeRefPred"),
  "module.exports={PANEL,GENE_DESC,SC,buildGeneIndex,inPanel,makeRef,makeRefDiag,makeRefPred};",
].join("\n");

module.exports = new Function("module", "exports", src + "\nreturn module.exports;")({ exports: {} }, {});
module.exports.SOURCE = SRC;
