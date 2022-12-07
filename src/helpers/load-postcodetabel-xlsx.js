const XLSX = require("xlsx");

function convertXlsxToJson(filePath = "data/postcodetabel.xlsx") {
  const workbook = XLSX.readFile(filePath, {
    cellDates: true,
    cellNF: false,
    cellText: false,
    cellStyles: false,
  });

  const sheetNameList = workbook.SheetNames;

  const worksheet = workbook.Sheets[sheetNameList[0]];

  return { workbook, sheetNameList, worksheet };
}

module.exports = convertXlsxToJson;
