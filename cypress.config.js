const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000,
    headless: true
  },
  env: {
    baseUrl: "https://www.automationexercise.com/",
    customTimeout: 5000,
    password: "Hamza123",
    email: "hamza.younas@gmail.com",
    CustomerAddress: "Boston St#'",
    Name: "Hamza",
    allureReuseAfterSpec: true
  }
});