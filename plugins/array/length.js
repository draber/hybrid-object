/**
 * Get the number of keys at the top level of the object.
 * Equivalent of `Array.length`, but implemented as a function.
 * @memberof ElasticObject
 * @instance
 * @returns {Number}
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(eObj.length()); // 2
 */
const length = function () {
    return this.keys().length;
};

export default length;