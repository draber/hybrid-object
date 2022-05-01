/**
 * Creates a new ElasticObject populated with the results of calling a callback function on every element the original object.
 * Equivalent of `Array.map()`.
 * @param {Function} callbackFn callbackFn Args: value, path, entries [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 * @memberof ElasticObject
 * @instance
 * @returns {ElasticObject}
 * @example
 * const eObj = new ElasticObject({
 *     a: 1,
 *     b: 2
 * });
 * const newHObj = eObj.map((value, path) => value * 2);
 * console.log(newHObj.get('a')); // 2
 */
const map = function (callbackFn, thisArg) {
    const mapped = this.create({});
    const entries = this.entries();
    for (let [path, value] of entries) {
        mapped.set(path, callbackFn(value, path, entries, thisArg));
    }
    return mapped;
};

export default map;
