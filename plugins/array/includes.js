/**
 * Checks whether the object includes `searchElement`.
 * Equivalent of `Array.includes()`, though without the `fromIndex` argument. Like its array counterpart, it con only search for primitive values, not for objects.
 * @param {*} searchElement The value to search for
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
 * @memberof ElasticObject
 * @instance
 * @returns {Boolean}
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(eObj.includes(1)); // true
 * console.log(eObj.includes(3)); // false
 */
const includes = function (searchElement) {
    return this.values().includes(searchElement);
};

export default includes;