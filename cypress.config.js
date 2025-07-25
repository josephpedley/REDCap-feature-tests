const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  projectId: '3pazfm',
  e2e: {
    supportFile: 'cypress/support/e2e.js', // point to your support file path here
    setupNodeEvents(on, config) {
      
      // implement node event listeners here if needed
      return config;
    },
  },
});
