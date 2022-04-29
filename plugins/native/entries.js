/**
 * Returns an array of the object's own enumerable string-keyed property [key, value] pairs.
 * This is modeled after the behavior of `Object.entries()` and _not_ `Array.entries()` which returns an iterator.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 * @memberof ElasticObject
 * @instance
 * @returns {Array}
 * @example
 * const hObj = new ElasticObject({
 *     a: {
 *         ab: 1
 *     },
 *     b: {
 *         bb: 2
 *     }
 * });
 * console.log(hObj.entries()); // [["a",{"ab":1}],["b",{"bb":2}]]
 */
const entries = function () {
    return Object.entries(this);
};

export default entries;