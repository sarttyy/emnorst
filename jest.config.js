/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

// @ts-check

/** @type {import("@jest/types").Config.InitialOptions} */
export default {
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    moduleNameMapper: {
        "^~/(.+)": "<rootDir>/src/$1",
    },
    transform: {
        "\\.ts$": ["esbuild-jest", { sourcemap: true }],
    },
};
