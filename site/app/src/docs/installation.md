---
layout: doc.hbs
title: FicusJS script loader documentation - Installation
---
# Installation

FicusJS script loader can be installed in a number of ways.

## CDN

We recommend using native ES modules in the browser.

```html
<script type="module">
  import { loadScript } from 'https://unpkg.com/ficusjs-script?module'
</script>
```

You can browse the source of the NPM package at [cdn.jsdelivr.net/npm/ficusjs-script](https://cdn.jsdelivr.net/npm/ficusjs-script/).

FicusJS script loader is also available on [unpkg](https://unpkg.com/browse/ficusjs-script/).

## NPM

FicusJS script loader works nicely with build tools such as Webpack or Rollup. If you are using a NodeJS tool, you can install the NPM package.

```sh
npm install ficusjs-script
```

## Available builds

FicusJS script loader is only available as an ES module. For legacy browsers or alternative modules such as CommonJS, it is recommended to use a build tool to transpile the code.

The following builds are available.

- [Script](docs/script) `dist/script.js`
