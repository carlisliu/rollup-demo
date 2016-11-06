import json from 'rollup-plugin-json';

export default {
  entry: 'src/index.js',
  //entry: 'src/main.js',
  format: 'cjs',
  plugins: [json()],
  dest: 'bundle.js' // equivalent to --output
};