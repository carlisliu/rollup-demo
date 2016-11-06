import json from 'rollup-plugin-json';

export default {
  entry: 'src/index.js',
  //entry: 'src/main.js',
  format: 'iife',
  plugins: [json()],
  dest: 'bundle.js', // equivalent to --output
  moduleName: 'demo',
  globals: {
    window: 'window'
  }
};