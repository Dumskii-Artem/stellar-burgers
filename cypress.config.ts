// cypress.config.ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://127.0.0.1:4000',
    chromeWebSecurity: false,
    modifyObstructiveCode: false
  },
});
