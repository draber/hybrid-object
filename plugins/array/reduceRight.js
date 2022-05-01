import { isPlainObject } from 'is-plain-object';

/**
 * Applies a function against an accumulator and each entry of the object (from right-to-left) to reduce it to a single value.
 * Equivalent of Array.reduceRight
 * @param {Function} callbackFn Args: accumulator, value, path, values [, thisArg]
 * @param {Object|undefined} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {Object|undefined} [thisArg] Value to use as `this` when executing callbackFn
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight
 * @memberof ElasticObject
 * @instance
 * @returns {*}
 * @example
 * const obj = {
 *     a: 'l',
 *     b: 't',
 *     c: 'r'
 * };
 * const result = obj.reduceRight((accumulator, value, path, values) => {
 *     return accumulator + value;
 * }, 0);
 * console.log(result); // 'rtl'
 */
 const reduceRight = function (callbackFn, initialValue, thisArg) {
    const entries = this.entries();
    let accumulator = initialValue;
    for (let [path, value] of entries.reverse()) {
        accumulator = callbackFn(accumulator, value, path, entries, thisArg);
    }
    return isPlainObject(accumulator) ? this.create(accumulator) : accumulator;
};

export default reduceRight;
