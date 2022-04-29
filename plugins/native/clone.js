/**
 * Get a deep clone of an ElasticObject
 * @memberof ElasticObject
 * @instance
 * @returns {ElasticObject}
 * @example
 * const hObj = new ElasticObject({
 *     a: {
 *         b: {
 *             c: 1
 *            }
 *         }
 * });
 * const clone = hObj.clone();
 * console.log(clone.get('a.b.c')); // 1
 * console.log(hObj.get('a.b.c')); // 1
 * hObj.set('a.b.c', 2);
 * console.log(clone.get('a.b.c')); // 1
 * console.log(hObj.get('a.b.c')); // 2
 */
const clone = function () {
    return this.createInstance(structuredClone(this));
};

export default clone;