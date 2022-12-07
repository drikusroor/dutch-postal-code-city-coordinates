const fs = require("fs");
const XLSX = require("xlsx");
const compressing = require("compressing");
const loadPostcodetabel = require("./src/helpers/load-postcodetabel-xlsx");

async function main() {
  console.time("process data");

  // load the xlsx file
  const { workbook, sheetNameList, worksheet } = loadPostcodetabel();

  // convert whole sheet to JSON and write to file
  const fullJsonData = XLSX.utils.sheet_to_json(worksheet);
  fs.writeFileSync("data/postcodetabel.json", JSON.stringify(fullJsonData));

  // zip json file
  await compressing.zip.compressDir(
    "data/postcodetabel.json",
    "data/postcodetabel-json.zip"
  );

  console.timeEnd("process data");
}

main();
