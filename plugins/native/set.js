import objectPath from "object-path";

/**
 * Sets the value at path of object. If a portion of path doesn't exist, it will be created.
 * Arrays are created for missing index properties while objects are created for all other missing properties.
 * @param {Array|string} path The path of the property to set
 * @param {*} value
 * @memberof ElasticObject
 * @instance
 * @returns {ElasticObject}
 * @example
 * const obj = new ElasticObject({
 *    a: {
 *       b: {
 *         c: 1
 *      }
 *   }
 * });
 * obj.set('a.b.c', 2);
 * obj.get('a.b.c'); // 2
 * obj.set('a.b.d', 2);
 * obj.get('a.b.d'); // 2
 * obj.set('a.b.e.f', 2);
 * obj.get('a.b.e.f'); // 2
 */
const set = function (path, value) {
    return objectPath.set(this, path, value);
};

export default set;
