/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    // An array of directory names to be searched recursively up from the requiring module's location
    // moduleDirectories: [
    //   "node_modules"
    // ],

    // An array of file extensions your modules use
    moduleFileExtensions: [
        "js",
        "ts",
    ],

    // The root directory that Jest should scan for tests and modules within
    // rootDir: ".",

    // A list of paths to directories that Jest should use to search for files in
    roots: [
        "./src",
        "./test"
    ],

    setupFilesAfterEnv: ["./jest.setup.ts"],

    // The test environment that will be used for testing
    testEnvironment: "jest-environment-node",

    // The glob patterns Jest uses to detect test files
    testMatch: [
        "**/*.test.ts",
    ],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: [
        "/node_modules/"
    ],

    // The regexp pattern or array of patterns that Jest uses to detect test files
    // testRegex: [],

};
