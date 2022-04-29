/**
 * Retrieve an array of all keys at the top level of the object, equivalent to `Object.keys(hObj)`.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 * @memberof ElasticObject
 * @instance
 * @returns {Array}
 * @example
 * const hObj = new ElasticObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(hObj.keys()); // ['a','b']
 */
const keys = function () {
    return Object.keys(this);
};

export default keys;