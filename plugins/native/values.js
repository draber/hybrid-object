/**
 * Equivalent of Array.values, returns an array of all values
 * @memberof ElasticObject
 * @instance
 * @returns {Array}
 * @example
 * const obj = new ElasticObject({
 *    a: 1,
 *    b: 2
 * });
 * obj.values(); // [1, 2]
 */
const values = function () {
    return Object.values(this);
};

export default values;