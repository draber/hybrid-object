/**
 * Returns a ElasticObject with all entries that satisfy the provided callback function.
 * Equivalent of `Array.filter()`.
 * @param {Function} callbackFn Args: value, path, entries [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * @memberof ElasticObject
 * @instance
 * @returns {ElasticObject}
 * @example
 * const eObj = new ElasticObject({
 *     a: 1,
 *     b: {
 *         bb: 2
 *     },
 *     c: 3,
 *     d: 'foo'
 * });
 * console.log(eObj.filter(value => typeof value === 'number')); // {a:1,c:3}
 */
const filter = function (callbackFn, thisArg) {
    const filtered = this.createInstance({});
    const entries = this.entries();
    for (let [path, value] of entries) {
        if (callbackFn(value, path, entries, thisArg)) {
            filtered.set(path, value);
        }
    }
    return filtered;
};

export default filter;