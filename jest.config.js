// jest.config.js
console.log("Chargement de jest.config.js");
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFiles: ["text-encoding"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
};
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
