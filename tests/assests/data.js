// mock data
export const numbers = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
};

export const primitives = {
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

export const dbStyle = {
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

export const plugins = {
    methodA: function () {
        return this.f;
    },
    methodB: function () {
        return this.baz;
    },
    methodC: function () {
        return 'c';
    }
};

export const entryMap = new Map([
    ["foo", "bar"],
    ["baz", 42],
]);
