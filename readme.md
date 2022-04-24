# Hybrid Object

<p style="color:red">WIP, not ready yet!</p>

The most common collections types in JavaScript are _Plain Objects_, _Arrays_, _Maps_ and _Sets_. They all have their rightful place and their advantages, but also their shortcomings; the latter show especially on deeply nested collections. 

To set a new property on `another.deeply.nested.path` of an _Object_, you'll have to check on every step along the way if the current level exists and to create it if it doesn't. _Lodash_ is one of the libraries that with [`_.get()`](https://lodash.com/docs/#get), [`_.set()`](https://lodash.com/docs/#set), [`_.unset()`](https://lodash.com/docs/#unset) or [`_.has()`](https://lodash.com/docs/#has) offers an easy way to access object properties. It uses a `dotted.string.notation` pattern (see Lodash's [`get()`](https://lodash.com/docs/#get) docs for example). This is not to be confused with JavaScript's [Dot Notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#dot_notation).

While _Objects_ are great at storing complex data structures, they lack all those convenient functions that _Arrays_, _Maps_ or _Sets_ have. They rely on external code to perform common tasks such as looping or filtering to name but a few.

So how about building an object type thats overcomes the drawbacks of arrays and objects? This exactly what _Hybrid Objects_ are made for; a plain object with built-in _Map resp. Set_-style `set()` and `get()` functions, that support Lodash-syntax. On top of that a number of _Array_-style methods such as `forEach()`, `map()`, `filter()`.

## Installation

```bash
npm i hybrid-object
```

## Usage
    
```javascript
import HybridObject from 'hybrid-object'; // note that HybridObject is implemented as ESM and not in CJS

const hObj = new HybridObject({
    path: {
        to: {
            string: "string",
            integer: 42,
            float: 3.14
        },
    },
});
```

<!-- ## Using an Hybrid Object like a regular Object

_Hybrid Objects_ are build on top of regular _Objects_ and can be used in exactly the same way. You can access the above example with `hObj.path.to.string` or `hObj.path.to.integer`. You can use the static methods `Object.keys(hObj)` or `HybridObject.keys(hObj)`, the same is true for `values()`, `assign()` etc.

_There is one pitfall though:_ When you merge regular and hybrid objects with either `Object.assign()` or in spread syntax, you need to ensure that all arguments are hybrid objects, for instance by wrapping them into `new HybridObject()`. Otherwise, depending on which type comes in last, you may end up with a regular object. This issue can easily be overcome by using the static `HybridObject.assign()` method, which does the conversion for you. The same method is also available from within the instance, i. e. `hObj.assign()`. -->

```javascript
const hObj = new HybridObject({...});
const rObj = {...};

Object.assign(hObj, rObj); // regular Object
Object.assign(rObj, hObj); // hybrid Object
Object.assign(hObj, new HybridObject(rObj)); // hybrid Object

{...hObj, ...rObj} // regular Object
{...rObj, ...hObj} // hybrid Object
{...hObj, ...new HybridObject(rObj)} // hybrid Object

HybridObject.assign(hObj, rObj); // hybrid Object
HybridObject.assign(rObj1, rObj2); // hybrid Object
hObj.assign(rObj); // hybrid Object
```

## Flattened version of the object
Many of the concepts of _Hybrid Objects_ are based on a flattened version of the object. The keys of this object are the paths of the properties, expressed in `dotted.string.notation`. The value are the values of these properties. These values can be of any type, excluding objects and arrays, as they would become part of the path. 

There are three methods that are related to the flattened version of the object:


| Method               | Description                                                                                                                                                                             |
|:---------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `hObj.flatten()`     | returns a copy of the object with all the properties flattened                                                                                                                          |
| `hObj.paths()`       | returns an array of all the paths of the properties                                                                                                                                     |
| `hObj.finalValues()` | returns an array of all the values of the properties. <br />Not to be confused `hObj.values()` that, just like `Object.values(obj)`, returns the values at the top level of the object. |

```javascript
hObj.flatten(); // {'path.to.string': "string", 'path.to.integer': 42, 'path.to.float': 3.14}
hObj.paths(); // ["path.to.string", "path.to.integer", "path.to.float"]
hObj.finalValues(); // ["string", 42, 3.14]
```

## Accessors

Under the hood, _Hybrid Object_ uses Lodash modules for its accessors. If you are already familiar with these, the only thing you have to keep in mind that you need to skip the first argument `object` that you would need in Lodash.

| Method         | Lodash docs                                   | Notes                                      |
|:---------------|:----------------------------------------------|:-------------------------------------------|
| `hObj.get()`   | [`_.get()`](https://lodash.com/docs/#get)     | Lodash signature minus the first argument. |
| `hObj.set()`   | [`_.set()`](https://lodash.com/docs/#set)     | Lodash signature minus the first argument. |
| `hObj.unset()` | [`_.unset()`](https://lodash.com/docs/#unset) | Lodash signature minus the first argument. |
| `hObj.has()`   | [`_.has()`](https://lodash.com/docs/#has)     | Lodash signature minus the first argument. |

```javascript
hObj.has("path.to.integer"); // true
hObj.get("path.to.integer"); // 42
hObj.set("path.to.integer", 53); // hObj
hObj.get("path.to.integer"); // 53

hObj.set("another.deeply.nested.path", "new value"); // hObj
hObj.get("another.deeply.nested.path"); // "new value"
hObj.unset("another.deeply.nested.path"); // removes the property
hObj.has("another.deeply.nested.path"); // false
hObj.get("another.deeply.nested.path", "default value"); // "default value"
```

## Array-like functionality

_Hybrid Objects_ borrow a number of methods from _Arrays_. They are as similar as possible, but there are some differences. They share the signature with their counterparts, mostly a callback function and an optional `thisArg` object.

| Method            | Array docs                                                                                                              | Notes                                       |
|:------------------|:------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------|
| `hObj.every()`    | [`Array.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)         |                                             |
| `hObj.filter()`   | [`Array.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)       |                                             |
| `hObj.find()`     | [`Array.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)           |                                             |
| `hObj.findPath()` | [`Array.findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) | `dotted.string.notation` instead of integer |
| `hObj.forEach()`  | [`Array.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)     |                                             |
| `hObj.includes()` | [`Array.includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)   |                                             |
| `hObj.keys()`     | [`Array.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)           |                                             |
| `hObj.map()`      | [`Array.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)             |                                             |
| `hObj.some()`     | [`Array.some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)           |                                             |
| `hObj.length()`   | [`Array.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)         | Implemented as a function                   |
| `hObj.values()`   | [`Array.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)       | Values at the first level                   |

```javascript
hObj.every((e) => e.startsWith('x')); // false
hObj.filter((e) => typeof e === 'number'); // [42, 3.14]
hObj.find((e) => typeof e === 'number'); // 42
hObj.findPath(42); // 'path.to.integer', inspired by Array.findKey()
hObj.forEach((e) => console.log(e)); // string, 42, 3.14
hObj.keys(); // ["path"], note that this is only the top level, use `hObj.paths()` to get all the paths
hObj.map((e) => e + "-xyz"); // ["string-xyz", "42-xyz", "3.14-xyz"]
//hObj.reduce((acc, e) => acc + e, 0); // 42 + 3.14 = 55.14
hObj.some((e) => e.startsWith('x')); // true
//hObj.sort((a, b) => a - b); // [3.14, 42]
hObj.values(); // {to: {string: "string", integer: 42, float: 3.14}}, note that this is only the top level, use `hObj.finalValues()` to get all the values
```




| Method           | Inspired by...             | Notes                          |
|------------------|----------------------------|--------------------------------|
| `hObj.entries()` | `Object.entries(obj)`      |                                |
| `hObj.size()`    | `Map.size`, `Array.length` | Implemented as a function      |
| `hObj.toJson()`  | `JSON.stringify(obj)`      | With argument for pretty-print |
