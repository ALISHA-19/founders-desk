/* Inlines every photo in /img into founders-desk.html as a data: URI.
   The published Artifact blocks external image files but allows data: URIs,
   so this is what makes the photographs visible there.

   Re-runnable: each <img> keeps a data-src="img/<name>" marker, so to swap a
   photograph you replace the file in /img and run this again.

     node inline-images.mjs
*/
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';

const FILE = 'founders-desk.html';
let html = readFileSync(FILE, 'utf8');

const MIME = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

function dataUri(rel) {
  if (!existsSync(rel)) return null;
  const ext = rel.split('.').pop().toLowerCase();
  const mime = MIME[ext];
  if (!mime) throw new Error(`Unsupported image type: ${rel}`);
  return `data:${mime};base64,${readFileSync(rel).toString('base64')}`;
}

let inlined = 0, missing = [], bytes = 0;

// First pass: a fresh <img src="img/x.jpg"> gains its data-src marker.
html = html.replace(/<img src="(img\/[^"]+)"/g, (m, rel) => `<img data-src="${rel}" src="${rel}"`);

// Second pass: every marked <img> gets its src rewritten from the file on disk.
html = html.replace(/<img data-src="(img\/[^"]+)" src="[^"]*"/g, (m, rel) => {
  const uri = dataUri(rel);
  // A deleted photo must reset to the file path, not keep the base64 it was
  // last inlined with — otherwise removing a file silently changes nothing.
  // The path then 404s and the illustration fallback takes over.
  if (!uri) { missing.push(rel); return `<img data-src="${rel}" src="${rel}"`; }
  inlined++;
  bytes += statSync(rel).size;
  return `<img data-src="${rel}" src="${uri}"`;
});

writeFileSync(FILE, html);

console.log(`inlined ${inlined} image(s), ${(bytes / 1024).toFixed(0)} KB source → ${(html.length / 1024).toFixed(0)} KB page`);
if (missing.length) console.log(`missing (left as-is, illustration will show): ${missing.join(', ')}`);
