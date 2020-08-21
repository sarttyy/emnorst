
import buble from "@rollup/plugin-buble";
import commonjs from "@rollup/plugin-commonjs";
import inject from "@rollup/plugin-inject";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import strip from "@rollup/plugin-strip";
import analyze from "rollup-plugin-analyzer";
import { terser } from "rollup-plugin-terser";
import visualizer from "rollup-plugin-visualizer";

import fs from "fs";
import path from "path";
import $package from "./package.json";

const moduleName = "monster";
const entry = "./src/main.js";
const DEVELOPMENT = process.env.BUILD === "development";

const DevPlugins = [];
const ProdPlugins = [
    strip({
        // functions: ["console.*", "assert.*"]
    }),
    terser(),
    visualizer({
        filename: `./dist/stats.${moduleName}.html`,
        // template: "sunburst",
        // template: "network",
    }),
    analyze({
        writeTo(analysisString) {
            fs.writeFileSync(`./dist/analysis.${moduleName}.txt`, analysisString);
        }
    }),
];
const EveryPlugins = [
    // alias(),
    inject({
        // import key from value;
        // import { value[1] as key } from value[0];
        Symbol: [path.resolve("src/util/standard/symbol.js"), "Symbol"],
    }),
    commonjs(),
    json({ indent: "    ", namedExports: false }),
    nodeResolve(),
    replace({
        include: "**/env/*.js",
        delimiters: ["<$", "/>"],
        values: {
            VERSION: $package.version,
            ENVIRONMENT: process.env.BUILD,
        }
    }),
];

export default [{
    input: entry,
    output: [{
        file: `./dist/${moduleName}.umd.js`,
        format: "umd",
        name: moduleName,
        sourcemap: DEVELOPMENT,
    }],
    plugins: [
        ...EveryPlugins,
        buble({
            transforms: {
                forOf: false,
                generator: false,
            },
            objectAssign: true,
        }),
        ...(DEVELOPMENT ? DevPlugins : ProdPlugins),
    ],
}, {
    input: entry,
    output: [{
        file: `./dist/${moduleName}.esm.js`,
        format: "es",
        sourcemap: DEVELOPMENT,
    }, {
        file: `./dist/${moduleName}.cjs.js`,
        format: "cjs",
        sourcemap: DEVELOPMENT,
    }],
    plugins: [
        ...EveryPlugins,
        ...(DEVELOPMENT ? DevPlugins : ProdPlugins),
    ],
}].map((config) => {
    if(!DEVELOPMENT) {
        config.output.forEach((out) => {
            const path = out.file.split(".");
            path.splice(-1, 0, "min");
            out.file = path.join(".");
        });
    }
    return config;
});
