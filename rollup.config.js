// @ts-check

import { defineConfig } from "rollup";
import ts from "rollup-plugin-ts";
import strip from "@rollup/plugin-strip";
import { terser } from "rollup-plugin-terser";

const DEV = !!process.env.ROLLUP_WATCH;

export default defineConfig({
    input: "./src/index.ts",
    output: [
        { file: "dist/emnorst.js", format: "esm" },
        { file: "dist/emnorst.cjs", format: "cjs" },
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
