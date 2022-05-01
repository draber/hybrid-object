import { hasProperty } from "dot-prop";

/**
 * Checks if path is a direct property of object.
 * @param {Array|string} path The path to check
 * @returns {Boolean} Returns true if path exists, else false.
 * @memberof ElasticObject
 * @instance
 * @see https://www.npmjs.com/package/dot-prop#readme
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(eObj.has('a.aa')); // true
 * console.log(eObj.has('c.cc')); // false
 * console.log(eObj.has('a')); // true
 */
const has = function (path) {
    return hasProperty(this, path);
};

export default has;