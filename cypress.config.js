const { defineConfig } = require("cypress");
<<<<<<< HEAD
=======
require('dotenv').config();
>>>>>>> development

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
