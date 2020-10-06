(function (document) {
  var injector = document.querySelector('#injector')
  var para = document.createElement('p')
  para.setAttribute('id', 'postcode')
  para.textContent = 'Postcode ES5'
  injector.appendChild(para)
})(document)
