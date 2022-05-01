import ElasticObject from "../ElasticObject.js";
import {
    primitives
} from "../data/data.js";

test("flatten", () => {
    const eObj = new ElasticObject(primitives);
    const flattened = eObj.flatten();
    const json =
        '{"path":{"to":{"string":"string","integer":42,"float":3.14,"boolean":true,"null":null}},"path.to":{"string":"string","integer":42,"float":3.14,"boolean":true,"null":null},"path.to.string":"string","path.to.integer":42,"path.to.float":3.14,"path.to.boolean":true,"path.to.null":null}';
    expect(JSON.stringify(flattened)).toBe(json);
    expect(flattened.get("path.to.string")).toBe("string");
});

