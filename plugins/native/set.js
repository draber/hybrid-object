import { setProperty } from "dot-prop";

/**
 * Sets the value at path of object. If a portion of path doesn't exist, it will be created.
 * Arrays are created for missing index properties while objects are created for all other missing properties.
 * @param {Array|string} path The path of the property to set
 * @param {*} value
 * @memberof ElasticObject
 * @instance
 * @returns {ElasticObject}
 * @see https://www.npmjs.com/package/dot-prop#readme
 * @example
 * const obj = new ElasticObject({
 *    a: {
 *       b: {
 *         c: 1
 *      }
 *   }
 * });
 * obj.set('a.b.c', 2); // ElasticObject { a: { b: { c: 2 } } }
 * obj.get('a.b.c'); // 2
 * obj.set('a.b.d', 2); // ElasticObject { a: { b: { c: 2, d: 2 } } }
 * obj.get('a.b.d'); // 2
 * obj.set('a.b.e.f', 2); // ElasticObject { a: { b: { c: 2, d: 2, e: { f: 2 } } } }
 * obj.get('a.b.e.f'); // 2
 */
const set = function (path, value) {
    setProperty(this, path, value);
    return this;
};

export default set;
