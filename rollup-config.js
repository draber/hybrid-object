import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import cleanup from "rollup-plugin-cleanup";
import { terser } from "rollup-plugin-terser";


const plugins = [resolve(), commonjs(), cleanup()/*, terser()*/];

export default [
    {
        input: 'ElasticObject.js',
        output: {
            file: 'ea-output.js',
            format: 'iife',
        },
        plugins,
    },
];


