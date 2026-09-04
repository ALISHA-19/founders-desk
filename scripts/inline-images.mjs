/* Inlines every photo in /img into src/founders-desk.html as a data: URI.
   The published Artifact blocks external image files but allows data: URIs,
   so this is what makes photographs visible there. The deployed site does the
   opposite — see scripts/build-standalone.mjs.

   Re-runnable: each <img> keeps a data-src="img/<name>" marker, so to swap a
   photograph you replace the file in /img and run this again. Delete a file
   and the marker resets to the path, which 404s and lets the illustration
   fallback take over.

     node scripts/inline-images.mjs
*/
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const FILE = join(ROOT, 'src', 'founders-desk.html');
let html = readFileSync(FILE, 'utf8');

const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };

function dataUri(rel) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) return null;
  const mime = MIME[extname(abs).toLowerCase()];
  if (!mime) throw new Error(`Unsupported image type: ${rel}`);
  return `data:${mime};base64,${readFileSync(abs).toString('base64')}`;
}

let inlined = 0, bytes = 0;
const missing = [];

// First pass: a fresh <img src="img/x.jpg"> gains its data-src marker.
html = html.replace(/<img src="(img\/[^"]+)"/g, (m, rel) => `<img data-src="${rel}" src="${rel}"`);

// Second pass: every marked <img> gets its src rewritten from the file on disk.
html = html.replace(/<img data-src="(img\/[^"]+)" src="[^"]*"/g, (m, rel) => {
  const uri = dataUri(rel);
  // A deleted photo must reset to the file path, not keep the base64 it was
  // last inlined with — otherwise removing a file silently changes nothing.
  if (!uri) { missing.push(rel); return `<img data-src="${rel}" src="${rel}"`; }
  inlined++;
  bytes += statSync(join(ROOT, rel)).size;
  return `<img data-src="${rel}" src="${uri}"`;
});

writeFileSync(FILE, html);

console.log(`inlined ${inlined} image(s), ${(bytes / 1024).toFixed(0)} KB source → ${(html.length / 1024).toFixed(0)} KB page`);
if (missing.length) console.log(`no file (illustration will show): ${[...new Set(missing)].join(', ')}`);
