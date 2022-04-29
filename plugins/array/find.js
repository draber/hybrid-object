import {isPlainObject} from "lodash-es";

/**
 * Returns the first element that satisfies the provided callback function.
 * Equivalent of `Array.find()`, based on the flattened version of the object.
 * @param {Function} callbackFn Args: value, path, flattenedObject [, thisArg]
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 * @memberof ElasticObject
 * @instance
 * @returns {*}
 * @example
 * const hObj = new ElasticObject({
 *     a: 1,
 *     b: {
 *         bb: 2
 *     },
 *     c: 3,
 *     d: 'foo'
 * });
 * console.log(hObj.find(value => typeof value === 'number' && value > 1)); // 3
 */
const find = function (callbackFn, thisArg) {
    const flat = this.flatten();
    for (let [path, value] of Object.entries(flat)) {
        if (callbackFn(value, path, flat, thisArg)) {
            return isPlainObject(value) ? this.createInstance(value) : value;
        }
    }
};

export default find;