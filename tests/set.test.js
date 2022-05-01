import ElasticObject from "../ElasticObject.js";
import {
    primitives
} from "../data/data.js";

test("set", () => {
    const eObj = new ElasticObject(primitives);
    eObj.set("path.to.string", "overWritten");
    expect(eObj.get("path.to.string")).toBe("overWritten");
});
