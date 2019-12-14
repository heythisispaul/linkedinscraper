const scraper = require('scrapedin');
const prompt = require('./prompts');
const getAllData = require('./profileScraper');
const readConfig = require('./readConfig');

const initialize = async () => {
  let response;
  const config = readConfig();
  if (config) {
    response = config;
  } else {
    response = await prompt();
  }
  const {
    email,
    password,
    total,
    filePath,
    initialProfile,
    confirm,
    csv,
  } = response;
  if (!confirm) {
    // eslint-disable-next-line no-console
    console.log('Aborting, rerun start command to start over');
    process.exit(0);
  }

  const scrapeProfile = await scraper({ password, email });
  await getAllData(scrapeProfile, total, initialProfile, filePath, csv);
};

module.exports = initialize;
