/**
 * Copies all enumerable own properties from one or more source objects to the Hybrid Object.
 * Not to be confused with the eponymous static `ElasticObject.assign()` method.
 * @param {...Object} sources The source object(s) — objects containing the properties you want to apply.
 * @memberof ElasticObject
 * @instance
 * @returns {ElasticObject}
 * @example
 * const eObj = new ElasticObject({
 *     a: 1,
 *     b: 2
 * });
 * const source1 = {
 *     b: 4,
 *     c: 5
 * }
 * const source2 = {
 *     d: 6,
 *     e: 7
 * }
 * console.log(eObj.assign(source1, source2)); // ElasticObject { a: 1, b: 4, c: 5, d: 6, e: 7 }
 */
const assign = function (...sources) {
    return Object.assign(this, ...sources);
};

export default assign;