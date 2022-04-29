import { has as _has } from "lodash-es";

/**
 * Checks if path is a direct property of object.
 * Uses Lodash's `has()` method, but without the `object` argument.
 * @param {Array|string} path The path to check
 * @see https://lodash.com/docs/#has
 * @returns {Boolean} Returns true if path exists, else false.
 * @memberof ElasticObject
 * @instance
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: function() {}
 *     }
 * });
 * console.log(eObj.has('a.aa')); // true
 * console.log(eObj.has('c.cc')); // false
 * console.log(eObj.has('a')); // true
 */
const has = function (path) {
    return _has(this, path);
};

export default has;