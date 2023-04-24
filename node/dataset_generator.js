const draw = require("../common/draw.js");
const constants = require("../common/constants.js");
const utils = require("../common/utils.js");

// Create canvas
const { createCanvas } = require("canvas");
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext("2d");

const fs = require("fs");

// Read the filenames from the raw data directory
const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;
fileNames.forEach((fn) => {
  // Extract the content of the raw directory
  const content = fs.readFileSync(constants.RAW_DIR + "/" + fn);

  const { session, student, drawings } = JSON.parse(content);
  for (let label in drawings) {
    samples.push({
      id,
      label,
      student_name: student,
      student_id: session,
    });

    // Write the paths
    const paths = drawings[label];
    fs.writeFileSync(
      constants.JSON_DIR + "/" + id + ".json",
      JSON.stringify(paths)
    );

    // Generate images
    generateImageFile(constants.IMG_DIR + "/" + id + ".png", paths);

    // Print the progress count in the terminal
    utils.printProgress(id, fileNames.length * 8);

    id++;
  }
});

// Write the samples array into our simples file
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

fs.writeFileSync(
  constants.SAMPLES_JS,
  "const samples=" + JSON.stringify(samples) + ";"
);

function generateImageFile(outFile, paths) {
  // Clear canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Reusing the draw function
  draw.paths(ctx, paths);

  //   Store these draws as an image
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outFile, buffer);
}
