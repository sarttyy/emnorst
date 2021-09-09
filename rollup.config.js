// @ts-check

import ts from "@wessberg/rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const DEV = process.env.BUILD === "development";
const banner = `
/**
 * @license
 * emnorst v${pkg.version}
 * Copyright 2020 rizzzse
 * License MIT
 */
`;

/** @type {import("rollup").RollupOptions} */
const config = {
    input: "./src/index.ts",
    output: [
        { file: "dist/emnorst.esm.js", format: "esm", banner },
        { file: "dist/emnorst.cjs.js", format: "cjs", banner },
    ],
    plugins: [
        ts({ transpileOnly: DEV }),
        terser({
            mangle: {
                properties: { regex: /^_[^_]/ },
            },
        }),
    ],
};

export default config;
