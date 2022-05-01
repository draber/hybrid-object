import { isPlainObject } from "is-plain-object";

/**
 * Returns the first element that satisfies the provided callback function.
 * Equivalent of `Array.find()`.
 * @param {Function} callbackFn Args: value, path, entries [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 * @memberof ElasticObject
 * @instance
 * @returns {*}
 * @example
 * const eObj = new ElasticObject({
 *     a: 1,
 *     b: {
 *         bb: 2
 *     },
 *     c: 3,
 *     d: 'foo'
 * });
 * console.log(eObj.find(value => typeof value === 'number' && value > 1)); // 3
 */
const find = function (callbackFn, thisArg) {
    const entries = this.entries();
    for (let [path, value] of entries) {
        if (callbackFn(value, path, entries, thisArg)) {
            return isPlainObject(value) ? this.create(value) : value;
        }
    }
};

export default find;