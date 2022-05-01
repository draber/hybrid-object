import ElasticObject from "../ElasticObject.js";
import {
    numbers
} from "../data/data.js";

test("forEach", () => {
    const eObj = new ElasticObject(numbers);
    let values = [];
    eObj.forEach((value) => {
        values.push(value);
    });
    expect(values).toStrictEqual([1, 2, 3, 4, 5, 6]);
});

