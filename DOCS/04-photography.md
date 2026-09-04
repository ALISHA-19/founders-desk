# Photography

Drop a file into `/img` with the exact filename below and it replaces the illustration
automatically. No code change, no rebuild of the markup. A file that isn't here
is silently ignored and the illustration stays.

If a photo looks wrong after adding it, it is almost always the aspect ratio —
everything is `object-fit: cover`, so the centre of the frame survives and the
edges get cropped.

## Filenames

| File | Where it appears | Aspect | Min size | Notes |
|---|---|---|---|---|
| `mentor-rakesh.jpg` | Mentor card + webinar host | 1:1 | 400×400 | Head and shoulders, eyes ~⅓ from top |
| `mentor-farhan.jpg` | Mentor card | 1:1 | 400×400 | Same framing |
| `mentor-lakshmi.jpg` | Mentor card | 1:1 | 400×400 | Same framing |
| `founder-aditya.jpg` | Story carousel | 1:1 | 400×400 | Same framing |
| `founder-nidhi.jpg` | Story carousel | 1:1 | 400×400 | Same framing |
| `founder-rohit.jpg` | Story carousel | 1:1 | 400×400 | Same framing |
| `on-ground-visit.jpg` | On-ground band | 4:3 landscape | 1200×900 | A mentor and founder at the founder's actual workplace |

The host slot reuses `mentor-rakesh.jpg` — one file covers both places.

## Before you add anyone

1. **Written consent**, specifically for use on a public marketing page. Verbal
   agreement on a call is not enough if the relationship later sours.
2. **The name and details on the page must match the person in the photo.** The
   copy currently carries placeholder names; change those in the same commit as
   the photograph, or you have created exactly the fabricated proof this page
   was built to avoid.
3. **No stock photography of people.** A licensed model presented as a named
   founder from Kolhapur is a fabricated customer. If you have no real photos
   yet, leave the illustrations — they read as deliberate, a stock face reads as
   a lie once someone reverse-image-searches it.
4. Non-human imagery (workshops, shopfronts, a session in progress) has none of
   these problems and can be stock or your own.

## Specs

- **Format** JPEG for photographs, ~80% quality. WebP works if you also keep a
  `.jpg` fallback, since the filenames above are what the page requests.
- **Weight** under 150 KB each. These load on low-end Android over patchy
  connections — that is the actual audience.
- **Colour** the page runs indigo / teal / amber on white. Warm, naturally lit
  photographs sit better than cool or heavily filtered ones.
- **Crop** square portraits, centred on the face.

## How the two builds differ

The deployed site loads these as real files from `/img`. The sandbox build cannot —
its CSP blocks image files — so `scripts/inline-images.mjs` embeds them there as
base64 `data:` URIs instead. Run it after changing any image if you care about the
sandbox copy; the deployed site only needs `build-standalone.mjs`.

---

## What is in here now

These are **Unsplash** photographs, added on request. The Unsplash Licence permits
commercial use with no attribution required.

| File | Unsplash photo |
|---|---|
| mentor-rakesh.jpg | photo-1774437676976-655ad890b6ff |
| mentor-farhan.jpg | photo-1653666866518-d01fabfa94c2 |
| mentor-lakshmi.jpg | photo-1679138118375-47f78db3761d |
| founder-aditya.jpg | photo-1757744705465-ea08b0ddc38a |
| founder-nidhi.jpg | photo-1784802007219-9af3510cf7a3 |
| founder-rohit.jpg | photo-1774437678715-fb40846dc252 |
| on-ground-visit.jpg | photo-1698768195616-2d49cb36477f |

### Read this before launching

The Unsplash Licence covers the **photograph**. It does not grant rights over the
**person in it**, and Unsplash does not supply model releases. Right now each of
these faces sits under an invented name, city and testimonial quote. For a design
prototype that is fine and the page says so in three places. For a live marketing
site it is a false-endorsement and personality-rights exposure, and it is also the
fabricated-proof problem the rest of this page avoids.

**Before going live, replace every portrait with a real, consented person** — or
remove the stories and mentor cards entirely. The workshop scene
(on-ground-visit.jpg) has no identifiable subject issue of the same kind and can stay.
