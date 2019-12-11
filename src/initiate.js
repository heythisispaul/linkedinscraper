const scraper = require('scrapedin');
const prompt = require('./prompts');
const getAllData = require('./profileScraper');

const initialize = async () => {
  const {
    email,
    password,
    total,
    filePath,
    initialProfile,
    confirm,
  } = await prompt();
  if (!confirm) {
    // eslint-disable-next-line no-console
    console.log('Aborting, rerun start command to start over');
    process.exit(0);
  }

  const scrapeProfile = await scraper({ password, email });
  await getAllData(scrapeProfile, total, initialProfile, filePath);
};

module.exports = initialize;
