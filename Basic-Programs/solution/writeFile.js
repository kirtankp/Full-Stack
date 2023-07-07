const fs = require("fs");

fs.writeFile("./file.txt", "What is your name?", "utf8", (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }

  console.log("File written!");
});