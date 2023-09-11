const { red, green } = require("colorette");
const { findFileRecursive } = require("./util");

const formatFileSize = (size) => {
  if (size < 1024) {
    return size + "bytes";
  } else if (size > 1024 && size < 1048576) {
    return (size / 1024).toFixed(1) + "KB";
  } else if (size > 1048576) {
    return (size / 1048576).toFixed(1) + "MB";
  }
};

const showStats = () => {
  console.log("\nResult\n--------------------------------------------------");
  for (const file of findFileRecursive("dist", ".js", ".css", ".map")) {
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
