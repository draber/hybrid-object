import { unset as _unset } from "lodash-es";

/**
 * Removes the property at path of object.
 * Uses Lodash's `unset()` method, but without the `object` argument.
 * @param {Array|string} path The path of the property to unset
 * @see https://lodash.com/docs/#unset
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
    return _unset(this, path);
};

export default unset;