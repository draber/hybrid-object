/**
 * Equivalent of Array.reduce
 * @param {Function} callbackFn Args: accumulator, value, path, flattenedObject [, thisArg]
 * @param {Object|undefined} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 * @memberof ElasticObject
 * @instance
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
const reduce = function (callbackFn, initialValue, thisArg) {
    const flat = this.flatten();
    let accumulator = initialValue;
    for (let [path, value] of Object.entries(flat)) {
        accumulator = callbackFn(accumulator, value, path, flat, thisArg);
    }
    return accumulator;
};

export default reduce;