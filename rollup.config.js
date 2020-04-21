
import istanbul from 'rollup-plugin-istanbul';
import {terser} from 'rollup-plugin-terser';

const config = {
  input: './src/index.js',
  output: [
    {
      file: './dist/reiyayakko.cjs.js',
      format: 'cjs',
    },
    {
      file: './dist/reiyayakko.es.js',
      format: 'es',
    },
    {
      file: './dist/reiyayakko.umd.js',
      format: 'umd',
      name: "rei",
    },
  ],
  plugins: []
};

if(process.env.BUILD !== 'production'){
  // dev
  config.output.map(output=>{
    output.sourcemap = true;
    return output;
  });
}else{
  // production
  config.output.map(output=>{
    output.file = output.file.split('.');
    output.file.splice(-1, 0, "min");
    output.file = output.file.join('.');
    console.log(output.file)
    return output;
  });
  config.plugins.push(terser());
}

export default config;
