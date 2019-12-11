const crypto = require('crypto');

const getProfilesFromResults = (profileData) => {
  const result = {};
  if (profileData.peopleAlsoViewed && Array.isArray(profileData.peopleAlsoViewed)) {
    profileData.peopleAlsoViewed.forEach((profile) => {
      result[profile.user] = true;
    });
  }
  return result;
};

const skillsSum = (profileData) => {
  const hasSkills = profileData.skills && profileData.skills.length > 0;
  if (hasSkills) {
    return profileData.skills.reduce((total, skill) => {
      const { count } = skill;
      const number = count ? parseInt(count, 10) : 0;
      return total + number;
    }, 0);
  }
  return 0;
};

const getAboutMe = (profileData) => {
  if (profileData.profile && profileData.profile.summary) {
    return profileData.profile.summary;
  }

  if (profileData.profileAlternative && profileData.profileAlternative.summary) {
    return profileData.profileAlternative.summary;
  }

  if (profileData.aboutAlternative && profileData.aboutAlternative.text) {
    return profileData.aboutAlternative.text;
  }

  return '';
};

const getRecommendations = (profileData) => {
  if (profileData.recommendations) {
    const { givenCount, receivedCount } = profileData.recommendations;
    return { givenCount, receivedCount };
  }
  return { givenCount: '0', receivedCount: '0' };
};

const createEntry = (profileData, url) => {
  const recommendations = getRecommendations(profileData);
  const { givenCount, receivedCount } = recommendations;
  const hash = crypto.createHash('sha1').update(url || 'hello!').digest('hex');
  return {
    id: hash,
    givenCount,
    receivedCount,
    aboutMe: getAboutMe(profileData),
    skillsTotal: skillsSum(profileData),
  };
};

module.exports = {
  getProfilesFromResults,
  skillsSum,
  getAboutMe,
  getRecommendations,
  createEntry,
};
