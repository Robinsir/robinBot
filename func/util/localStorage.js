//init localStorage
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./data');
  }

//how to use ...  
//   localStorage.setItem('myFirstKey', 'myFirstValue');
//   console.log(localStorage.getItem('myFirstKey'));
module.exports = localStorage;