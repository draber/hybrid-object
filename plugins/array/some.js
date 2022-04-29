/**
 * Tests whether at least one entry in the object passes the test implemented by the callback function.
 * Equivalent of `Array.some()`.
 * @param {Function} callbackFn Args: value, path, flattenedObject [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
 * @memberof ElasticObject
 * @instance
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
const some = function (callbackFn, thisArg) {
    const flat = this.flatten();
    for (let [path, value] of Object.entries(flat)) {
        if (callbackFn(value, path, flat, thisArg)) {
            return true;
        }
    }
    return false;
};

export default some;