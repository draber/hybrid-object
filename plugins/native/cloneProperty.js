/**
 * Returns a deep clone of a particular property
 * @param {String} path
 * @memberof ElasticObject
 * @instance
 * @returns {*}
 * @example
 * const hObj = new ElasticObject({
 *     a: {
 *         b: {
 *             c: 1
 *            }
 *         }
 * });
 * const clone = hObj.cloneProperty('a.b');
 * console.log(clone.get('a.b')); // { c: 1 }
 * console.log(hObj.get('a.b')); // { c: 1 }
 * hObj.set('a.b', 2);
 * console.log(clone.get('a.b')); // { c: 1 }
 * console.log(hObj.get('a.b')); // 2
 */
const cloneProperty = function (path) {
    return structuredClone(this.get(path));
};

export default cloneProperty;