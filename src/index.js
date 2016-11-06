import { version } from '../package.json';
import foo from './foo';
import doc from './doc';
import config from 'config';
import metric from 'metric';

console.log(doc);
console.log(config);
console.log(typeof metric);

if (typeof metric === 'function') {
    metric({});
}

console.log(foo);

export default function () {
  console.log('current version is ' + version);
}