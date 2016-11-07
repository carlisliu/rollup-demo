import json from 'rollup-plugin-json';

function metric(ty_rum) {
    ty_rum.server = {};
}

export default {
  entry: 'src/index.js',
  //entry: 'src/main.js',
  format: 'iife',
  plugins: [json()],
  dest: 'bundle.js', // equivalent to --output
  moduleName: 'demo',
  interop: false,
  globals: {
    window: 'window',
    config: '{server: "192.168.1.1"}',
    metric: metric.toString()
  }
};