import { deleteProperty } from "dot-prop";

/**
 * Removes the property at path of object.
 * @param {Array|string} path The path of the property to unset
 * @memberof ElasticObject
 * @instance
 * @returns {Boolean}
 * @see https://www.npmjs.com/package/dot-prop#readme
 * @example
 * const obj = new ElasticObject({
 *     a: {
 *         b: {
 *             c: 1
 *         }
 * });
 * obj.unset('a.b.c');
 * obj.get('a.b.c'); // undefined
 */
const unset = function (path) {
    return deleteProperty(this, path);
};

export default unset;
