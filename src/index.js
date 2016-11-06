import { version } from '../package.json';
import foo from './foo';
import doc from './doc';
import config from 'config';
import metric from 'metric';

if (typeof metric === 'function') {
  config = config || {};
  metric(config);
}

export default function () {
  console.log(foo);
  console.log('current version is ' + version);
}