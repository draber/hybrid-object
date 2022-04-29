/**
 * Retrieve an array with all 'keys.flattened.to.paths'
 * @memberof ElasticObject
 * @instance
 * @returns {Array}
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(eObj.paths()); // ['a.aa','b.bb']
 */
const paths = function () {
    return Object.keys(this.flatten());
};

export default paths;