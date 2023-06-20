const fs = require("fs");

fs.readFile("./file1.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file: ", err);
        return;
    }

    let cleanedData = cleanData(data);
    console.log(cleanedData);

    fs.writeFile("./file1.txt", cleanedData, "utf-8", (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }
    
        console.log("File written!");
    });
});

function cleanData(data) {
    let clean = data.replace(/\s+/g, " ").trim();
    return clean;
}

