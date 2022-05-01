import ElasticObject from "../ElasticObject.js";
import {
    primitives
} from "../data/data.js";

test("paths", () => {
    const eObj = new ElasticObject(primitives);
    const expected = [
        "path",
        "path.to",
        "path.to.string",
        "path.to.integer",
        "path.to.float",
        "path.to.boolean",
        "path.to.null",
        "path.to.undefined",
    ];
    expect(eObj.paths()).toStrictEqual(expected);
});
