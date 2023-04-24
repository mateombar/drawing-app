const utils = {};

utils.formatPercent = (n) => {
  return (n * 100).toFixed(2) + "%";
};

utils.printProgress = (count, max) => {
  // process.stdout to get the standard output
  process.stdout.clearLine();
  // Delete the line in the console
  process.stdout.cursorTo(0);
  // Calculate the percent
  const percent = utils.formatPercent(count / max);
  // Write to the standard output
  process.stdout.write(count + "/" + max + " (" + percent + ")");
};

if (typeof module !== "undefined") {
  module.exports = utils;
}
