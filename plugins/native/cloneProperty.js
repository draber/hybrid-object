import { isPlainObject } from "is-plain-object";

/**
 * Returns a deep clone of a particular property
 * @param {String} path
 * @memberof ElasticObject
 * @instance
 * @returns {*} ElasticObject if possible, otherwise the value
 * @see https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
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
    const value = structuredClone(this.get(path));
    return isPlainObject(value) ? this.create(value) : value;
};

export default cloneProperty;