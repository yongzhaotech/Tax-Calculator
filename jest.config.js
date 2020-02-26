module.exports = {
  // The root of source code
  roots: ["<rootDir>/src"],

  // Jest transformations -- this adds support for TypeScript
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  // Test spec file resolution pattern
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?|js)$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};