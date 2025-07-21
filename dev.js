// dev.js
import { serveDir }  from "https://deno.land/std@0.196.0/http/file_server.ts";
import { loadConfig } from "./config.js";

export async function devServer() {
  const cfg = await loadConfig();
  console.log(`🖥️  Preview http://localhost:8000 (${cfg.outputDir}/)`);
  await Deno.serve({ port: 8000 }, (req) => serveDir(req, { fsRoot: cfg.outputDir }));
}