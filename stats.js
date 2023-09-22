const { red, green } = require("colorette");
const fs = require("node:fs");
const path = require("node:path");

const findFileRecursive = function* (root, ...exts) {
  const isExtMatch = extMatcher(...exts);
  const stack = [root];
  while (stack.length > 0) {
    const dir = stack.pop();
    for (const f of fs.readdirSync(dir)) {
      const file = path.join(dir, f);
      const stats = fs.statSync(file);
      if (stats.isDirectory()) {
        stack.push(file);
      } else if (stats.isFile()) {
        if (isExtMatch(file)) {
          yield { name: f, path: file, stats };
        }
      }
    }
  }
};

const extMatcher = (...exts) => {
  return (f) => {
    for (const e of exts) {
      if (f.endsWith(e)) {
        return true;
      }
    }
    return false;
  };
};

const formatFileSize = (size) => {
  if (size < 1024) {
    return size + "bytes";
  } else if (size > 1024 && size < 1048576) {
    return (size / 1024).toFixed(1) + "KB";
  } else if (size > 1048576) {
    return (size / 1048576).toFixed(1) + "MB";
  }
};

const showStats = (outdir) => {
  console.log("\nResult\n--------------------------------------------------");
  for (const file of findFileRecursive(outdir, ".js", ".css", ".map")) {
    const name = file.name.padEnd(20);
    const size = formatFileSize(file.stats.size);
    const color = size.endsWith("MB") ? red : green;
    console.log(color(`${name} -> ${size}`));
  }
  console.log("--------------------------------------------------\n");
};

module.exports = { showStats };

if (require.main === module) {
  showStats();
}
