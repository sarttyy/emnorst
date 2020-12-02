
import buble from "@rollup/plugin-buble";
import commonjs from "@rollup/plugin-commonjs";
import inject from "@rollup/plugin-inject";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import strip from "@rollup/plugin-strip";
import ts from "@wessberg/rollup-plugin-ts";
import analyze from "rollup-plugin-analyzer";
import { terser } from "rollup-plugin-terser";
import visualizer from "rollup-plugin-visualizer";

import fs from "fs";
import pkg from "./package.json";

const entry = "./src/main.ts";
const DEVELOPMENT = process.env.BUILD === "development";
const banner = `/**
 * @license
 * emnorst v${pkg.version}
 * Copyright 2020 reiyayakko
 * License MIT
 */`;

const DevPlugins = [];
const ProdPlugins = [
    terser(),
    visualizer({
        filename: `./dist/stats.${pkg.name}.html`,
        template: "sunburst",
        // template: "network",
    }),
    analyze({
        writeTo(analysisString) {
            fs.writeFileSync(`./dist/analysis.${pkg.name}.txt`, analysisString);
        }
    }),
];

// alias, virtual
const Plugins = [
    json({ indent: "    ", namedExports: false }),
    ts({
        transpileOnly: true,
        tsconfig: {
            declaration: DEVELOPMENT,
            target: "ESNEXT",
        }
    }),
    strip({
        include: ["**/*.(js|ts)"],
        functions: ["assert.*"]
    }),
    inject({
        // import key from value;
        // import { value[1] as key } from value[0];
        "Array.prototype": ["src/object/standard/prototype", "ArrayPrototype"],
        "Array.prototype.slice": ["src/object/standard/prototype", "slice"],
        "Object.prototype": ["src/object/standard/prototype", "ObjectPrototype"],
        "Object.keys": ["src/object/standard/keys", "keys"],
    }),
    commonjs(),
    nodeResolve(),
    replace({
        // include: "**/env/*.js",
        delimiters: ["<$", "/>"],
        values: {
            VERSION: pkg.version,
            ENVIRONMENT: process.env.BUILD,
        }
    }),
];

const UMDBuild = {
    input: entry,
    output: {
        file: pkg.unpkg,
        format: "umd",
        name: pkg.name,
        extend: true,
        sourcemap: DEVELOPMENT,
        banner,
    },
    plugins: [
        ...Plugins,
        buble({
            transforms: {
                dangerousForOf: true,
                dangerousTaggedTemplateString: true,
                forOf: false,
                generator: false,
            },
            objectAssign: true,
        }),
        // inject({
        //     "Object.assign": ["./src/", "assign"]
        // }),
        ...(DEVELOPMENT ? DevPlugins : ProdPlugins),
    ],
}, ESBuild = {
    input: entry,
    output: [{
        file: pkg.module,
        format: "es",
        sourcemap: DEVELOPMENT,
        banner,
    }, {
        file: pkg.main,
        format: "cjs",
        sourcemap: DEVELOPMENT,
        banner,
    }],
    plugins: [
        ...Plugins,
        ...(DEVELOPMENT ? DevPlugins : ProdPlugins),
    ],
};

export default [UMDBuild, ESBuild].map((config) => {
    if(!DEVELOPMENT) {
        const _ = (out) => {
            const path = out.file.split(".");
            path.splice(-1, 0, "min");
            out.file = path.join(".");
        };
        if(Array.isArray(config.output))
            config.output.forEach(_);
        else _(config.output);
    }
    return config;
});
