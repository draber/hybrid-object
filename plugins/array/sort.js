/**
 * Equivalent of Array.sort
 * @param {Function} [compareFn] Args: a, b
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @memberof ElasticObject
 * @instance
 * @returns {ElasticObject}
 * @example
 * const obj = {
 *     a: 1,
 *     b: 2,
 *     c: 3,
 * };
 * const sorted = obj.sort((a, b) => {
 *    return a - b;
 * });
 * console.log(sorted); // { a: 1, b: 2, c: 3 }
 * console.log(sorted.keys()); // ['a', 'b', 'c']
 * console.log(sorted.values()); // [1, 2, 3]
 */
const sort = function (compareFn) {
    const flat = this.flatten();
    const sorted = Object.entries(flat).sort(
        ([pathA, valueA], [pathB, valueB]) => {
            if (compareFn) {
                return compareFn(valueA, valueB);
            }
            return valueA - valueB;
        }
    );
    return this.createInstance(
        sorted.reduce((accumulator, [path, value]) => {
            set(accumulator, path, value);
            return accumulator;
        }, {})
    );
};

export default sort;