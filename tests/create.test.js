import ElasticObject from "../ElasticObject.js";
import {
    numbers
} from "./assests/data.js";

test("create", () => {
    const eObj1 = new ElasticObject();
    const eObj2 = eObj1.create(numbers);
    expect(eObj2.constructor.name).toBe("ElasticObject");
});