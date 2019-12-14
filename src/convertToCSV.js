const { writeFileSync } = require('fs');
const Papa = require('papaparse');

const convertToCSV = (data, filePath) => {
  const csv = Papa.unparse(data);
  const csvFilePath = filePath.replace('.json', '.csv');
  writeFileSync(csvFilePath, csv, 'utf8');
};

module.exports = convertToCSV;
