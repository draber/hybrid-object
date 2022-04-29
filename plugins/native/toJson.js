/**
 * Convert the object to JSON
 * @param {Boolean} [pretty]
 * @memberof ElasticObject
 * @instance
 * @returns {String}
 * @example
 * const hObj = new ElasticObject({
 *     a: {
 *        aa: 1
 *     },
 *     b: {
 *        bb: 2
 *     }
 * });
 * console.log(hObj.toJSON()); // {"a":{"aa":1},"b":{"bb":2}}
 * console.log(hObj.toJSON(true));
 * // {
 * //     "a": {
 * //         "aa": 1
 * //     },
 * //     "b": {
 * //         "bb": 2
 * //     }
 * // }
 */
const toJson = function (pretty = false) {
    return JSON.stringify(this, null, pretty ? "\t" : null);
};

export default toJson;