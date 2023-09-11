const fs = require("node:fs");
const path = require("node:path");
const { exec } = require("node:child_process");
const { promisify } = require("util");
const execPromise = promisify(exec);

const rootDir = path.resolve(__dirname, "../");
const rootPath = function (p) {
  return path.join(rootDir, p);
};
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

function serialTaskQueue(callback) {
  let executing = false;
  let queued = false;
  function enqueue() {
    if (executing) {
      queued = true;
      return;
    }
    executing = true;
    callback().finally(() => {
      executing = false;
      queued = false;
      if (queued) {
        enqueue();
      }
    });
  }
  return enqueue;
}

async function formatFile(glob) {
  await execPromise(`npx prettier --write '${glob}'`);
}

module.exports = {
  rootDir,
  rootPath,
  findFileRecursive,
  extMatcher,
  serialTaskQueue,
  formatFile,
};
