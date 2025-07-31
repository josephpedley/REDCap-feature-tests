const { defineConfig } = require("cypress");
require('dotenv').config();
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  projectId: '3pazfm',

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: false,
  json: true,
  charts: true,
  embeddedScreenshots: true,
  inlineAssets: true,
  saveAllAttempts: false
},
 video: true,
  screenshotOnRunFailure: true,

  e2e: {
    redirectionLimit: 999,
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      on('task', {
        getLatestCsv() {
          const downloadsFolder = path.resolve('cypress/downloads');
          const files = fs.readdirSync(downloadsFolder)
            .filter(file => file.endsWith('.csv'))
            .map(file => ({
              name: file,
              time: fs.statSync(path.join(downloadsFolder, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time);

          if (files.length === 0) return null;
          return path.join(downloadsFolder, files[0].name);
        }
      });

      return config;
    },
  },
});
