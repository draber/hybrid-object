import ElasticObject from "../ElasticObject.js";
import {
    numbers
} from "../data/data.js";

test("map", () => {
    const eObj = new ElasticObject(numbers);
    const expected = new ElasticObject({
        a: 4,
        b: 5,
        c: 6,
        d: 7,
        e: 8,
        f: 9,
    });
    expect(eObj.map((value) => value + 3)).toStrictEqual(expected);
});
