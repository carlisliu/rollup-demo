import { version } from '../package.json';
import foo from './foo';
import w from 'window';

console.log(w.setTimeout);

console.log(foo);

export default function () {
  console.log('current version is ' + version);
}