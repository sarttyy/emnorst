
import buble from "rollup-plugin-buble";
import { terser } from "rollup-plugin-terser";

const moduleName = "machilia";
const entry = "./src/index.js";
const dir = "./dist/";

const configs = [{
    input: entry,
    output: [{
        file: ["cjs"],
        format: "cjs",
    }, {
        file: ["umd"],
        format: "umd",
        name: moduleName,
    }],
    plugins: [
        buble({
            target: {
                chrome: 49,
                node: 4,
                firefox: 45,
                safari: 9,
                edge: 12,
                ie: 11,
            },
            transforms: {
                forOf: false, // MEMO: replaced
                generator: false,
            },
            objectAssign: "machilia.patch",
        })
    ],
}, {
    input: entry,
    output: [{
        file: ["es2015", "esm"],
        format: "es",
    }, {
        file: ["es2015", "umd"],
        format: "umd",
        name: moduleName,
    }],
    plugins: [],
}];

const file = (...args) => [dir + moduleName, ...args, "js"].join(".");
// eslint-disable-next-line no-undef, no-process-env
if(process.env.BUILD !== "production") {
    // develop
    configs.forEach((config) => {
        config.output.forEach((output) => {
            output.sourcemap = true;
            output.file = file(...output.file);
        });
    });
}else {
    // production
    configs.forEach((config) => {
        config.output.forEach((output) => {
            output.file = file(...output.file, "min");
        });
        config.plugins.push(terser());
    });
}

export default configs;
