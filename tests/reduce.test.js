import ElasticObject from "../ElasticObject.js";
import {
    numbers
} from "./assests/data.js";

test("reduce", () => {
    const eObj = new ElasticObject(numbers);
    const initialValue = 0;
    const sumWithInitial = eObj.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
    );
    expect(sumWithInitial).toBe(21);
});

