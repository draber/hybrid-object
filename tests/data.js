// mock data for tests

export const simple = {
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

export const objects = {
    path: {
        to: {
            array: [1, 2, 3],
            object: { a: 1, b: 2 },
            map: new Map([
                ["a", 1],
                ["b", 2],
            ]),
            set: new Set([1, 2, 3]),
            date: new Date(),
            regexp: /^[a-z]+$/i,
            symbol: Symbol("a"),
            error: new Error("error"),
            buffer: Buffer.from("buffer"),
            promise: Promise.resolve(42),
            generator: function* () {
                yield 1;
                yield 2;
                yield 3;
            },
            function: function () {
                return 42;
            },
            class: class {
                constructor() {
                    this.a = 1;
                    this.b = 2;
                }
            },
            asyncFunction: async function () {
                return 42;
            },
            asyncGenerator: async function* () {
                yield 1;
                yield 2;
                yield 3;
            },
        },
    },
};

export const numbers = {
    a:1,
    b:2,
    c:3,
    d:4,
    e:5,
    f:6,
}
