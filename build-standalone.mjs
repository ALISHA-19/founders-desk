/* Wraps the artifact-shaped source (no doctype/head/body — the Artifact
   runtime supplies those) into a self-contained page that can be hosted
   anywhere. Run: node build-standalone.mjs  */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const SRC = 'founders-desk.html';
const OUT = 'index.html';
const SPLIT = '<a class="skip"';

let src = readFileSync(SRC, 'utf8');

// The artifact needs photos inlined as data: URIs (its CSP blocks image files).
// A self-hosted page must NOT — half a megabyte of base64 in the HTML defeats
// browser caching. Point those <img>s back at the real files in /img, and drop
// the tag entirely where no file exists so the deployed page makes no dead
// requests. The illustration fallback renders in its place either way.
let restored = 0, dropped = 0;
src = src.replace(/<img data-src="(img\/[^"]+)" src="[^"]*"([^>]*)>/g, (m, rel, rest) => {
  if (!existsSync(rel)) { dropped++; return ''; }
  restored++;
  return `<img src="${rel}"${rest}>`;
});

const at = src.indexOf(SPLIT);
if (at === -1) throw new Error(`Split marker ${SPLIT} not found in ${SRC}`);

const head = src.slice(0, at).trim();
const body = src.slice(at).trim();

writeFileSync(OUT, `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${head}
</head>
<body>
${body}
</body>
</html>
`, 'utf8');

console.log(`${OUT} written — ${head.length} bytes head, ${body.length} bytes body, ${restored} photo(s) linked, ${dropped} dead tag(s) dropped`);
