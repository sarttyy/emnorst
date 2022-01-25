// @ts-check

import { defineConfig } from "rollup";
import ts from "rollup-plugin-ts";
import strip from "@rollup/plugin-strip";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const DEV = !!process.env.ROLLUP_WATCH;
const banner = `
/**
 * @license
 * emnorst v${pkg.version}
 * Copyright 2020 rizzzse
 * License MIT
 */
`;

export default defineConfig({
    input: "./src/index.ts",
    output: [
        { file: "dist/emnorst.esm.js", format: "esm", banner },
        { file: "dist/emnorst.cjs.js", format: "cjs", banner },
    ],
    plugins: [
        ts({ transpileOnly: DEV }),
        strip({ include: "**/*.ts" }),
        terser({
            mangle: {
                properties: { regex: /^_[^_]/ },
            },
        }),
    ],
});
