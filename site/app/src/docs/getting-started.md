---
layout: doc.hbs
title: FicusJS script loader documentation - Getting started
---
# Getting started

The easiest way to try out FicusJS script loader is using a simple example.

Create an `index.html` file and copy the following between the `<body>` tags.

```html
<div id="content"></div>

<script type="module">
import { loadScript } from 'https://unpkg.com/ficusjs-script?module'
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

The example creates a set of page components, a page navigation component and a new router using hash mode.
