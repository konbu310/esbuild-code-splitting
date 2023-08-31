const esbuild = require("esbuild");

async function main() {
  const ctx = await esbuild.context({
    entryPoints: ["./src/client/main.tsx"],
    bundle: true,
    outfile: "./dist/bundle.js",
    minify: true,
    sourcemap: true,
    target: ["es2015"],
    platform: "browser",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  });

  await ctx.watch();
  console.log("Watching for changes...");
}

main().catch(console.error);
