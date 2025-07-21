// config.js
// @ts-check
import { join } from "https://deno.land/std@0.196.0/path/mod.ts";

/**
 * @typedef {Object} Config
 * @property {string} sourceDir
 * @property {string} outputDir
 * @property {string} entryHtml
 * @property {string} entryJs
 */

/** @returns {Promise<Config>} */
export async function loadConfig() {
  const text = await Deno.readTextFile("noisy.config.json");
  const cfg  = /** @type {Partial<Config>} */ (JSON.parse(text));
  return {
    sourceDir: cfg.sourceDir ?? "src",
    outputDir: cfg.outputDir ?? "dist",
    entryHtml: cfg.entryHtml ?? "index.html",
    entryJs:   cfg.entryJs   ?? "app.js",
  };
}

/**
 * @param {Config} cfg
 * @param {...string} parts
 */
export function srcPath(cfg, ...parts) {
  return join(cfg.sourceDir, ...parts);
}

/**
 * @param {Config} cfg
 * @param {...string} parts
 */
export function outPath(cfg, ...parts) {
  return join(cfg.outputDir, ...parts);
}
