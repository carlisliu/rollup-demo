import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

function settings(ty_rum) {
  ty_rum.server = {};
  //ty_rum.agent = {};
}

export default {
  entry: 'src/index.js',
  //entry: 'src/main.js',
  format: 'iife',
  globals: {
    window: 'window',
    global: settings.toString
  },
  plugins: [json(), nodeResolve({
    jsnext: true,
    main: true,
    browser: true,
    skip: ['global', 'window']
  }), commonjs()],
  dest: 'dist/bundle.js', // equivalent to --output
  moduleName: 'DEMO',
  interop: false
};
