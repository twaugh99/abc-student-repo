console.log(process.env.PORT);

const express = require('express')
const app = express()
const port = 3123

let names = [];

app.use(express.static("public"))

app.get('/answer', (request, response) =>{
  let query = request.query;
  let guess = query.word;
  console.log(query);
  console.log(guess);
  if(guess == "check out my mini project number six"){
    console.log("the riddle has been solved successfully");
    response.redirect("/solved");
  } else {
    console.log("the riddle has NOT been solved correctly");
    response.redirect("/try-again");
  }
})

app.get('/name', (request, response) =>{
  let query = request.query;
  let name = query.name;
  names.push(name);
  console.log("added " + name + " to the list of winners");
  console.log("here are all the winners so far: " + names);
})

app.get('/getNames', (request, response) =>{
  console.log("the list of winner names has been requested");
  response.json( {content: names, sender: "wouldn't you like to know"})
})

app.listen(port, ()=>{
  console.log(`Listening at http://localhost:${port}`)
})
