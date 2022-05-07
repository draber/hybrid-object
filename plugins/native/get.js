import isPlainObject from "whats-the-type/isPlainObject.js";
import { getProperty } from "dot-prop";

/**
 * Gets the value at path of object. If the resolved value is a plain object, it will be converted to a `ElasticObject`.
 * Check https://www.npmjs.com/package/dot-prop#readme for an example of how to escape dots in keys with `\\`
 * @param {Array|string} path The path of the property to get
 * @memberof ElasticObject
 * @instance
 * @returns {*}
 * @see https://www.npmjs.com/package/dot-prop#readme
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: function() {}
 *     }
 * });
 * console.log(eObj.get('a.aa')); // 1
 * console.log(eObj.get('b.bb')); // [Function: bb]
 * console.log(eObj.get('c.cc')); // undefined
 * console.log(eObj.get('c.cc', 'default')); // default
 * console.log(eObj.get('b.bb', () => 'default')); // [Function: bb]
 * console.log(eObj.get('a')); // { aa: 1 }
 */
const get = function (path) {
    const value = getProperty(this, path);
    return isPlainObject(value) ? this.create(value) : value;
};

export default get;
