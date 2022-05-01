import { isPlainObject } from "is-plain-object";

/**
 * Executes a user-supplied "reducer" callback function on each entry of the object, in order, 
 * passing in the return value from the calculation on the preceding entry. The final result of 
 * running the reducer across all entries of the object is a single value.
 * Equivalent of Array.reduce
 * @param {Function} callbackFn Args: accumulator, value, path, values [, thisArg]
 * @param {Object|undefined} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 * @memberof ElasticObject
 * @instance
 * @returns {*}
 * @example
 * const obj = {
 *     a: 1,
 *     b: 2,
 *     c: 3,
 * };
 * const result = obj.reduce((accumulator, value, path, values) => {
 *     return accumulator + value;
 * }, 0);
 * console.log(result); // 6
 */
const reduce = function (callbackFn, initialValue, thisArg) {
    const entries = this.entries();
    let accumulator = initialValue;
    for (let [path, value] of entries) {
        accumulator = callbackFn(accumulator, value, path, entries, thisArg);
    }
    return isPlainObject(accumulator) ? this.create(accumulator) : accumulator;
};

export default reduce;