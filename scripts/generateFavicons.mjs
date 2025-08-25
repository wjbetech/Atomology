import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const svgFiles = ["favicon.svg", "favicon-light.svg", "favicon-dark.svg"];
const sizes = [16, 32, 192, 512];

async function ensurePublic() {
  try {
    await fs.access(publicDir);
  } catch (e) {
    await fs.mkdir(publicDir, { recursive: true });
  }
}

async function generate() {
  await ensurePublic();
  for (const svg of svgFiles) {
    const svgPath = path.join(publicDir, svg);
    let svgBuffer;
    try {
      svgBuffer = await fs.readFile(svgPath);
    } catch (e) {
      console.warn(`Skipped ${svg} (missing)`);
      continue;
    }
    for (const s of sizes) {
      const outName = svg.replace(/\.svg$/, `-${s}.png`);
      const outPath = path.join(publicDir, outName);
      await sharp(svgBuffer)
        .resize(s, s, { fit: "contain" })
        .png()
        .toFile(outPath);
      console.log(`Wrote ${outName}`);
    }
  }
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
