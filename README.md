![](https://github.com/drikusroor/dutch-postal-code-city-coordinates/actions/workflows/main.yml/badge.svg)

# Dutch Postal Code & City Coordinates 🇳🇱📯🛰️

This repository aims to maintain a list of Dutch postal codes, cities, and their gps coordinates as a free alternative to Google's Geocoding API.

## Data structure

### Postcodetabel xlsx

The data is retrieved from the [Postcodetabel](http://www.sqlblog.nl/postcodetabel-nederland-sql-script/) but might be outdated (likely from around 2016). The data is stored in an XLSX file `data/postcodetabel.xlsx`. It has the following structure:

| PostcodeID | PostCodePK | PostCode | PostcodeNummers | PostcodeLetters | Straat        | MinNummer | MaxNummer | Plaats     | Gemeente   | Provincie     | Latitude         | Longitude       |
| ---------- | ---------- | -------- | --------------- | --------------- | ------------- | --------- | --------- | ---------- | ---------- | ------------- | ---------------- | --------------- |
| 1          | 6651EH_22  | 6651EH   | 6651            | EH              | Genechtstraat | 22        | 32        | Druten     | Druten     | Gelderland    | 51.8876046309833 | 5.5977233668844 |
| 2          | 1189WK_2   | 1189WK   | 1189            | WK              | De Wijde Blik | 2         | 30        | Amstelveen | Amstelveen | Noord-Holland | 52.2590205492292 | 4.8698991546708 |

### Postcodetabel json

The entry file `index.js` then converts and writes this to a json file `data/postcodetabel.json`, which is then archive due to Github's file size restrictions. It has the following structure:

```json
[
  {
    "PostcodeID": 1,
    "PostCodePK": "6651EH_22",
    "PostCode": "6651EH",
    "PostcodeNummers": 6651,
    "PostcodeLetters": "EH",
    "Straat": "Genechtstraat",
    "MinNummer": 22,
    "MaxNummer": 32,
    "Plaats": "Druten",
    "Gemeente": "Druten",
    "Provincie": "Gelderland",
    "Latitude": 51.8876046309833,
    "Longitude": 5.5977233668844
  },
  {
    "PostcodeID": 2,
    "PostCodePK": "1189WK_2",
    "PostCode": "1189WK",
    "PostcodeNummers": 1189,
    "PostcodeLetters": "WK",
    "Straat": "De Wijde Blik",
    "MinNummer": 2,
    "MaxNummer": 30,
    "Plaats": "Amstelveen",
    "Gemeente": "Amstelveen",
    "Provincie": "Noord-Holland",
    "Latitude": 52.2590205492292,
    "Longitude": 4.8698991546708
  }
]
```

#### Postal code, city, latitude, longitude subset

The `data/postcodetabel.json` file is also converted to a subset of the data, containing only the postal code, city, latitude, and longitude. This is stored in `data/postcodetabel-postal-code-city.json` and has the following structure:

```json
[
  {
    "pc": "6651EH",
    "city": "Druten",
    "c": [51.8876046309833, 5.5977233668844]
  },
  {
    "pc": "1189WK",
    "city": "Amstelveen",
    "c": [52.2590205492292, 4.8698991546708]
  }
]
```

#### Postal code number, city, latitude, longitude aggregated subset

Apart from that, there is also a subset of the data with the average latitude and longitude per postal code number, with the city included as well. It is stored in `data/postcodetabel-postal-code-city.json` and has the following structure:

```json
{
  "6651": {
    "city": "Druten",
    "c": [51.8876046309833, 5.5977233668844]
  },
  "1189": {
    "city": "Amstelveen",
    "c": [52.2590205492292, 4.8698991546708]
  }
}
```

#### Postal code, latitude, longitude subset

There is also a subset of the data with only the postal code, latitude, and longitude, stored in `data/postcodetabel-postal-code.json` and has the following structure:

```json
[
  {
    "pc": "6651EH",
    "c": [51.8876046309833, 5.5977233668844]
  },
  {
    "pc": "1189WK",
    "c": [52.2590205492292, 4.8698991546708]
  }
]
```

#### Postal code number, latitude, longitude aggregated subset

Apart from that, there is also a subset of the data with the average latitude and longitude per postal code number, stored in `data/postcodetabel-postal-code-aggregated.json` and has the following structure:

```json
{
  "6651": {
    "c": [51.8876046309833, 5.5977233668844]
  },
  "1189": {
    "c": [52.2590205492292, 4.8698991546708]
  }
}
```

#### City, latitude, longitude aggregated subset

Lastly, there is also a subset of the data with the average latitude, and longitude per city, stored in `data/postcodetabel-city-aggregated.json` that has the following structure:

```json
{
  "Druten": {
    "c": [51.8876046309833, 5.5977233668844]
  },
  "Amstelveen": {
    "c": [52.2590205492292, 4.8698991546708]
  }
}
```
