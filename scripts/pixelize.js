const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '..', 'public', 'activity');

async function pixelateFile(file) {
  const input = path.join(dir, file);
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext);
  const out = path.join(dir, `px-${name}.png`);
  try {
    const img = sharp(input);
    const meta = await img.metadata();
    const smallWidth = 16; // downscale width
    const outWidth = Math.max(48, meta.width ? Math.min(meta.width, 48) : 48);

    // downscale then upscale using nearest-neighbor for pixel effect
    await img
      .resize(smallWidth, null, { fit: 'inside' })
      .resize(outWidth, null, { kernel: sharp.kernel.nearest })
      .png()
      .toFile(out);
    console.log('Wrote', out);
  } catch (err) {
    console.error('Failed', file, err);
  }
}

async function run() {
  const files = fs.readdirSync(dir).filter(f => /\.(png|jpe?g)$/i.test(f));
  for (const f of files) {
    await pixelateFile(f);
  }
}

run().catch(err => { console.error(err); process.exit(1); });
