import { version } from '../package.json';
import foo from './foo';
import doc from './doc';
import global from 'global';

export default function () {
  console.log(foo);
  console.log('current version is ' + version);
}
