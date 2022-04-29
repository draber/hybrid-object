/**
 * Checks whether the object includes `searchElement`.
 * Equivalent of `Array.includes()`, though without the `fromIndex` argument.
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
    return Object.values(this.flatten()).includes(searchElement);
};

export default includes;