const fs = require("fs");
const XLSX = require("xlsx");
const compressing = require("compressing");
const loadPostcodetabel = require("./src/helpers/load-postcodetabel-xlsx");
const getSubset = require("./src/helpers/get-subset");

async function main() {
  console.time("process data");

  console.time("load data");
  // load the xlsx file
  const { workbook, sheetNameList, worksheet } = loadPostcodetabel();
  console.timeEnd("load data");

  // convert whole sheet to JSON and write to file
  console.time("convert to json");
  const fullJsonData = XLSX.utils.sheet_to_json(worksheet);
  console.timeEnd("convert to json");

  console.time("write json to file");
  fs.writeFileSync("data/postcodetabel.json", JSON.stringify(fullJsonData));
  console.timeEnd("write json to file");
  //   // zip json file
  console.time("zip json file");
  await compressing.zip.compressDir(
    "data/postcodetabel.json",
    "data/postcodetabel-json.zip"
  );
  console.timeEnd("zip json file");

  // pc, city, lat, lon
  const postalCodeCityColumns = {
    PostCode: "pc",
    Plaats: "city",
  };
  const filteredJsonData = getSubset(fullJsonData, postalCodeCityColumns);
  fs.writeFileSync(
    "data/postcodetabel-postal-code-city.json",
    JSON.stringify(filteredJsonData)
  );

  // pcnr, city, lat, lon
  const postalCodeNumberCityAggregateColumns = {
    PostcodeNummers: "pcnr",
    Plaats: "city",
  };
  const filteredJsonDataAggregated = getSubset(
    fullJsonData,
    postalCodeNumberCityAggregateColumns,
    "PostcodeNummers"
  );
  fs.writeFileSync(
    "data/postcodetabel-postal-code-city-aggregated.json",
    JSON.stringify(filteredJsonDataAggregated)
  );

  // pc, lat, lon
  const postalCodeColumns = {
    PostCode: "pc",
  };
  const filteredJsonDataPostalCode = getSubset(fullJsonData, postalCodeColumns);
  fs.writeFileSync(
    "data/postcodetabel-postal-code.json",
    JSON.stringify(filteredJsonDataPostalCode)
  );

  const postalCodeNumberAggregatedColumns = {
    PostcodeNummers: "pcnr",
  };
  const filteredJsonDataPostalCodeAggregated = getSubset(
    fullJsonData,
    postalCodeNumberAggregatedColumns,
    "PostcodeNummers"
  );
  fs.writeFileSync(
    "data/postcodetabel-postal-code-aggregated.json",
    JSON.stringify(filteredJsonDataPostalCodeAggregated)
  );

  // city, lat, lon
  const cityAggregateColumns = {
    Plaats: "city",
  };
  const filteredJsonDataCityAggregated = getSubset(
    fullJsonData,
    cityAggregateColumns,
    "Plaats"
  );
  fs.writeFileSync(
    "data/postcodetabel-city-aggregated.json",
    JSON.stringify(filteredJsonDataCityAggregated)
  );

  console.timeEnd("process data");
}

main();
