/**
 * Returns an array of the object's own enumerable string-keyed property [key, value] pairs.
 * Instance flavor of `ElasticObject.entries()`. Note that this uses `this` instead of an argument.
 * Not to be confused with `Array.entries()` which returns an iterator rather than an array.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 * @memberof ElasticObject
 * @instance
 * @returns {Array}
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *         ab: 1
 *     },
 *     b: {
 *         bb: 2
 *     }
 * });
 * console.log(eObj.entries()); // [["a",{"ab":1}],["b",{"bb":2}]]
 */
const entries = function () {
    return Object.entries(this);
};

export default entries;