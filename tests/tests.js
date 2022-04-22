import test from "node:test";
import assert from "node:assert";
import { simple, numbers, objects } from "./data.js";
import HybridObject from "../HybridObject.js";

let hoSimple = new HybridObject(simple);
let hoNumbers = new HybridObject(numbers);

test("clone", () => {
    let original = new HybridObject(simple);
    let clone = original.clone();
    assert.deepEqual(original, clone);
    original.set("a", 1);
    assert.notDeepEqual(original, clone);
});

test("every", () => {
    assert.equal(
        hoNumbers.every((value) => value > 0),
        true
    );
    assert.equal(
        hoNumbers.every((value) => value < 10),
        true
    );
    assert.equal(
        hoNumbers.every((value) => value < 5),
        false
    );
});

test("filter", () => {
    assert.deepEqual(
        hoNumbers.filter((value) => value > 3),
        {
            d: 4,
            e: 5,
            f: 6,
        }
    );
});

test("find", () => {
    assert.equal(
        hoNumbers.find((value) => value > 3),
        4
    );
    assert.equal(
        hoNumbers.find((value) => value > 10),
        undefined
    );
});

test("findPath", () => {
    assert.equal(
        hoNumbers.findPath((value) => value > 3),
        "d"
    );
    assert.equal(
        hoNumbers.findPath((value) => value > 10),
        undefined
    );
});

test("paths", () => {
    let hoCollections = new HybridObject({
        a: [
            1,
            2,
            {
                b: [3, new Map([["c", 4]])],
            },
        ],
    });
    assert.deepEqual(hoCollections.paths(), [
        "a.[0]",
        "a.[1]",
        "a.[2].b.[0]",
        "a.[2].b.[1]",
    ]);
});

test("flatten", () => {
    assert.deepEqual(hoSimple.flatten(), {
        "path.to.string": "string",
        "path.to.integer": 42,
        "path.to.float": 3.14,
        "path.to.boolean": true,
        "path.to.null": null,
        "path.to.undefined": undefined,
    });
});

test("values", () => {
    assert.deepEqual(hoSimple.values(), [
        "string",
        42,
        3.14,
        true,
        null,
        undefined,
    ]);
});

test("forEach", () => {
    let values = [];
    hoNumbers.forEach((value) => {
        values.push(value);
    });
    assert.deepEqual(values, [1, 2, 3, 4, 5, 6]);
});

test("get", () => {
    assert.equal(hoSimple.get("path.to.string"), "string");
    assert.equal(hoSimple.get("path.to.integer"), 42);
    assert.equal(hoSimple.get("path.to.float"), 3.14);
    assert.equal(hoSimple.get("path.to.boolean"), true);
    assert.equal(hoSimple.get("path.to.null"), null);
    assert.equal(hoSimple.get("path.to.undefined"), undefined);
    assert.equal(typeof hoSimple.get("path.to"), "object");
});

test("has", () => {
    assert.equal(hoSimple.has("path"), true);
    assert.equal(hoSimple.has("path.to"), true);
    assert.equal(hoSimple.has("path.to.string"), true);
    assert.equal(hoSimple.has("path.to.nonExisting"), false);
});

test("includes", () => {
    assert.equal(hoSimple.includes("string"), true);
    assert.equal(hoSimple.includes(true), true);
    assert.equal(hoSimple.includes("nonExisting"), false);
});

test("map", () => {
    assert.deepEqual(
        hoNumbers.map((value) => value + 3),
        {
            a: 4,
            b: 5,
            c: 6,
            d: 7,
            e: 8,
            f: 9,
        }
    );
});

test("chaining", () => {
    assert.deepEqual(
        hoNumbers
            .filter((value) => value > 3)
            .filter((value) => value < 6)
            .map((value) => value * 2),
        {
            d: 8,
            e: 10,
        }
    );
});

test("set", () => {
    let po = new HybridObject(simple);
    po.set("path.to.string", "overWritten");
    po.set("path.to.new.string", "newString");
    assert.equal(po.get("path.to.string"), "overWritten");
    assert.equal(po.get("path.to.new.string"), "newString");
});

test("size", () => {
    let po = new HybridObject(simple);
    assert.equal(po.size(), 1);
    po.set("another.path", "some Value");
    assert.equal(po.size(), 2);
});

test("some", () => {
    assert.equal(
        hoNumbers.some((value) => value > 0),
        true
    );
    assert.equal(
        hoNumbers.some((value) => value < 10),
        true
    );
    assert.equal(
        hoNumbers.some((value) => value < 5),
        true
    );
});

test("unset", () => {
    let po = new HybridObject(simple);
    po.unset("path.to.string");
    assert.equal(po.get("path.to.string"), undefined);
});

// // // test("complex", () => {
// // //     assert.deepEqual(complex, {
// // //         path: {
// // //             to: {
// // //                 array: [1, 2, 3],
// // //                 object: { a: 1, b: 2 },
// // //                 map: new Map([
// // //                     ["a", 1],
// // //                     ["b", 2],
// // //                 ]),
// // //                 set: new Set([1, 2, 3]),
// // //                 date: new Date(),
// // //                 regexp: /^[a-z]+$/i,
// // //                 symbol: Symbol("a"),
// // //                 error: new Error("error"),
// // //                 buffer: Buffer.from("buffer"),
// // //                 promise: Promise.resolve(42),
// // //                 generator: function* () {
// // //                     yield 1;
// // //                     yield 2;
// // //                     yield 3;
// // //                 },
// // //                 function: function () {
// // //                     return 42;
// // //                 },
// // //                 class: class {
// // //                     constructor() {
// // //                         this.a = 1;
// // //                         this.b = 2;
// // //                     }
// // //                 },
// // //                 asyncFunction: async function () {
// // //                     return 42;
// // //                 },
// // //                 asyncGenerator: async function* () {
// // //                     yield 1;
// // //                     yield 2;
// // //                     yield 3;
// // //                 },
// // //             },
// // //         },
// // //     });
// // // });
