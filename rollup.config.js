
import istanbul from "rollup-plugin-istanbul";
import buble from "rollup-plugin-buble";
import { terser } from "rollup-plugin-terser";

const config = {
    input: "./src/index.js",
    output: [
        {
            file: "./dist/reiyayakko.cjs.js",
            format: "cjs",
        },
        {
            file: "./dist/reiyayakko.es.js",
            format: "es",
        },
        {
            file: "./dist/reiyayakko.umd.js",
            format: "umd",
            name: "rei",
        },
    ],
    plugins: [
        // babel(babelrc())
        buble({
            target: {
                chrome: 49,
                node: 4,
                firefox: 45,
                safari: 9,
                edge: 12,
                ie: 11
            },
            transforms: {
                forOf: false, // MEMO: replaced
                generator: false
            },
            objectAssign: "Object.assign"
        })
    ]
};

// eslint-disable-next-line no-undef, no-process-env
if(process.env.BUILD !== "production"){
    // dev
    config.output.map((output)=>{
        output.sourcemap = true;
        return output;
    });
}else{
    // production
    config.output.map((output)=>{
        const file = output.file.split(".");
        file.splice(-1, 0, "min");
        output.file = file.join(".");
        return output;
    });
    config.plugins.push(terser());
}

export default config;
