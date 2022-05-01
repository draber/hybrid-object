import ElasticObject from "../ElasticObject.js";
import { primitives } from "../data/data.js";

test("values", () => {
    const eObj = new ElasticObject(primitives);
    expect(eObj.values()).toStrictEqual([primitives.path]);
});
