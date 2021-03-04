---
layout: doc.hbs
title: FicusJS script loader documentation
---
# Script loader

For lazy loading ES6 modules and ES5 scripts or both based on dynamic paths.

## Third-party libraries

There is a wealth of libraries available via CDNs and NPM packages.

### NPM packages

NPM is a package manager primarily used for NodeJS. However, it is commonly used to distribute packages that work across environments - NodeJS and browsers.

It is important to check if a particular package is compatible with browsers. ES5 and ES6 libraries are often distributed for browser use alongside NodeJS.

You can use a package within the browser by loading the file it distributes by copying it to a path the browser can access.
Alternatively, you can use the NPM package CDN named [Unpkg](https://unpkg.com/). [Unpkg](https://unpkg.com/) is a fast, CDN for everything on NPM. Use it to quickly and easily load any file from any package using a URL like `unpkg.com/:package@:version/:file`

To use the [marked](https://www.npmjs.com/package/marked) package which provides an ES6 module:

```js
import { loadScript } from 'https://cdn.skypack.dev/@ficusjs/script'

// ES6 module - uses *.esm.js file name convention
// this script won't load if ES6 is not supported
loadScript('https://unpkg.com/marked@1.1.1/lib/marked.esm.js')

// // ES6 module - uses explicit type: 'module'
// this script won't load if ES6 is not supported
loadScript({
  url: 'https://unpkg.com/marked@1.1.1/lib/marked.esm.js',
  type: 'module'
})
```

To use the [marked](https://www.npmjs.com/package/marked) package which provides an ES5 script:

```js
loadScript('https://unpkg.com/marked@1.1.1/marked.min.js')
```

## How to load scripts

Lazy loading scripts can be used with the [FicusJS script loader](https://router.ficusjs.org/) where dynamic loading of views and outlets is needed.

### `loadScript` function

Using a native ES6 import `import()` to resolve a script, only works with static strings. If you want to use dynamic paths to scripts based on configuration,
the `loadScript` function can load ES6 modules, ES5 scripts or both.

You can load single or multiple scripts.

```js
import { loadScript } from 'https://cdn.skypack.dev/@ficusjs/script'

// load single script
loadScript('/js/script1.esm.js')

// load multiple scripts
loadScript(
  '/js/script1.esm.js', // ES6 module - uses *.esm.js file name convention - won't load if ES6 is not supported
  { url: '/js/script1.es.js', type: 'module' }, // ES6 module - uses explicit type:module - won't load if ES6 is not supported
  '/js/script1.js', // ES5 script
  [
    '/js/script2.esm.js', // ES6 module - uses *.esm.js file name convention
    '/js/script2.iife.js' // ES5 script - fallback if ES6 is not supported
  ],
  [
    { url: '/js/script3.es.js', type: 'module' }, // ES6 module - uses explicit type:module
    { url: '/js/script3.iife.js', cache: false } // ES5 script with cache disabled - fallback if ES6 is not supported
  ]
)
```

#### Router example

An example of using `loadScript` in a route.

```js
import { loadScript } from 'https://cdn.skypack.dev/@ficusjs/script'
import { createRouter } from 'https://cdn.skypack.dev/@ficusjs/router'

// use the loadScript to load an ES6 module for a route
{
  path: '',
  action () {
    const pathToLoad = './views/home.esm.js' // some dynamic path
    return loadScript(pathToLoad).then(() => `home-page`)
  }
}
```

#### ES6 modules

Using the `loadScript` function to load ES6 modules can be done in two ways:

1. Using file name convention of `*.esm.js`
2. Using an object to specify the type is module and optionally disable caching

Loading ES6 modules is used to import bindings which are exported by the module.

```js
import { loadScript } from 'https://cdn.skypack.dev/@ficusjs/script'

// using the file name convention of *.esm.js
loadScript('./views/home.esm.js')
  .then(mod => {
    // access the exported named module binding
    console.log(mod.myExportedVariable)

    // access the default exported binding
    console.log(mod.default)
  })

// using an object to specify the type is module
loadScript({ url: './views/home.js', type: 'module' })
  .then(({ myExportedVariable }) => {
    // access the exported named module binding
    console.log(myExportedVariable)
  })

// using an object to specify the type is module and disabling the caching of the script
loadScript({ url: './views/home.js', type: 'module', cache: false })
  .then(mod => {
    // access the default exported binding
    console.log(mod.default)
  })

// loading multiple scripts
loadScript(
  './views/home.esm.js',
  './views/profile.esm.js',
  './views/list.esm.js',
)
  .then(mods => {
    // access the exported named module binding from home.esm.js
    console.log(mods[0].myExportedVariable)

    // access the exported named module binding from profile.esm.js
    console.log(mods[1].myExportedVariable)

    // access the exported named module binding from list.esm.js
    console.log(mods[2].myExportedVariable)
  })

// using the await keyword
let module = await loadScript('./views/home.esm.js')
```

#### ES6 modules with ES5 fallback for older browsers

Using the `loadScript` function to load ES6 modules with an ES5 fallback will detect if the browser supports ES6 and then automatically fallback to loading the ES5 script if not supported.

To use this feature, you need to pass a two-item `Array` - the first item is the ES6 module and the second item is the ES5 fallback script:

```js
import { loadScript } from 'https://cdn.skypack.dev/@ficusjs/script'

// load scripts based on file names
loadScript(
  [
    '/views/home.esm.js', // ES6 module - uses *.esm.js file name convention
    '/views/home.iife.js' // ES5 script - fallback if ES6 is not supported
  ]
)
  .then(mod => {
    // access the exported named module variables
    console.log(mod.myExportedVariable)

    // access the default exported variable
    console.log(mod.default)
  })

// load scripts based on objects
loadScript(
  [
    { url: '/views/home.js', type: 'module' }, // ES6 module - uses explicit type of module
    { url: '/views/home.iife.js', cache: false } // ES5 script with cache disabled - fallback if ES6 is not supported
  ]
)
  .then(mod => {
    // access the exported named module variables
    console.log(mod.myExportedVariable)

    // access the default exported variable
    console.log(mod.default)
  })

// using the await keyword
let module = await loadScript(
  [
    '/views/home.esm.js', // ES6 module - uses *.esm.js file name convention
    '/views/home.iife.js' // ES5 script - fallback if ES6 is not supported
  ]
)
```

#### ES5 scripts

Using the `loadScript` function to load ES5 scripts can be done in two ways:

1. Using the path to the script
2. Using an object to optionally disable caching

```js
import { loadScript } from 'https://cdn.skypack.dev/@ficusjs/script'

// using the file name convention of *.esm.js
loadScript('./views/home.iife.js')

// using an object to disable the caching of the script
loadScript({ url: './views/home.iife.js', cache: false })
```
