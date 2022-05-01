import ElasticObject from "../ElasticObject.js";
import {
    primitives
} from "../data/data.js";

test("entries", () => {
    const eObj = new ElasticObject(primitives);
    let entries = eObj.entries();
    expect(entries).toStrictEqual(Object.entries(primitives));
    expect(entries).toStrictEqual(ElasticObject.entries(primitives));
});
