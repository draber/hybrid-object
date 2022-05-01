import ElasticObject from "../ElasticObject.js";
import {
    primitives
} from "../data/data.js";

test("unset", () => {
    const eObj = new ElasticObject(primitives);
    eObj.unset("path.to.string");
    expect(eObj.get("path.to.string")).toBeUndefined();
});
