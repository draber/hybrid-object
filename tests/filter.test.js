import ElasticObject from "../ElasticObject.js";
import {
    numbers
} from "../data/data.js";

test("filter", () => {
    const eObj = new ElasticObject(numbers);
    const expected = new ElasticObject({
        d: 4,
        e: 5,
        f: 6,
    });
    expect(eObj.filter((value) => value > 3)).toStrictEqual(expected);
});


test("filter, values only", () => {
    const eObj = new ElasticObject(numbers);
    const expected = [4, 5, 6];
    expect(eObj.filter((value) => value > 3).values()).toStrictEqual(expected);
});
