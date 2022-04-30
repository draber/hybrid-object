import objectPath from "object-path";

/**
 * Checks if path is a direct property of object.
 * @param {Array|string} path The path to check
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
    return typeof objectPath.get(this, path) !== 'undefined';
};

export default has;