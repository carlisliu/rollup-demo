import {
    now
} from './util';

function test(send) {
    return function(argument) {
        wrap(arguments);
        now();
        return send.apply(this, arguments);
    };
}

function wrap() {
    setHeader();
    console.log(arguments);
}

function setHeader() {}

export function n() {
    console.log(t);
}

export function begin() {
    console.log('begin');
}