const getSubset = require("./get-subset");

const sampleData = [
  {
    PostcodeID: 1,
    PostCodePK: "6651EH_22",
    PostCode: "6651EH",
    PostcodeNummers: 6651,
    PostcodeLetters: "EH",
    Straat: "Genechtstraat",
    MinNummer: 22,
    MaxNummer: 32,
    Plaats: "Druten",
    Gemeente: "Druten",
    Provincie: "Gelderland",
    Latitude: 3,
    Longitude: 3,
  },
  {
    PostcodeID: 2,
    PostCodePK: "6651EH_202",
    PostCode: "6651EV",
    PostcodeNummers: 6651,
    PostcodeLetters: "EH",
    Straat: "Genechtstraat",
    MinNummer: 202,
    MaxNummer: 300,
    Plaats: "Druten",
    Gemeente: "Druten",
    Provincie: "Gelderland",
    Latitude: 5,
    Longitude: 9,
  },
  {
    PostcodeID: 3,
    PostCodePK: "6651EH_302",
    PostCode: "6651DA",
    PostcodeNummers: 6651,
    PostcodeLetters: "EH",
    Straat: "Genechtstraat",
    MinNummer: 302,
    MaxNummer: 400,
    Plaats: "Druten",
    Gemeente: "Druten",
    Provincie: "Gelderland",
    Latitude: 7,
    Longitude: 9,
  },
  {
    PostcodeID: 4,
    PostCodePK: "8471RK_24",
    PostCode: "8471RK",
    PostcodeNummers: 8471,
    PostcodeLetters: "RK",
    Straat: "Beatrixstraat",
    MinNummer: 24,
    MaxNummer: 36,
    Plaats: "Wolvega",
    Gemeente: "Weststellingwerf",
    Provincie: "Friesland",
    Latitude: 52.8735274661331,
    Longitude: 5.9963276468421,
  },
  {
    PostcodeID: 5,
    PostCodePK: "7231JH_78",
    PostCode: "7231JH",
    PostcodeNummers: 7231,
    PostcodeLetters: "JH",
    Straat: "Breegraven",
    MinNummer: 78,
    MaxNummer: 102,
    Plaats: "Warnsveld",
    Gemeente: "Zutphen",
    Provincie: "Gelderland",
    Latitude: 52.1385577151151,
    Longitude: 6.2255882423347,
  },
];

describe("getSubset", () => {
  it("gets a subset of the postcodetabel dataset", () => {
    const postalCodeColumns = {
      PostCode: "pc",
      Latitude: "lat",
      Longitude: "lon",
    };
    const filteredJsonDataPostalCode = getSubset(sampleData, postalCodeColumns);
    expect(filteredJsonDataPostalCode).toEqual([
      {
        pc: "6651EH",
        lat: 3,
        lon: 3,
      },
      {
        pc: "6651EV",
        lat: 5,
        lon: 9,
      },
      {
        pc: "6651DA",
        lat: 7,
        lon: 9,
      },
      {
        pc: "8471RK",
        lat: 52.8735274661331,
        lon: 5.9963276468421,
      },
      {
        pc: "7231JH",
        lat: 52.1385577151151,
        lon: 6.2255882423347,
      },
    ]);
  });

  it("gets a bigger subset of the postcodetabel dataset", () => {
    const postalCodeColumns = {
      PostCode: "pc",
      Plaats: "city",
      Latitude: "lat",
      Longitude: "lon",
    };
    const filteredJsonDataPostalCode = getSubset(sampleData, postalCodeColumns);
    expect(filteredJsonDataPostalCode).toEqual([
      {
        pc: "6651EH",
        city: "Druten",
        lat: 3,
        lon: 3,
      },
      {
        pc: "6651EV",
        city: "Druten",
        lat: 5,
        lon: 9,
      },
      {
        pc: "6651DA",
        city: "Druten",
        lat: 7,
        lon: 9,
      },
      {
        pc: "8471RK",
        city: "Wolvega",
        lat: 52.8735274661331,
        lon: 5.9963276468421,
      },
      {
        pc: "7231JH",
        city: "Warnsveld",
        lat: 52.1385577151151,
        lon: 6.2255882423347,
      },
    ]);
  });

  it("gets a subset of the postcodetabel dataset with an aggregate key", () => {
    const postalCodeColumns = {
      PostcodeNummers: "pcnr",
      Latitude: "lat",
      Longitude: "lon",
    };
    const filteredJsonDataPostalCode = getSubset(
      sampleData,
      postalCodeColumns,
      "PostcodeNummers"
    );
    expect(filteredJsonDataPostalCode).toEqual({
      6651: {
        lat: 5,
        lon: 7,
      },
      8471: {
        lat: 52.8735274661331,
        lon: 5.9963276468421,
      },
      7231: {
        lat: 52.1385577151151,
        lon: 6.2255882423347,
      },
    });
  });

  it("gets a subset of the postcodetabel dataset with an aggregate key including the city", () => {
    const postalCodeColumns = {
      PostcodeNummers: "pcnr",
      Plaats: "city",
      Latitude: "lat",
      Longitude: "lon",
    };
    const filteredJsonDataPostalCode = getSubset(
      sampleData,
      postalCodeColumns,
      "PostcodeNummers"
    );
    expect(filteredJsonDataPostalCode).toEqual({
      6651: {
        city: "Druten",
        lat: 5,
        lon: 7,
      },
      8471: {
        city: "Wolvega",
        lat: 52.8735274661331,
        lon: 5.9963276468421,
      },
      7231: {
        city: "Warnsveld",
        lat: 52.1385577151151,
        lon: 6.2255882423347,
      },
    });
  });
});
