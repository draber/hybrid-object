/**
 * Equivalent of `Array.forEach()`.
 * @param {Function} callbackFn Args: value, path, entries [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * @memberof ElasticObject
 * @instance
 * @returns {undefined}
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * }); 
 * eObj.forEach((value, path) => console.log(value)); // {a.aa: 1, b.bb: 2}
 */
const forEach = function (callbackFn, thisArg) {
    const entries = this.entries();
    for (let [path, value] of entries) {
        callbackFn(value, path, entries, thisArg);
    }
};

export default forEach;