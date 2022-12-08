function getSubset(data, columnsMap, aggregateKey = null) {
  if (!aggregateKey) {
    return data.map((row) => {
      const filteredRow = {};
      Object.keys(columnsMap).forEach((key) => {
        filteredRow[columnsMap[key]] = row[key];
      });

      filteredRow.c = [row.Latitude, row.Longitude];
      return filteredRow;
    });
  }

  return data.reduce((acc, row) => {
    const filteredRow = {};
    Object.keys(columnsMap).forEach((key) => {
      filteredRow[columnsMap[key]] = row[key];
    });

    const aggregateValue = row[aggregateKey];

    if (!acc[aggregateValue]) {
      const aggregateRows = data.filter((row) => {
        return row[aggregateKey] === aggregateValue;
      });

      const averageLat =
        aggregateRows.reduce((acc, row) => {
          return acc + row.Latitude;
        }, 0) / aggregateRows.length;
      const averageLon =
        aggregateRows.reduce((acc, row) => {
          return acc + row.Longitude;
        }, 0) / aggregateRows.length;

      acc[aggregateValue] = {
        ...filteredRow,
        c: [averageLat, averageLon],
      };

      // remove aggregate key from object
      delete acc[aggregateValue][columnsMap[aggregateKey]];
    }

    return acc;
  }, {});
}

module.exports = getSubset;
