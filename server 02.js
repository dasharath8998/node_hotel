const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/khichadi', (req, res) => {
  res.send('Serving you khichdi in short time sir.')
})

app.get('/idli', (req, res) => { 
  var customer_idli = {
    "name": "rava idli",
    "size": "10 cm",
    "is_sambhar": false
  }
  res.send(customer_idli) 
});

app.post('/items', (req, res)=>{
  console.log('triggered');
  res.send('data saved to database');
});

app.listen(3000, () => console.log('server is up now'))


// const jsonString = '{"name": "ajay", "age":30, "city": "New york"}';
// const jsonObj = JSON.parse(jsonString)

// console.log(jsonObj.name)

// const stringJson = JSON.stringify(jsonObj)
// console.log(stringJson)

// console.log(typeof stringJson)