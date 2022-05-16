import ElasticObject from "../ElasticObject.js";
import { unsorted, unsortedNested } from "../data/data.js";

test("sort w/o callback", () => {
    const eObj = new ElasticObject(unsorted);
    const expected = new ElasticObject({ c: 1, b: 2, a: 3 });
    eObj.sort();
    expect(eObj).toStrictEqual(expected);
});

test("sort w/ callback", () => {
    const eObj = new ElasticObject(unsortedNested);
    const comparator = (a, b) => a.obj.val - b.obj.val;
    const expected = new ElasticObject({
        b: {
            obj: {
                val: 3,
            }
        },
        a: {
            obj: {
                val: 5,
            }
        },
        c: {
            obj: {
                val: 7,
            }
        },
    });
    eObj.sort(comparator);
    expect(eObj).toStrictEqual(expected);
});

