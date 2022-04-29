import test from "node:test";
import assert from "node:assert";
import ElasticObject from "../ElasticObject.js";
import console from "a-nicer-console";

const numbers = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
};

const primitives = {
    path: {
        to: {
            string: "string",
            integer: 42,
            float: 3.14,
            boolean: true,
            null: null,
            undefined: undefined,
        },
    },
};

let dbStyle = {
    a: {
        aa: {
            aaa: 1,
        },
        ab: 42,
    },
    b: {
        ba: {
            baa: 2,
        },
        bb: 43,
    },
    c: {
        ca: {
            caa: 3,
        },
        cb: 44,
    },
};

test("clone", () => {
    let original = new ElasticObject(dbStyle);
    let clone = original.clone();
    assert.deepEqual(original, clone);
    original.set("a.aa.aaa", 2);
    assert.notDeepEqual(original, clone);
});

test("cloneProperty", () => {
    let eObj = new ElasticObject(dbStyle);
    let clonedProp = eObj.cloneProperty("a.aa.aaa");
    assert.deepEqual(eObj.get("a.aa.aaa"), clonedProp);
    eObj.set("a.aa.aaa", "new value");
    assert.notDeepEqual(eObj.get("a.aa.aaa"), clonedProp);
});

test("cloneProperty vs. get", () => {
    let eObj = new ElasticObject(dbStyle);
    let getProp = eObj.get("a");
    getProp.set("aa.aaa", "new value");
    assert.deepEqual(eObj.get("a"), getProp);
});

test("entries", () => {
    let eObj = new ElasticObject(primitives);
    let entries = eObj.entries();
    assert.deepEqual(entries, Object.entries(primitives));
    assert.deepEqual(entries, ElasticObject.entries(primitives));
});

test("every", () => {
    const eObj = new ElasticObject(numbers);
    assert.equal(
        eObj.every((value) => value > 0),
        true
    );
    assert.equal(
        eObj.every((value) => value < 10),
        true
    );
    assert.equal(
        eObj.every((value) => value < 5),
        false
    );
});

test("filter", () => {
    const eObj = new ElasticObject(numbers);
    assert.deepEqual(
        eObj.filter((value) => value > 3),
        {
            d: 4,
            e: 5,
            f: 6,
        }
    );
});

test("filter, values only", () => {
    const eObj = new ElasticObject(numbers);
    assert.deepEqual(eObj.filter((value) => value > 3).values(), [4, 5, 6]);
});

test("find", () => {
    const eObj = new ElasticObject(numbers);
    assert.equal(
        eObj.find((value) => value > 3),
        4
    );
    assert.equal(
        eObj.find((value) => value < 5),
        1
    );
    assert.equal(
        eObj.find((value) => value > 100),
        undefined
    );
});

test("findPath", () => {
    const eObj = new ElasticObject(dbStyle);
    assert.equal(
        eObj.findPath((value) => value === 43),
        "b.bb"
    );
    assert.equal(
        eObj.findPath((value) => value > 50),
        undefined
    );
});

test("flatten", () => {
    const eObj = new ElasticObject(primitives);
    const expected = '{"path":{"to":{"string":"string","integer":42,"float":3.14,"boolean":true,"null":null}},"path.to":{"string":"string","integer":42,"float":3.14,"boolean":true,"null":null},"path.to.string":"string","path.to.integer":42,"path.to.float":3.14,"path.to.boolean":true,"path.to.null":null}';
    assert.deepEqual(JSON.stringify(eObj.flatten()), expected);    
});

test("forEach", () => {
    const eObj = new ElasticObject(numbers);
    let values = [];
    eObj.forEach((value) => {
        values.push(value);
    });
    assert.deepEqual(values, [1, 2, 3, 4, 5, 6]);
});

test("get", () => {
    const eObj = new ElasticObject(primitives);
    assert.equal(eObj.get("path.to.string"), "string");
    assert.equal(eObj.get("path.to.integer"), 42);
    assert.equal(eObj.get("path.to.float"), 3.14);
    assert.equal(eObj.get("path.to.boolean"), true);
    assert.equal(eObj.get("path.to.null"), null);
    assert.equal(eObj.get("path.to.undefined"), undefined);
    assert.equal(typeof eObj.get("path.to"), "object");
});

test("paths", () => {
    const eObj = new ElasticObject(primitives);
    assert.deepEqual(eObj.paths(), [
        "path",
        "path.to",
        "path.to.string",
        "path.to.integer",
        "path.to.float",
        "path.to.boolean",
        "path.to.null",
        "path.to.undefined",
    ]);
});

test("has", () => {
    const eObj = new ElasticObject(primitives);
    assert.equal(eObj.has("path"), true);
    assert.equal(eObj.has("path.to"), true);
    assert.equal(eObj.has("path.to.string"), true);
    assert.equal(eObj.has("path.to.nonExisting"), false);
});

test("includes", () => {
    const eObj = new ElasticObject(primitives);
    assert.equal(eObj.includes("string"), true);
    assert.equal(eObj.includes(true), true);
    assert.equal(eObj.includes("nonExisting"), false);
});

test("keys", () => {
    const eObj = new ElasticObject(dbStyle);
    assert.deepEqual(eObj.keys(), [
        "a",
        "b",
        "c"
    ]);
});

test("length", () => {
    let eObj = new ElasticObject(dbStyle);
    assert.equal(eObj.length(), 3);
    eObj.set("random.path", "some Value");
    assert.equal(eObj.length(), 4);
});

// test("values", () => {
//     assert.deepEqual(hoSimple.values(), [
//         "string",
//         42,
//         3.14,
//         true,
//         null,
//         undefined,
//     ]);
// });









// test("map", () => {
//     assert.deepEqual(
//         hoNumbers.map((value) => value + 3),
//         {
//             a: 4,
//             b: 5,
//             c: 6,
//             d: 7,
//             e: 8,
//             f: 9,
//         }
//     );
// });

// test("chaining", () => {
//     assert.deepEqual(
//         hoNumbers
//             .filter((value) => value > 3)
//             .filter((value) => value < 6)
//             .map((value) => value * 2),
//         {
//             d: 8,
//             e: 10,
//         }
//     );
// });

// test("set", () => {
//     let po = new ElasticObject(simple);
//     po.set("path.to.string", "overWritten");
//     po.set("path.to.new.string", "newString");
//     assert.equal(po.get("path.to.string"), "overWritten");
//     assert.equal(po.get("path.to.new.string"), "newString");
// });

// test("size", () => {
//     let po = new ElasticObject(simple);
//     assert.equal(po.size(), 1);
//     po.set("another.path", "some Value");
//     assert.equal(po.size(), 2);
// });

// test("some", () => {
//     assert.equal(
//         hoNumbers.some((value) => value > 0),
//         true
//     );
//     assert.equal(
//         hoNumbers.some((value) => value < 10),
//         true
//     );
//     assert.equal(
//         hoNumbers.some((value) => value < 5),
//         true
//     );
// });

// test("unset", () => {
//     let po = new ElasticObject(simple);
//     po.unset("path.to.string");
//     assert.equal(po.get("path.to.string"), undefined);
// });

// // // // test("complex", () => {
// // // //     assert.deepEqual(complex, {
// // // //         path: {
// // // //             to: {
// // // //                 array: [1, 2, 3],
// // // //                 object: { a: 1, b: 2 },
// // // //                 map: new Map([
// // // //                     ["a", 1],
// // // //                     ["b", 2],
// // // //                 ]),
// // // //                 set: new Set([1, 2, 3]),
// // // //                 date: new Date(),
// // // //                 regexp: /^[a-z]+$/i,
// // // //                 symbol: Symbol("a"),
// // // //                 error: new Error("error"),
// // // //                 buffer: Buffer.from("buffer"),
// // // //                 promise: Promise.resolve(42),
// // // //                 generator: function* () {
// // // //                     yield 1;
// // // //                     yield 2;
// // // //                     yield 3;
// // // //                 },
// // // //                 function: function () {
// // // //                     return 42;
// // // //                 },
// // // //                 class: class {
// // // //                     constructor() {
// // // //                         this.a = 1;
// // // //                         this.b = 2;
// // // //                     }
// // // //                 },
// // // //                 asyncFunction: async function () {
// // // //                     return 42;
// // // //                 },
// // // //                 asyncGenerator: async function* () {
// // // //                     yield 1;
// // // //                     yield 2;
// // // //                     yield 3;
// // // //                 },
// // // //             },
// // // //         },
// // // //     });
// // // // });
