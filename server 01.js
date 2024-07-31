// var fs = require('fs');
// var os = require('os');
var _ = require('lodash')

// var user = os.userInfo();
// console.log(user)
// console.log(user.username)

// fs.appendFile('./greeting.txrt', 'Hi ' + user.username + '! \n', 
//   () =>{
//     console.log('File appemded')
//   }
// );

// function add(a,b) {
//   return a+ b;
// }

// var add = function(a, b) {
//   return a+b;
// }

// var add = (a,b) => {
//   return a+b;
// }

// var add = (a,b) => a+b;

// function printFunction(total) {
//   console.log('callback function: total is: ' + total);
// }

// var add = (a,b, callbackFunction) => {
//   var total = a+b;
//   console.log('total is: '+total)
//   callbackFunction(total);
//   return total;
// }

// const result = add(5,4, printFunction);
// console.log(result);

// (function temp() {
//   console.log('temp here')
// })()

// var notes = require('./notes.js')
// console.log('notes data: ' + notes.addNum(5, 3))

var list = ['2', '2', 2,1,2,'prakash', 'prakash', 'javed','rajes', 0, 4];

console.log(_.uniq(list))
console.log(_.isString(true))