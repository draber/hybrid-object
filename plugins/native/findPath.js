/**
 * Returns the flattend path of the first value found.
 * Equivalent of `Array.findIndex()`, based on the flattened version of the object.
 * @param {Function} callbackFn Args: value, path, flattenedObject [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
 * @memberof ElasticObject
 * @instance
 * @returns {String|undefined}
 * @example
 * const eObj = new ElasticObject({
 *     a: 1,
 *     b: {
 *         bb: 2
 *     },
 *     c: 3,
 *     d: 'foo'
 * });
 * console.log(eObj.findPath(value => typeof value === 'number' && value > 1)); // 'b.bb'
 */
const findPath = function (callbackFn, thisArg) {
    const flat = this.flatten();
    for (let [path, value] of Object.entries(flat)) {
        if (callbackFn(value, path, flat, thisArg)) {
            return path;
        }
    }
};

export default findPath;