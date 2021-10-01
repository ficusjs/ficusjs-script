# FicusJS script loader

<img src="img/ficus-icon.svg" alt="FicusJS" width="150" align="right">

Lightweight script loader for lazy loading ES modules and ES5 scripts or both based on dynamic paths.

## Features

- Lazy load ES modules
- Lazy load ES5 scripts
- Dynamically load based on path
- Functional programming patterns
- Small footprint (1.3 KB gzipped for everything!)
- No dependencies
- Works with client-side frameworks

## Getting started

The easiest way to try out FicusJS script loader is using a simple example.

Create an `index.html` file and copy the following between the `<body>` tags.

```html
<div id="content"></div>

<script type="module">
import { loadScript } from 'https://cdn.skypack.dev/@ficusjs/script@2'
const markdownToRender = `# FicusJS script loader

Dynamically load ES modules and ES5 scripts.

- Lazy load ES modules
- Lazy load ES5 scripts
- Dynamically load based on path
- Functional programming patterns
- Small footprint (1.3 KB gzipped for everything!)
- No dependencies
- Works with client-side frameworks
`

// load the ES module for marked
loadScript('https://unpkg.com/marked@1.2.0/lib/marked.esm.js')
  .then(mod => mod.default)
  .then(marked => {
    const content = document.getElementById('content')
    content.innerHTML = marked(markdownToRender)
  })
</script>
```

> Alternatively, fork this Codepen to see it in action - [https://codepen.io/ducksoupdev/pen/abZbdbq](https://codepen.io/ducksoupdev/pen/abZbdbq)

The example imports the [marked](https://www.npmjs.com/package/marked) ES module and converts some markdown to HTML.

## Installation

FicusJS script loader can be installed in a number of ways.

### CDN

We recommend using native ES modules in the browser.

```html
<script type="module">
  import { loadScript } from 'https://cdn.skypack.dev/@ficusjs/script@2'
</script>
```

FicusJS script loader is available on [Skypack](https://www.skypack.dev/view/@ficusjs/script).

### NPM

FicusJS script loader works nicely with build tools such as Webpack or Rollup. If you are using a NodeJS tool, you can install the NPM package.

```bash
npm install @ficusjs/script
```

### Available builds

FicusJS script loader is only available as an ES module. For legacy browsers or alternative modules such as CommonJS, it is recommended to use a build tool to transpile the code.

## Documentation

See the [full documentation](https://script.ficusjs.org).

## License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

## Contributing to FicusJS script

Any kind of positive contribution is welcome! Please help us to grow by contributing to the project.

If you wish to contribute, you can work on any features you think would enhance the library. After adding your code, please send us a Pull Request.

> Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our [CODE OF CONDUCT](CODE_OF_CONDUCT.md), and the process for submitting pull requests to us.

## Support

We all need support and motivation. FicusJS is not an exception. Please give this project a ⭐️ to encourage and show that you liked it. Don't forget to leave a star ⭐️ before you move away.

If you found the library helpful, please consider [sponsoring us](https://github.com/sponsors/ficusjs).
