# Hybrid Object

_HybridObject_ is a regular plain object with the addition of many of the functions known from _Arrays_, _Sets_, and _Maps_.
It supports value access in `dotted.string.notation`, similar, though not identical to [`Lodash.get()`](https://lodash.com/docs/#get).

## Dotted string notation

Setting properties in objects can be a tedious task. If you want set a new property on `another.deeply.nested.path`, you'll have to check on every step along the way if the current level exists and to create it if it doesn't.

Take the object below for example:

```javascript
const someObject = {
    path: {
        to: {
            string: "string",
            integer: 42,
            float: 3.14,
            boolean: true,
            fn: () => {
                return true;
            }
        },
    },
}
```
 With `dotted.string.notation` you can do this in a single line:

```javascript
someObject.set("another.deeply.nested.path", "new value");
```
Retrieving or deleting a property is just as easy:

```javascript
someObject.get("another.deeply.nested.path"); // "new value"
someObject.delete("another.deeply.nested.path"); // removes the property
```

This notation is nothing new, _Lodash_, for instance, lets you do that as well. With _HybridObject_ you no longer rely on an external library, it's a regular object with all the goodies built in.

## Array, Map and Set functionality 

In addition to the standard object functionality, _HybridObject_ implements a number of functions from Arrays, Maps and Sets.

| Function            | Equivalent of...       | Notes                     |
|---------------------|------------------------|---------------------------|
| `obj.clone()`       | `structuredClone(obj)` |                           |
| `obj.delete()`      | `Map\|Set.delete()`    |                           |
| `obj.entries()`     | `Object.entries(obj)`  |                           |
| `obj.every()`       | `Array.every()`        |                           |
| `obj.filter()`      | `Array.every()`        |                           |
| `obj.find()`        | `Array.find()`         |                           |
| `obj.findPath()`    | `Array.findIndex()`    |                           |
| `obj.forEach()`     | `Array.forEach()`      |                           |
| `obj.get()`         | `Map\|Set.get()`       |                           |
| `obj.has()`         | `Map\|Set.has()`       |                           |
| `obj.includes()`    | `Array.includes()`     |                           |
| `obj.keys()`        | `Object.keys(obj)`     |                           |
| `obj.map()`         | `Array.map()`          |                           |
| `obj.set()`         | `Map.set()`            |                           |
| `obj.size()`        | `Map\|Set.size`        | Implemented as a function |
| `obj.some()`        | `Array.some()`         |                           |
| `obj.toJson()`      | `JSON.stringify(obj)`  |                           |
| `obj.values()`      | `Object.values(obj)`   |                           |
| `obj.finalValues()` | n/a                    |                           |
| `obj.flatten()`     | n/a                    |                           |
| `obj.fullPaths()`   | n/a                    |                           |
| `obj.paths()`       | n/a                    |                           |
