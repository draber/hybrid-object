import { isPlainObject } from 'is-plain-object';
import objectPath from "object-path";

/**
 * Gets the value at path of object.
 * - If the resolved value is a plain object, it will be converted to a `ElasticObject`.
 * @param {Array|string} path The path of the property to get
 * @memberof ElasticObject
 * @instance
 * @returns {*}
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
 * console.log(eObj.get('a')); // {aa:1}
 */
const get = function(path) {
    const value = objectPath.get(this, path);
    return isPlainObject(value) ? this.createInstance(value) : value;
};

export default get;