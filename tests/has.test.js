import ElasticObject from "../ElasticObject.js";
import {
    primitives
} from "../data/data.js";

test("has", () => {
    const eObj = new ElasticObject(primitives);
    expect(eObj.has("path")).toBe(true);
    expect(eObj.has("path.to")).toBe(true);
    expect(eObj.has("path.to.null")).toBe(true);
    expect(eObj.has("path.to.nonExisting")).toBe(false);
});

