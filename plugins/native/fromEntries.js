/**
 * Transforms a list of key-value pairs into an Elastic Object.
 * Instance flavor of `ElasticObject.fromEntries()`.
 * @param {Iterable} iterable An iterable such as Array or Map or other objects implementing the iterable protocol.
 * @memberof ElasticObject
 * @instance
 * @returns {ElasticObject}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
 * @example
 * const entries = new Map([
 *     ['foo', 'bar'],
 *     ['baz', 42]
 * ]);
 * const obj = Object.fromEntries(entries);
 * console.log(obj); // ElasticObject { foo: 'bar', baz: 42 }
 */
const fromEntries = function (iterable) {
    return this.create(Object.fromEntries(iterable));
};

export default fromEntries;