import window from 'window';

var on;
var off;
if (window.addEventListener) {
    on = function(target, event, listener, captured) {
        return target.addEventListener(event, listener, captured);
    };
    off = function(target, event, listener) {
        return target.removeEventListener(event, listener);
    };
} else {
    on = function(target, event, listener) {
        return target.attachEvent('on' + event, listener);
    };
    off = function(target, event, listener) {
        return target.detachEvent('on' + event, listener);
    };
}
export {
    on as on
};
export {
    off as off
};

export function once(target, event, listener, captured) {
    var _listener = function() {
        off(target, event, _listener);
        return listener.apply(this, arguments);
    }
    return on(target, event, _listener, captured);
}

var encodeURIComponent = window.encodeURIComponent;

export function enc(data) {
    return encodeURIComponent ? encodeURIComponent(data) : data;
}

function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length,
        type = typeof obj;
    if (type === "function") {
        return false;
    }
    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
}

export function each(obj, callback) {
    var length, i = 0;
    if (obj) {
        if (isArrayLike(obj)) {
            length = obj.length;
            for (; i < length; i++) {
                if (callback.call(obj[i], obj[i], i) === false) {
                    break;
                }
            }
        } else {
            for (i in obj) {
                if (callback.call(obj[i], obj[i], i) === false) {
                    break;
                }
            }
        }
    }
    return obj;
}

export function onlyOnce(fn) {
    return function() {
        if (fn === null) {
            return;
        }
        var func = fn;
        fn = null;
        func.apply(this, arguments);
    }
}

export function now() {
    return +new Date();
}

//ie6-ie8
var isIE = new Function('return!+[1,]');
export {
    isIE as isIE
};

var slice = [].slice;
export {
    slice as slice
};
export function extend(obj) {
    var length = arguments.length;
    if (length < 2 || !obj) {
        return obj;
    }
    var targets = slice.call(arguments, 1);
    each(targets, function(source) {
        each(source, function(val, key) {
            obj[key] = val;
        });
    });
    return obj;
}

var parse;
var stringify;
var JSON = window.JSON;
var QUOTE;
var QUOTE_REG;
var NEWLINE_REG;
if (JSON && JSON.parse && JSON.stringify) {
    parse = function(data) {
        return JSON.parse(data);
    };
    stringify = function(data) {
        return JSON.stringify(data);
    };
} else {
    QUOTE = '\"';
    QUOTE_REG = /([\"\\])/g;
    NEWLINE_REG = /\n/g;
    parse = function(arg) {
        return (new Function("return " + arg))();
    };
    stringify = function(data) {
        switch (typeof value) {
            case 'object':
                if (!value) {
                    return 'null';
                }
                if (value instanceof Array) {
                    each(value, function(val, index) {
                        value[index] = stringify(val);
                    });
                    return '[' + value.concat(',') + ']';
                }
                var result = '';
                each(value, function(val, key) {
                    if (!isFunction(val)) {
                        result += (key + ':' + stringify(val) + ',');
                    }
                })
                if (result) {
                    result = result.substr(0, result.length - 1);
                }
                return '{' + result + '}';
            case 'string':
                return QUOTE + value.replace(QUOTE_REG, '\\$1').replace(NEWLINE_REG, '\\n') + QUOTE;
            case 'number':
                return value.toString();
            case 'boolean':
                return value ? 'true' : 'false';
            case 'function':
                return stringify(value.toString());
            case 'undefined':
            default:
                return '\"undefined\"';
        }
    };
}

export function parseJSON(data) {
    if (data && isString(data)) {
        return parse(data);
    }
    return data;
}

export {
    stringify as stringify
};

function isType(type) {
    return function(arg) {
        if (type === 'Array' && Array.isArray) {
            return Array.isArray;
        }
        return Object.prototype.toString.call(arg) === "[object " + type + "]";
    }
}

export var isString = isType('String');
export var isArray = isType('Array');
export var isFunction = isType('Function');
export var isObject = isType('Object');

export function size(data) {
    if (!data) {
        return 0;
    }
    if (isString(data)) {
        return data.length;
    }
    if (window.ArrayBuffer && data instanceof ArrayBuffer) {
        return data.byteLength;
    }
    if (window.Blob && data instanceof Blob) {
        return data.size;
    }
    if (data.length) {
        return data.length;
    }
    return 0;
}

var currentProtocal = /^https/i.test(window.location.protocal) ? 'https:' : 'http:';
export function getUrl(host, path, params) {
    var url = null;
    if (host && path) {
        url = currentProtocal + '//';
        url += (host + path);
        if (params) {
            url += '?'
            each(params, function(value, key) {
                var pair = [enc(key), '=', enc(value), '&'];
                url += pair.join('');
            });
            url += ('__r=' + now());
        }
    }
    return url;
}

export function noop() {}

export function applyFunction(fn, args) {
    return Function.prototype.apply.apply(fn, args);
}

export function bind(fn, context) {
    return function() {
        fn.apply(context, arguments);
    }
}

export function startsWith(target, searchString, position) {
    if (!target) {
        return false;
    }
    position = position || 0;
    return target.indexOf(searchString, position);
}

var trim = String.prototype.trim ? function(text) {
    return text == null ? '' : text.trim();
} : function(text) {
    return text == null ? '' : text.toString().replace(/^\s+/, '').replace(/\s+$/, '');
};
export {
    trim as trim
};

export function wrap(target, name, wrapper) {
    if (!target) {
        return;
    }
    if (!wrapper) {
        return;
    }
    if (!isFunction(wrapper)) {
        return;
    }
    var original = target[name];
    if (original && original._wrapped) {
        return;
    }
    var wrapped = wrapper(original);
    wrapped._wrapped = true;
    target[name] = wrapped;
    return wrapped;
}

function part() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function guid() {
    return part() + '-' + part() + part();
}

export function nextTick(fn) {
    return setTimeout(fn, 0);
}