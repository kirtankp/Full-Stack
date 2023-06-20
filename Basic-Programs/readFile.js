const fs = require("fs");

fs.readFile("./file.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file: ", err);
    return;
  }

  console.log("File contents:", data);
});

//heavy task
for (let i = 0; i < 1000000000; i++) {
//   console.log(i);
}