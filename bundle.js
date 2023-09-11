const esbuild = require("esbuild");
const { program } = require("commander");

async function main(watch, prd) {
  console.log({ watch, prd });

  const options = {
    entryPoints: ["./src/client/main.tsx"],
    bundle: true,
    outfile: "./dist/bundle.js",
    minify: prd,
    sourcemap: true,
    target: ["es2015"],
    platform: "browser",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    external: ["xlsx"],
  };

  if (watch) {
    const ctx = await esbuild.context(options);
    await ctx.watch();
    console.log("Watching for changes...");
  } else {
    await esbuild.build(options);
    console.log("DONE");
  }
}

if (require.main === module) {
  program
    .option("-w, --watch", "Watch mode", false)
    .option("-p, --prd", "Production mode", false);
  program.parse(process.argv);
  const { watch, prd } = program.opts();
  main(watch, prd).then(() => {
    process.exit(0);
  });
}
