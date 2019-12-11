const prompts = require('prompts');

const prompt = async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'email',
      message: "What's your LinkedIn email address?",
    },
    {
      type: 'password',
      name: 'password',
      message: "What's your LinkedIn password?",
    },
    {
      type: 'number',
      name: 'total',
      message: 'How many profiles would you like to scrape? (Between 1 and 1000)',
      // eslint-disable-next-line no-confusing-arrow
      validate: (value) => value < 0 || value > 1000 ? 'Must be between 1 and 1000' : true,
    },
    {
      type: 'text',
      name: 'initialProfile',
      message: 'The URL of the LinkedIn profile to start with',
    },
    {
      type: 'text',
      name: 'filePath',
      message: 'Where would you like the data to be saved?',
      initial: './linked-in-data.json',
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Begin now?',
      initial: true,
    },
  ]);
  return response;
};

module.exports = prompt;
