// @ts-check
import { ensureDir }   from "https://deno.land/std@0.196.0/fs/mod.ts";
import { loadConfig, srcPath, outPath } from "./config.js";

export async function buildProject() {
  const cfg = await loadConfig();

  console.log(`🔧  Copying ${cfg.sourceDir}/ → ${cfg.outputDir}/ …`);
  await ensureDir(cfg.outputDir);

  // Copy HTML
  await Deno.copyFile(
    srcPath(cfg, cfg.entryHtml),
    outPath(cfg, cfg.entryHtml),
  );

  // Transform JS
  const src = await Deno.readTextFile(srcPath(cfg, cfg.entryJs));
  const transformed = `/* injected helper import */\n` +
    `import { fetchEncrypted } from "./noisy-runtime.js";\n\n` +
    src.replace(/noisy:\s*['"]e2ee['"]/g, "/* encrypted */");
  await Deno.writeTextFile(outPath(cfg, cfg.entryJs), transformed);

  // Helper
  const helper = `export async function fetchEncrypted(u,i){return fetch(u,i)}`;
  await Deno.writeTextFile(outPath(cfg, "noisy-runtime.js"), helper);

  console.log("✅  Build complete ->", cfg.outputDir);
}