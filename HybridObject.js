import get from "lodash-es/get.js";
import set from "lodash-es/set.js";
import unset from "lodash-es/unset.js";
import has from "lodash-es/has.js";
import flattenObject from "flatten-object";
import { isPlainObject } from "lodash-es";

//import console from 'a-nicer-console'

/**
 * Implementation on top of plain objects that brings a variety of array-like functionality.
 * It also supports `dotted.string.notation` for accessing properties.
 * @class HybridObject
 * @extends Object
 * @param {Object} [data]
 */
class HybridObject extends Object {

    /**
     * Override the default `assign` method and ensure that the first argument is an instance of `HybridObject`.
     * Not to be confused with the eponymous `instance.assign()` method.
     * @param {Object|HybridObject} target
     * @param  {...*} sources Objects|HybridObjects to be merged
     * @static
     * @ignore
     * @returns HybridObject
     * @example
     * const obj1 = {a: 1, b: 2};
     * const obj2 = {c: 3, d: 4};
     * console.log(HybridObject.assign(obj1, obj2)); // HybridObject {a: 1, b: 2, c: 3, d: 4}
     * const obj3 = {e: 5, f: 6};
     * const obj4 = new HybridObject({g: 7, h: 8});
     * console.log(HybridObject.assign(obj3, obj4)); // HybridObject {e: 5, f: 6, g: 7, h: 8}
     */
    static assign(target, ...sources) {
        return Object.assign(new HybridObject(target), ...sources);
    }

    /**
     * Cosntructor
     * @param {Object|HybridObject} data
     */
    constructor(data = {}) {
        super();
        Object.assign(this, data);
    }
}

/**
 * Copies all enumerable own properties from one or more source objects to the Hybrid Object.
 * Not to be confused with the eponymous static `HybridObject.assign()` method.
 * @param {...Object} sources The source object(s) — objects containing the properties you want to apply.
 * @returns {HybridObject}
 * @example
 * const hObj = new HybridObject({
 *     a: 1,
 *     b: 2
 * });
 * const source1 = {
 *     b: 4,
 *     c: 5
 * }
 * const source2 = {
 *     d: 6,
 *     e: 7
 * }
 * console.log(hObj.assign(source1, source2)); // HybridObject { a: 1, b: 4, c: 5, d: 6, e: 7 }
 */
HybridObject.prototype.assign = function (...sources) {
    return Object.assign(this, ...sources);
};

/**
 * Get a deep clone of an HybridObject
 * @returns {HybridObject}
 * @example
 * const hObj = new HybridObject({
 *     a: {
 *         b: {
 *             c: 1
 *            }
 *         }
 * });
 * const clone = hObj.clone();
 * console.log(clone.get('a.b.c')); // 1
 * console.log(hObj.get('a.b.c')); // 1
 * hObj.set('a.b.c', 2);
 * console.log(clone.get('a.b.c')); // 1
 * console.log(hObj.get('a.b.c')); // 2
 */
HybridObject.prototype.clone = function () {
    return new HybridObject(structuredClone(this));
};

/**
 * Returns a deep clone of a particular property
 * @param {String} path
 * @returns {*}
 * @example
 * const hObj = new HybridObject({
 *     a: {
 *         b: {
 *             c: 1
 *            }
 *         }
 * });
 * const clone = hObj.cloneProperty('a.b');
 * console.log(clone.get('a.b')); // { c: 1 }
 * console.log(hObj.get('a.b')); // { c: 1 }
 * hObj.set('a.b', 2);
 * console.log(clone.get('a.b')); // { c: 1 }
 * console.log(hObj.get('a.b')); // 2
 */
HybridObject.prototype.cloneProperty = function (path) {
    return structuredClone(this.get(path));
};

/**
 * Returns an array of the object's own enumerable string-keyed property [key, value] pairs.
 * This is modeled after the behavior of `Object.entries()` and _not_ `Array.entries()` which returns an iterator.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 * @returns {Array}
 * @example
 * const hObj = new HybridObject({
 *     a: {
 *         ab: 1
 *     },
 *     b: {
 *         bb: 2
 *     }
 * });
 * console.log(hObj.entries()); // [["a",{"ab":1}],["b",{"bb":2}]]
 */
HybridObject.prototype.entries = function () {
    return Object.entries(this);
};

/**
 * Checks whether all entries satisfy the provided callback function.
 * Equivalent of `Array.every()`.
 * @param {Function} callbackFn Args: value, path, entries [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
 * @returns {Boolean}
 * @example
 * const hObj = new HybridObject({
 *     a: 1,
 *     b: 2,
 *     c: 3
 * });
 * console.log(hObj.every(value => typeof value === 'number')); // true
 */
HybridObject.prototype.every = function (callbackFn, thisArg) {
    const entries = this.entries();
    for (let [path, value] of entries) {
        if (!callbackFn(value, path, entries, thisArg)) {
            return false;
        }
    }
    return true;
};

/**
 * Returns a HybridObject with all entries that satisfy the provided callback function.
 * Equivalent of `Array.filter()`.
 * @param {Function} callbackFn Args: value, path, entries [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * @returns {HybridObject}
 * @example
 * const hObj = new HybridObject({
 *     a: 1,
 *     b: {
 *         bb: 2
 *     },
 *     c: 3,
 *     d: 'foo'
 * });
 * console.log(hObj.filter(value => typeof value === 'number')); // {a:1,c:3}
 */
HybridObject.prototype.filter = function (callbackFn, thisArg) {
    const filtered = new HybridObject({});
    const entries = this.entries();
    for (let [path, value] of entries) {
        if (callbackFn(value, path, entries, thisArg)) {
            filtered.set(path, value);
        }
    }
    return filtered;
};

/**
 * Returns the first element that satisfies the provided callback function.
 * Equivalent of `Array.find()`, based on the flattened version of the object.
 * @param {Function} callbackFn Args: value, path, flattenedObject [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 * @returns {*}
 * @example
 * const hObj = new HybridObject({
 *     a: 1,
 *     b: {
 *         bb: 2
 *     },
 *     c: 3,
 *     d: 'foo'
 * });
 * console.log(hObj.find(value => typeof value === 'number' && value > 1)); // 3
 */
HybridObject.prototype.find = function (callbackFn, thisArg) {
    const flat = this.flatten();
    for (let [path, value] of Object.entries(flat)) {
        if (callbackFn(value, path, flat, thisArg)) {
            return isPlainObject(value) ? new HybridObject(value) : value;
        }
    }
};

/**
 * Returns the flattend path of the first value found.
 * Equivalent of `Array.findIndex()`, based on the flattened version of the object.
 * @param {Function} callbackFn Args: value, path, flattenedObject [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
 * @returns {String|undefined}
 * @example
 * const hObj = new HybridObject({
 *     a: 1,
 *     b: {
 *         bb: 2
 *     },
 *     c: 3,
 *     d: 'foo'
 * });
 * console.log(hObj.findPath(value => typeof value === 'number' && value > 1)); // 'b.bb'
 */
HybridObject.prototype.findPath = function (callbackFn, thisArg) {
    const flat = this.flatten();
    for (let [path, value] of Object.entries(flat)) {
        if (callbackFn(value, path, flat, thisArg)) {
            return path;
        }
    }
};

/**
 * Retrieve a version of the object with all 'keys.flattened.to.paths'. This returns a regular object because its keys contain dots and it would require
 * some sort of escaping strategy to make it work with `HybridObject.get()`.
 * @returns {Object}
 * @example
 * const hObj = new HybridObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(hObj.flatten()); // {a.aa:1,b.bb:2}
 */
HybridObject.prototype.flatten = function () {
    return flattenObject(this);
};

/**
 * Equivalent of `Array.forEach()`.
 * @param {Function} callbackFn Args: value, path, entries [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * @returns {undefined}
 * @example
 * const hObj = new HybridObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * }); 
 * hObj.forEach((value, path) => console.log(value)); // {a.aa: 1, b.bb: 2}
 */
HybridObject.prototype.forEach = function (callbackFn, thisArg) {
    const entries = this.entries();
    for (let [path, value] of entries) {
        callbackFn(value, path, entries, thisArg);
    }
};

/**
 * Gets the value at path of object. 
 * - If the resolved value is undefined and `defaultValue` is provided, `defaultValue` will be returned, undefined otherwise.
 * - If the resolved value is a plain object, it will be converted to a `HybridObject`.
 * Uses Lodash's `get()` method, but without the `object` argument.
 * @param {Array|string} path The path of the property to get
 * @param {*} [defaultValue] The default value to return if the path doesn't exist
 * @see https://lodash.com/docs/#get
 * @returns {*} 
 * @example
 * const hObj = new HybridObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: function() {}
 *     }
 * });
 * console.log(hObj.get('a.aa')); // 1
 * console.log(hObj.get('b.bb')); // [Function: bb]
 * console.log(hObj.get('c.cc')); // undefined
 * console.log(hObj.get('c.cc', 'default')); // default
 * console.log(hObj.get('b.bb', () => 'default')); // [Function: bb]
 * console.log(hObj.get('a')); // {aa:1}
 */
HybridObject.prototype.get = function (path, defaultValue) {
    let value = get(this, path, defaultValue);
    return isPlainObject(value) ? new HybridObject(value) : value;
};

/**
 * Checks if path is a direct property of object.
 * Uses Lodash's `has()` method, but without the `object` argument.
 * @param {Array|string} path The path to check
 * @see https://lodash.com/docs/#has
 * @returns {Boolean} Returns true if path exists, else false.
 * @example
 * const hObj = new HybridObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: function() {}
 *     }
 * });
 * console.log(hObj.has('a.aa')); // true
 * console.log(hObj.has('c.cc')); // false
 * console.log(hObj.has('a')); // true
 */
HybridObject.prototype.has = function (path) {
    return has(this, path);
};

/**
 * Checks whether the object includes `searchElement`.
 * Equivalent of `Array.includes()`, though without the `fromIndex` argument.
 * @param {*} searchElement The value to search for
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
 * @returns {Boolean}
 * @example
 * const hObj = new HybridObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(hObj.includes(1)); // true
 * console.log(hObj.includes(3)); // false
 */
HybridObject.prototype.includes = function (searchElement) {
    return Object.values(this.flatten()).includes(searchElement);
};

/**
 * Retrieve an array of all keys at the top level of the object, equivalent to `Object.keys(hObj)`.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 * @returns {Array}
 * @example
 * const hObj = new HybridObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(hObj.keys()); // ['a','b']
 */
HybridObject.prototype.keys = function () {
    return Object.keys(this);
};

/**
 * Get the number of keys at the top level of the object.
 * Equivalent of `Array.length`, but implemented as a function.
 * @returns {Number}
 * @example
 * const hObj = new HybridObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(hObj.length()); // 2
 */
HybridObject.prototype.length = function () {
    return this.keys().length;
};

/**
 * Creates a new HybridObject populated with the results of calling a callback function on every element the original object.
 * Equivalent of `Array.map()`.
 * @param {Function} callbackFn callbackFn Args: value, path, flattenedObject [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 * @returns {HybridObject}
 * @example
 * const hObj = new HybridObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * const newHObj = hObj.map((value, path) => value * 2);
 * console.log(newHObj.get('a.aa')); // 2
 */
HybridObject.prototype.map = function (callbackFn, thisArg) {
    const mapped = {};
    const flat = this.flatten();
    for (let [path, value] of Object.entries(flat)) {
        set(mapped, path, callbackFn(value, path, flat, thisArg));
    }
    return new HybridObject(mapped);
};

/**
 * Retrieve an array with all 'keys.flattened.to.paths'
 * @returns {Array}
 * @example
 * const hObj = new HybridObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(hObj.paths()); // ['a.aa','b.bb']
 */
HybridObject.prototype.paths = function () {
    return Object.keys(this.flatten());
};

/**
 * Equivalent of Array.reduce
 * @param {Function} callbackFn Args: accumulator, value, path, flattenedObject [, thisArg]
 * @param {Object|undefined} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 * @returns {Object}
 * @example
 * const obj = {
 *     a: 1,
 *     b: 2,
 *     c: 3,
 * };
 * const result = obj.reduce((accumulator, value, path, flattenedObject) => {
 *     return accumulator + value;
 * }, 0);
 * console.log(result); // 6
 */
HybridObject.prototype.reduce = function (callbackFn, initialValue, thisArg) {
    const flat = this.flatten();
    let accumulator = initialValue;
    for (let [path, value] of Object.entries(flat)) {
        accumulator = callbackFn(accumulator, value, path, flat, thisArg);
    }
    return accumulator;
};

/**
 * Sets the value at path of object. If a portion of path doesn't exist, it will be created.
 * Arrays are created for missing index properties while objects are created for all other missing properties.
 * Uses Lodash's `set()` method, but without the `object` argument.
 * @param {Array|string} path The path of the property to set
 * @param {*} value
 * @see https://lodash.com/docs/#set
 * @returns {HybridObject}
 * @example
 * const obj = new HybridObject({
 *    a: {
 *       b: {
 *         c: 1
 *      }
 *   }
 * });
 * obj.set('a.b.c', 2);
 * obj.get('a.b.c'); // 2
 * obj.set('a.b.d', 2);
 * obj.get('a.b.d'); // 2
 * obj.set('a.b.e.f', 2);
 * obj.get('a.b.e.f'); // 2
 */
HybridObject.prototype.set = function (path, value) {
    return set(this, path, value);
};

/**
 * Tests whether at least one entry in the object passes the test implemented by the callback function.
 * Equivalent of `Array.some()`.
 * @param {Function} callbackFn Args: value, path, flattenedObject [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
 * @returns {Boolean}
 * @example
 * const obj = {
 *     a: 1,
 *     b: 2,
 *     c: 3,
 * };
 * const result = obj.some((value, path, flattenedObject) => {
 *    return value > 2;
 * });
 * console.log(result); // true
 */
HybridObject.prototype.some = function (callbackFn, thisArg) {
    const flat = this.flatten();
    for (let [path, value] of Object.entries(flat)) {
        if (callbackFn(value, path, flat, thisArg)) {
            return true;
        }
    }
    return false;
};

/**
 * Equivalent of Array.sort
 * @param {Function} [compareFn] Args: a, b
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @returns {HybridObject}
 * @example
 * const obj = {
 *     a: 1,
 *     b: 2,
 *     c: 3,
 * };
 * const sorted = obj.sort((a, b) => {
 *    return a - b;
 * });
 * console.log(sorted); // { a: 1, b: 2, c: 3 }
 * console.log(sorted.keys()); // ['a', 'b', 'c']
 * console.log(sorted.values()); // [1, 2, 3]
 */
HybridObject.prototype.sort = function (compareFn) {
    const flat = this.flatten();
    const sorted = Object.entries(flat).sort(
        ([pathA, valueA], [pathB, valueB]) => {
            if (compareFn) {
                return compareFn(valueA, valueB);
            }
            return valueA - valueB;
        }
    );
    return new HybridObject(
        sorted.reduce((accumulator, [path, value]) => {
            set(accumulator, path, value);
            return accumulator;
        }, {})
    );
};

/**
 * Convert the object to JSON
 * @param {Boolean} [pretty]
 * @returns {String}
 * @example
 * const hObj = new HybridObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(hObj.toJSON()); // {"a":{"aa":1},"b":{"bb":2}}
 * console.log(hObj.toJSON(true));
 * // {
 * //     "a": {
 * //         "aa": 1
 * //     },
 * //     "b": {
 * //         "bb": 2
 * //     }
 * // }
 */
HybridObject.prototype.toJson = function (pretty = false) {
    return JSON.stringify(this, null, pretty ? "\t" : null);
};

/**
 * Removes the property at path of object.
 * Uses Lodash's `unset()` method, but without the `object` argument.
 * @param {Array|string} path The path of the property to unset
 * @see https://lodash.com/docs/#unset
 * @returns {Boolean}
 * @example
 * const obj = new HybridObject({
 *     a: {
 *         b: {
 *             c: 1
 *         }
 * });
 * obj.unset('a.b.c');
 * obj.get('a.b.c'); // undefined
 * obj.unset('a.b.d');
 * obj.get('a.b.d'); // undefined
 */
HybridObject.prototype.unset = function (path) {
    return unset(this, path);
};

/**
 * Equivalent of Array.values, returns an array of all values
 * @returns {Array}
 */
HybridObject.prototype.values = function () {
    return Object.values(this);
};

export default HybridObject;
