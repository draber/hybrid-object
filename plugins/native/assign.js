/**
 * Copies all enumerable own properties from one or more source objects to the Elastic Object.
 * Instance flavor of `ElasticObject.assign()`. Note that this uses `this` as the target object.
 * @param {...Object} sources The source object(s), regular or elastic — objects containing the properties you want to apply.
 * @memberof ElasticObject
 * @instance
 * @returns {ElasticObject}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
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
    return this.create(Object.assign(this, ...sources));
};

export default assign;