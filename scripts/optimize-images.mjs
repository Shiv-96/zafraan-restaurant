import { mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'images-src'
const OUT = 'public/images'

// naam: [width, height]  (gallery.js ke w/h se match)
const SIZES = {
  hero: [1600, 1000],
  about: [900, 1100],
  'gallery-1': [800, 1000],
  'gallery-2': [800, 800],
  'gallery-3': [800, 600],
  'gallery-4': [800, 600],
  'gallery-5': [800, 600],
  'gallery-6': [800, 1000],
  'gallery-7': [800, 800],
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`

async function main() {
  let files
  try {
    files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
  } catch {
    console.error(`❌ "${SRC}" folder nahi mila. Project root mein banao aur photos daalo.`)
    process.exit(1)
  }

  if (!files.length) {
    console.log(`ℹ️  "${SRC}" khali hai. Photos (hero.jpg, about.jpg, gallery-1.jpg ...) daalo.`)
    return
  }

  await mkdir(OUT, { recursive: true })

  for (const file of files) {
    const name = path.parse(file).name.toLowerCase()
    const size = SIZES[name]
    if (!size) {
      console.warn(`⚠️  Skip: ${file} (naam SIZES list mein nahi hai)`)
      continue
    }

    const input = path.join(SRC, file)
    const output = path.join(OUT, `${name}.webp`)
    const [width, height] = size

    await sharp(input)
      .rotate()
      .resize(width, height, { fit: 'cover', position: 'attention' })
      .webp({ quality: 72, effort: 5 })
      .toFile(output)

    const before = (await stat(input)).size
    const after = (await stat(output)).size
    console.log(`✅ ${file} → ${output}  (${kb(before)} → ${kb(after)})`)

    if (name === 'hero') {
      await sharp(input)
        .rotate()
        .resize(1200, 630, { fit: 'cover', position: 'attention' })
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile('public/og-image.jpg')
      console.log('✅ OG image → public/og-image.jpg')
    }
  }
}

main()