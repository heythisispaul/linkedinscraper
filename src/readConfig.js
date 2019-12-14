/* eslint-disable no-console */
const { readFileSync } = require('fs');

const readConfig = () => {
  try {
    const data = readFileSync('./config.json', 'utf8');
    const json = JSON.parse(data);
    json.confirm = true;
    console.log('using the values from your config.json file.');
    return json;
  } catch (err) {
    console.log('No config found, or there was an error reading the file. Please answer the following questions.');
    return undefined;
  }
};

module.exports = readConfig;
