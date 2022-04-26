# Hybrid Object

The most common collection types in JavaScript are _Plain Objects_, _Arrays_, _Maps_ and _Sets_. They all have their rightful place, their advantages and shortcomings; the latter show especially on deeply nested collections. 

To set a new property on `another.deeply.nested.path` of an _Object_, you'll have to check on every step along the way if the current level exists and to create it if it doesn't. _Lodash_ is one of the libraries that with [`Lodash.get()`](https://lodash.com/docs/#get), [`Lodash.set()`](https://lodash.com/docs/#set), [`Lodash.unset()`](https://lodash.com/docs/#unset) or [`Lodash.has()`](https://lodash.com/docs/#has) offers an easy way to access object properties. It uses a `dotted.string.notation` pattern (see Lodash's [`get()`](https://lodash.com/docs/#get) docs for example). This is not to be confused with JavaScript's [Dot Notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#dot_notation).

While _Objects_ are great at storing complex data structures, they lack all those convenient functions that _Arrays_, _Maps_ or _Sets_ have. They rely on external code to perform common tasks such as looping or filtering to name but a few.

So how about building an object type that overcomes these drawbacks? This is exactly what _Hybrid Object_ is made for; a plain object with built-in _Map resp. Set_-style `set()` and `get()` functions, that support Lodash-syntax. On top of it features dozens of _Array_-style methods such as `forEach()`, `map()` or `filter()`. Finally, it includes common methods like `clone()` and `toJson()` and all of that without losing the original _Object_ functionality.

## Installation

```bash
npm i hybrid-object
```

## Usage

Below is a simple example of how to create a _Hybrid Object_. For the methods, please refer to the [full documentation](//hybrid-object.netlify.app/HybridObject.html).
    
```javascript
import HybridObject from 'hybrid-object'; // note that HybridObject is implemented as ESM and not in CJS

const hObj = new HybridObject({
    path: {
        to: {
            string: "foo",
            integer: 42
        },
    },
    another: {
        path: {
            to: {
                float: 3.14
            }
        }
    }
});
```

## Using an Hybrid Object like a regular Object

_Hybrid Objects_ are build on top of regular _Objects_ and can be used in exactly the same way. You can access the properties in the above example with either `hObj.get('path.to.string')` or `hObj.path.to.string`. You can use all static methods such as `HybridObject.keys(hObj)` or `HybridObject.values(hObj)`; the more common ones, namely `Object.keys()`, `Object.values()`, `Object.entries()` and `Object.assign()` can also be called from withing the instance as `hObj.keys()` or `hObj.values()` etc.

## Flattened version of the object
Many of the concepts of _Hybrid Objects_ are based on a flattened version of the object. The keys of this object are the paths of the properties, expressed in `dotted.string.notation`. The values are the values of these properties. These values can be of any type, excluding objects and arrays, as they would become part of the path. To distinguish between the top-level keys and values returned by `Object.keys()` resp. `Object.values()`,  and the keys and values of the flattened version, this document refers to the latter as `paths` and `finalValues`.

The above example would be represented as:

```javascript
{
    "path.to.string": "foo",
    "path.to.integer": 42,
    "another.path.to.float": 3.14
}
```

## Method overview
As described above, _Hybrid Objects_ borrow heavily from _Object_, _Array_ and _Lodash_. The following table is an overview of the available methods, and what they have been inspired by. 

The links in the first column point to this documentation, the second column to the original documentation which you might also find helpful.

| Method | External reference | Notes |
|:-------|:-------------------|:------|
| [`hObj.assign()`](//hybrid-object.netlify.app/HybridObject.html#assign) | [`Object.assign()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) | static: `HybridObject.assign(hObj, rObj)`, instance: `hObj.assign(rObj)` |
| [`hObj.clone()`](//hybrid-object.netlify.app/HybridObject.html#clone) | [`stucturedClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) | Clones the whole object |
| [`hObj.cloneEntry()`](//hybrid-object.netlify.app/HybridObject.html#cloneEntry) | [`stucturedClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) | Clones any property of the object |
| [`hObj.entries()`](//hybrid-object.netlify.app/HybridObject.html#entries) | [`Object.entries()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) | static: `HybridObject.entries(hObj)`, instance: `hObj.entries()` |
| [`hObj.every()`](//hybrid-object.netlify.app/HybridObject.html#every) | [`Array.every()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) | Identical |
| [`hObj.filter()`](//hybrid-object.netlify.app/HybridObject.html#filter) | [`Array.filter()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) | Returns a _Hybrid Object_, chain `.finalValues()` to get only the values |
| [`hObj.finalValues()`](//hybrid-object.netlify.app/HybridObject.html#finalValues)  | | Values of the flattened object |
| [`hObj.find()`](//hybrid-object.netlify.app/HybridObject.html#find)  | [`Array.find()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)  | Identical |
| [`hObj.findPath()`](//hybrid-object.netlify.app/HybridObject.html#findPath) | [`Array.findIndex()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) | Returns path in `dotted.string.notation` rather than an index |
| [`hObj.flatten()`](//hybrid-object.netlify.app/HybridObject.html#flatten) | | Flattened version of the object |
| [`hObj.forEach()`](//hybrid-object.netlify.app/HybridObject.html#forEach) | [`Array.forEach()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) | Identical |
| [`hObj.get()`](//hybrid-object.netlify.app/HybridObject.html#get)  | [`Lodash.get()`](//lodash.com/docs/#get) | Same signature, but without the first argument `object` |
| [`hObj.has()`](//hybrid-object.netlify.app/HybridObject.html#has)  | [`Lodash.has()`](//lodash.com/docs/#has) | Same signature, but without the first argument `object` |
| [`hObj.includes()`](//hybrid-object.netlify.app/HybridObject.html#includes) | [`Array.includes()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)  | Identical |
| [`hObj.keys()`](//hybrid-object.netlify.app/HybridObject.html#keys) | [`Object.keys()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) | static: `HybridObject.keys(hObj)`, instance: `hObj.keys()` |
| [`hObj.length()`](//hybrid-object.netlify.app/HybridObject.html#length) | [`Array.length()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) | In difference to `Array.length`, this is implemented as a function |
| [`hObj.map()`](//hybrid-object.netlify.app/HybridObject.html#map) | [`Array.map()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) | Identical |
| [`hObj.paths()`](//hybrid-object.netlify.app/HybridObject.html#paths)  | | Keys of the flattened object |
| [`hObj.reduce()`](//hybrid-object.netlify.app/HybridObject.html#reduce)  | [`Lodash.reduce()`](//lodash.com/docs/#reduce) | Same signature, but without the first argument `object` |
| [`hObj.set()`](//hybrid-object.netlify.app/HybridObject.html#set) | [`Lodash.set()`](//lodash.com/docs/#set)  | Same signature, but without the first argument `object` |
| [`hObj.some()`](//hybrid-object.netlify.app/HybridObject.html#some)  | [`Array.some()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) | Identical |
| [`hObj.sort()`](//hybrid-object.netlify.app/HybridObject.html#sort) | [`Array.sort()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) | Identical |
| [`hObj.toJson()`](//hybrid-object.netlify.app/HybridObject.html#toJson)  | [`JSON.stringify()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) | With boolean `pretty` argument for pretty-print |
| [`hObj.unset()`](//hybrid-object.netlify.app/HybridObject.html#unset) | [`Lodash.unset()`](//lodash.com/docs/#unset) | Same signature, but without the first argument `object` |
| [`hObj.values()`](//hybrid-object.netlify.app/HybridObject.html#values)  | [`Object.values()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) | static: `HybridObject.values(hObj)`, instance: `hObj.xalues()` |


