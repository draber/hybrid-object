# Elastic Object

The most common collection types in JavaScript are _Plain Objects_, _Arrays_, _Maps_ and _Sets_. They all have their rightful place, their advantages and shortcomings; the latter show especially on deeply nested collections. 

To set a new property on `another.deeply.nested.path` of an _Object_, you'll have to check on every step along the way if the current level exists and to create it if it doesn't. _Lodash_ is one of the libraries that with [`Lodash.get()`](https://lodash.com/docs/#get), [`Lodash.set()`](https://lodash.com/docs/#set), [`Lodash.unset()`](https://lodash.com/docs/#unset) or [`Lodash.has()`](https://lodash.com/docs/#has) offers an easy way to access object properties. It uses a `dotted.string.notation` pattern (see Lodash's [`get()`](https://lodash.com/docs/#get) docs for example). This is not to be confused with JavaScript's [Dot Notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#dot_notation).

While _Objects_ are great at storing complex data structures, they lack all those convenient functions that _Arrays_, _Maps_ or _Sets_ have. They rely on external code to perform common tasks such as looping or filtering to name but a few.

So how about building an object type that overcomes these drawbacks? This is exactly what _Elastic Object_ is made for; a plain object with built-in _Map resp. Set_-style `set()` and `get()` functions, that support Lodash-syntax. On top of it features dozens of _Array_-style methods such as `forEach()`, `map()` or `filter()`. Finally, it includes common methods like `clone()` and `toJson()` and all of that without losing the original _Object_ functionality.

## Installation

```bash
npm i elastic-object
```

## Usage

Below is a simple example of how to create a _Elastic Object_. For the methods, please refer to the [full documentation](//elastic-object.netlify.app/ElasticObject.html).
    
```javascript
import ElasticObject from 'elastic-object'; // note that ElasticObject is implemented as ESM and not in CJS

const eObj = new ElasticObject({
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

## Using an Elastic Object like a regular Object

_Elastic Objects_ are build on top of regular _Objects_ and can be used in exactly the same way. You can access the properties in the above example with either `eObj.get('path.to.string')` or `eObj.path.to.string`. You can use all static methods such as `ElasticObject.keys(eObj)` or `ElasticObject.values(eObj)`; the more common ones, namely `Object.keys()`, `Object.values()`, `Object.entries()` and `Object.assign()` can also be called from withing the instance as `eObj.keys()` or `eObj.values()` etc.

## Flattened version of the object
Many of the concepts of _Elastic Objects_ are based on a flattened version of the object. The keys of this object are the paths of the properties, expressed in `dotted.string.notation`. The values are the values of these properties. These values can be of any type, excluding objects and arrays, as they would become part of the path. To distinguish between the top-level keys and values returned by `Object.keys()` resp. `Object.values()`,  and the keys and values of the flattened version, this document refers to the latter as `paths` and `finalValues`.

The above example would be represented as:

```javascript
{
    "path.to.string": "foo",
    "path.to.integer": 42,
    "another.path.to.float": 3.14
}
```

## Method overview
As described above, _Elastic Objects_ borrow heavily from _Object_, _Array_ and _Lodash_. The following table is an overview of the available methods, and what they have been inspired by. 

The links in the first column point to this documentation, the second column to the original documentation which you might also find helpful.

| Method | External reference | Notes |
|:-------|:-------------------|:------|
| [`eObj.assign()`](//elastic-object.netlify.app/ElasticObject.html#assign) | [`Object.assign()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) | static: `ElasticObject.assign(eObj, rObj)`, instance: `eObj.assign(rObj)` |
| [`eObj.clone()`](//elastic-object.netlify.app/ElasticObject.html#clone) | [`stucturedClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) | Clones the whole object |
| [`eObj.cloneEntry()`](//elastic-object.netlify.app/ElasticObject.html#cloneEntry) | [`stucturedClone()`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) | Clones any property of the object |
| [`eObj.entries()`](//elastic-object.netlify.app/ElasticObject.html#entries) | [`Object.entries()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) | static: `ElasticObject.entries(eObj)`, instance: `eObj.entries()` |
| [`eObj.every()`](//elastic-object.netlify.app/ElasticObject.html#every) | [`Array.every()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) | Identical |
| [`eObj.filter()`](//elastic-object.netlify.app/ElasticObject.html#filter) | [`Array.filter()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) | Returns a _Elastic Object_, chain `.finalValues()` to get only the values |
| [`eObj.finalValues()`](//elastic-object.netlify.app/ElasticObject.html#finalValues)  | | Values of the flattened object |
| [`eObj.find()`](//elastic-object.netlify.app/ElasticObject.html#find)  | [`Array.find()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)  | Identical |
| [`eObj.findPath()`](//elastic-object.netlify.app/ElasticObject.html#findPath) | [`Array.findIndex()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) | Returns path in `dotted.string.notation` rather than an index |
| [`eObj.flatten()`](//elastic-object.netlify.app/ElasticObject.html#flatten) | | Flattened version of the object |
| [`eObj.forEach()`](//elastic-object.netlify.app/ElasticObject.html#forEach) | [`Array.forEach()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) | Identical |
| [`eObj.get()`](//elastic-object.netlify.app/ElasticObject.html#get)  | [`Lodash.get()`](//lodash.com/docs/#get) | Same signature, but without the first argument `object` |
| [`eObj.has()`](//elastic-object.netlify.app/ElasticObject.html#has)  | [`Lodash.has()`](//lodash.com/docs/#has) | Same signature, but without the first argument `object` |
| [`eObj.includes()`](//elastic-object.netlify.app/ElasticObject.html#includes) | [`Array.includes()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)  | Identical |
| [`eObj.keys()`](//elastic-object.netlify.app/ElasticObject.html#keys) | [`Object.keys()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) | static: `ElasticObject.keys(eObj)`, instance: `eObj.keys()` |
| [`eObj.length()`](//elastic-object.netlify.app/ElasticObject.html#length) | [`Array.length()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) | In difference to `Array.length`, this is implemented as a function |
| [`eObj.map()`](//elastic-object.netlify.app/ElasticObject.html#map) | [`Array.map()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) | Identical |
| [`eObj.paths()`](//elastic-object.netlify.app/ElasticObject.html#paths)  | | Keys of the flattened object |
| [`eObj.reduce()`](//elastic-object.netlify.app/ElasticObject.html#reduce)  | [`Lodash.reduce()`](//lodash.com/docs/#reduce) | Same signature, but without the first argument `object` |
| [`eObj.set()`](//elastic-object.netlify.app/ElasticObject.html#set) | [`Lodash.set()`](//lodash.com/docs/#set)  | Same signature, but without the first argument `object` |
| [`eObj.some()`](//elastic-object.netlify.app/ElasticObject.html#some)  | [`Array.some()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) | Identical |
| [`eObj.sort()`](//elastic-object.netlify.app/ElasticObject.html#sort) | [`Array.sort()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) | Identical |
| [`eObj.toJson()`](//elastic-object.netlify.app/ElasticObject.html#toJson)  | [`JSON.stringify()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) | With boolean `pretty` argument for pretty-print |
| [`eObj.unset()`](//elastic-object.netlify.app/ElasticObject.html#unset) | [`Lodash.unset()`](//lodash.com/docs/#unset) | Same signature, but without the first argument `object` |
| [`eObj.values()`](//elastic-object.netlify.app/ElasticObject.html#values)  | [`Object.values()`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) | static: `ElasticObject.values(eObj)`, instance: `eObj.xalues()` |


