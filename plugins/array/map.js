/**
 * Creates a new ElasticObject populated with the results of calling a callback function on every element the original object.
 * Equivalent of `Array.map()`.
 * @param {Function} callbackFn callbackFn Args: value, path, flattenedObject [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 * @memberof ElasticObject
 * @instance
 * @returns {ElasticObject}
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * const newHObj = eObj.map((value, path) => value * 2);
 * console.log(newHObj.get('a.aa')); // 2
 */
const map = function (callbackFn, thisArg) {
    const mapped = {};
    const flat = this.flatten();
    for (let [path, value] of Object.entries(flat)) {
        set(mapped, path, callbackFn(value, path, flat, thisArg));
    }
    return this.createInstance(mapped);
};

export default map;
