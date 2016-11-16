import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

function config(ty_rum) {
  ty_rum.server = {};
  //ty_rum.agent = {};
}

export default {
  entry: 'src/index.js',
  //entry: 'src/main.js',
  format: 'iife',
  globals: {
    window: 'window',
    global: '{server: "192.168.1.1"}',
    config: config.toString()
  },
  plugins: [json(), nodeResolve({
    jsnext: true,
    main: true,
    browser: true,
    skip: ['global', 'config', 'window']
  }), commonjs()],
  dest: 'dist/bundle.js', // equivalent to --output
  moduleName: 'DEMO',
  interop: false
};