/**
 * Checks whether all entries satisfy the provided callback function.
 * Equivalent of `Array.every()`.
 * @param {Function} callbackFn Args: value, path, entries [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
 * @memberof ElasticObject
 * @instance
 * @returns {Boolean}
 * @example
 * const eObj = new ElasticObject({
 *     a: 1,
 *     b: 2,
 *     c: 3
 * });
 * console.log(eObj.every(value => typeof value === 'number')); // true
 */
const every = function (callbackFn, thisArg) {
    const entries = this.entries();
    for (let [path, value] of entries) {
        if (!callbackFn(value, path, entries, thisArg)) {
            return false;
        }
    }
    return true;
};

export default every;