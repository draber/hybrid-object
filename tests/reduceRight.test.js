import ElasticObject from "../ElasticObject.js";
import {
    ltr,
} from "../data/data.js";

test("reduceRight", () => {
    const eObj = new ElasticObject(ltr);
    const result = eObj.reduceRight((accumulator, value) => accumulator + value, '');
    const expected = 'rtl';
    expect(result).toBe(expected);
});