import { deleteProperty } from "dot-prop";

/**
 * Removes the property at path of object.
 * @param {Array|string} path The path of the property to unset
 * @memberof ElasticObject
 * @instance
 * @returns {Boolean}
 * @example
 * const obj = new ElasticObject({
 *     a: {
 *         b: {
 *             c: 1
 *         }
 * });
 * obj.unset('a.b.c');
 * obj.get('a.b.c'); // undefined
 * obj.unset('a.b.d');
 * obj.get('a.b.d'); // undefined
 */
const unset = function (path) {
    return deleteProperty(this, path);
};

export default unset;
