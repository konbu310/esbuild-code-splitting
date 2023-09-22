const esbuild = require("esbuild");
const { program } = require("commander");
const fs = require("node:fs/promises");
const { showStats } = require("./stats");

async function main(watch, prd, metafile) {
  const nodeEnv = prd ? "production" : "development";
  const options = {
    entryPoints: ["./src/main.tsx"],
    bundle: true,
    outdir: "./dist",
    minify: true,
    treeShaking: true,
    sourcemap: false,
    target: "es2018",
    platform: "browser",
    format: "esm",
    splitting: true,
    define: {
      "process.env.NODE_ENV": `"${nodeEnv}"`,
    },
  };

  if (watch) {
    const ctx = await esbuild.context(options);
    await ctx.watch();
    console.log("Watching for changes...");
  } else {
    await fs.rm("dist", { recursive: true }).catch((error) => {
      console.warn("dist directory not found.");
    });
    const result = await esbuild.build({ ...options, metafile });
    if (metafile) {
      await fs.writeFile("meta.json", JSON.stringify(result.metafile));
    }
    showStats();
  }
}

program
  .option("-w, --watch", "Watch mode", false)
  .option("-p, --prd", "Production mode", false)
  .option("-m, --metafile", "Metafile mode", false);
program.parse(process.argv);
const { watch, prd, metafile } = program.opts();
main(watch, prd, metafile).catch(console.error);
