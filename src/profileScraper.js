const { writeFileSync } = require('fs');
const cliProgress = require('cli-progress');
const { getProfilesFromResults, createEntry } = require('./profileHelpers');

// our application's 'state'
// there's probably some room for improvement with Sets and Maps
let seenProfiles = {};
let scrapedProfiles = {};
const collectedResults = [];
let total = 0;

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const getNextProfile = (initialProfile) => {
  if (total === 0) {
    return initialProfile;
  }
  const seen = Object.keys(seenProfiles);
  let next;
  seen.some((profile) => {
    next = profile;
    return !scrapedProfiles[profile];
  });
  return next;
};

const getProfileData = async (scrapeProfile, url) => {
  try {
    // get data
    const profile = await scrapeProfile(url);

    // update the current state
    const otherProfiles = getProfilesFromResults(profile);
    const newSeenProfiles = { ...seenProfiles, ...otherProfiles };
    seenProfiles = newSeenProfiles;

    const newScrapedProfiles = { ...scrapedProfiles, [url]: true };
    scrapedProfiles = newScrapedProfiles;
    total += 1;

    // save the results
    const formattedProfile = createEntry(profile, url);
    collectedResults.push(formattedProfile);
  } catch (err) {
    total += 1;
  }
};

const getAllData = async (scrapeProfile, providedTotal, initialProfile, filePath) => {
  progressBar.start(providedTotal, 0);
  while (total <= providedTotal) {
    const profile = getNextProfile(initialProfile);
    if (!profile) {
      // eslint-disable-next-line no-console
      console.log('no more profiles :( writing collected data');
      progressBar.stop();
      writeFileSync(filePath, JSON.stringify(collectedResults, null, 2), 'utf8');
      break;
    }
    // eslint-disable-next-line no-await-in-loop
    await getProfileData(scrapeProfile, profile, filePath);
    progressBar.increment();
  }
  // we're all done!
  writeFileSync(filePath, JSON.stringify(collectedResults, null, 2), 'utf8');
  progressBar.stop();
  process.exit(0);
};

module.exports = getAllData;
