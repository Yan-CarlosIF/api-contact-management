import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.e2e-spec.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/src/test/jest.setup.ts"],
};

export default config;
