import { esmTest } from './browser-detect/esm-test.js'

function setAttributes (element, attributes) {
  if (attributes) {
    Object.keys(attributes).forEach(k => {
      element.setAttribute(k, attributes[k])
    })
  }
}

function getCacheBuster (cache = true) {
  return cache ? '' : `?${Date.now()}`
}

function createScript (url, attributes = null, cache = true) {
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', `${url}${getCacheBuster(cache)}`)
  setAttributes(script, attributes)
  return script
}

function getAbsolutePath (href) {
  const link = document.createElement('a')
  link.href = href
  return link.href
}

function createPromise (item) {
  let dep = {}
  if (Array.isArray(item) && item.length === 2) {
    if (esmTest()) {
      dep = typeof item[0] === 'string' ? { url: item[0] } : item[0]
      if (/\.esm\.js/.test(dep.url) || dep.type === 'module') dep.attributes = { type: 'module' }
    } else {
      dep = typeof item[1] === 'string' ? { url: item[1] } : item[1]
    }
  } else {
    dep = typeof item === 'string' ? { url: item } : item
    if (/\.esm\.js/.test(dep.url) || dep.type === 'module') {
      if (esmTest()) {
        dep.attributes = { type: 'module' }
      } else {
        return Promise.reject(new Error(`Unable to load script '${dep.url}' - ES6 not supported by browser!`))
      }
    }
  }

  if (!dep.url) {
    return Promise.reject(new Error('No url given!'))
  }

  if (!window.__ficusjs__.scripts[dep.url]) {
    const promise = new Promise((resolve, reject) => {
      const handleResponse = (e) => {
        if (e.error || (e.type && e.type === 'error')) {
          reject(e.error)
        } else {
          window.__ficusjs__.scripts[dep.url].hasLoaded = true
          if (dep.attributes && dep.attributes.type && dep.attributes.type === 'module') {
            const importUrl = getAbsolutePath(dep.url)
            import(importUrl).then(m => resolve(m))
          } else {
            resolve()
          }
        }
      }
      const script = createScript(dep.url, dep.attributes, dep.cache)
      script.onerror = handleResponse
      script.onload = handleResponse
      document.body.appendChild(script)
    })
    window.__ficusjs__.scripts[dep.url] = { hasLoaded: false, promise }
    return promise
  } else {
    return window.__ficusjs__.scripts[dep.url].promise
  }
}

/**
 * Function to load one or more ES6 or ES5 scripts
 * @param {...object|Array} items The scripts to load
 * @returns {Promise} A pending promise
 * @example
 * loadScript(
 *   '/js/script1.esm.js', // ES6 module - uses *.esm.js file name convention - won't load if ES6 is not supported
 *   { url: '/js/script1.es.js', type: 'module' }, // ES6 module - uses explicit type:module - won't load if ES6 is not supported
 *   '/js/script1.js', // ES5 script
 *   [
 *     '/js/script2.esm.js', // ES6 module - uses *.esm.js file name convention
 *     '/js/script2.iife.js' // ES5 script - fallback if ES6 is not supported
 *   ],
 *   [
 *     { url: '/js/script3.es.js', type: 'module' }, // ES6 module - uses explicit type:module
 *     { url: '/js/script3.iife.js', cache: false } // ES5 script with cache disabled - fallback if ES6 is not supported
 *   ]
 * )
 */
export function loadScript (...items) {
  window.__ficusjs__ = window.__ficusjs__ || {}
  window.__ficusjs__.scripts = window.__ficusjs__.scripts || {}
  const promises = items.map(x => {
    return createPromise(x)
  })
  return Promise.all(promises).then(res => res.length === 1 ? res[0] : res)
}
