/**
 * Returns a deep clone of a particular property
 * @param {String} path
 * @memberof ElasticObject
 * @instance
 * @returns {*}
 * @example
 * const eObj = new ElasticObject({
 *     a: {
 *         b: {
 *             c: 1
 *            }
 *         }
 * });
 * const clone = eObj.cloneProperty('a.b');
 * console.log(clone.get('a.b')); // { c: 1 }
 * console.log(eObj.get('a.b')); // { c: 1 }
 * eObj.set('a.b', 2);
 * console.log(clone.get('a.b')); // { c: 1 }
 * console.log(eObj.get('a.b')); // 2
 */
const cloneProperty = function (path) {
    return structuredClone(this.get(path));
};

export default cloneProperty;