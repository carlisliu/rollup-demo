import { version } from '../package.json';
import foo from './foo';
import doc from './doc';

console.log(doc);

console.log(foo);

export default function () {
  console.log('current version is ' + version);
}