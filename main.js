// main.js
// @ts-check

import { Command } from "jsr:@cliffy/command@1.0.0-rc.7";
import { buildProject }  from "./build.js";
import { devServer }     from "./dev.js";
import { deployProject } from "./deploy.js";

await new Command()
  .name("noisycli")
  .version("0.0.1")
  .description("Noisycloud MVP CLI")
  .command("dev", "Run the local dev server")
  .action(devServer)
  .command("build", "Bundle the project")
  .action(buildProject)
  .command("deploy", "Build then deploy the project")
  .action(async () => {
    await buildProject();
    await deployProject();
  })
  .parse(Deno.args);