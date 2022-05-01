/**
 * Get a deep clone of an ElasticObject
 * @memberof ElasticObject
 * @instance
 * @returns {ElasticObject}
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *         b: {
 *             c: 1
 *            }
 *         }
 * });
 * const clone = eObj.clone();
 * console.log(clone.get('a.b.c')); // 1
 * console.log(eObj.get('a.b.c')); // 1
 * eObj.set('a.b.c', 2);
 * console.log(clone.get('a.b.c')); // 1
 * console.log(eObj.get('a.b.c')); // 2
 */
const clone = function () {
    return this.create(structuredClone(this));
};

export default clone;