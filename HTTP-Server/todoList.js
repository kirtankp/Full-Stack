/*
API endpoints for TodoList are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

   ---> For any other route not defined in the server return 404
*/

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3001;

var list = [];

//endpoint 1
app.get('/todos/', (req, res) => {
  if (list.length !== 0) {
    res.status(200).send(list);
  } else {
    res.status(404).send('List is Empty');
  }
});

//endpoint2
app.get('/todos/:id', (req, res) => {
  const todo = list.find(t => t.id === parseInt(req.params.id));;
  if (todo) {
    res.status(200).send(todo);
  } else {
    res.status(404).send('id not found');
  }
});

//endpoint3
app.post('/todos/', (req, res) => {
  const todo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    title: req.body.title,
    completed: req.body.completed,
    description: req.body.description
  };
  list.push(todo);
  res.status(201).send(`todo${list.length} is added to list`);
});

//endpoint4
app.put('/todos/:id', (req, res) => {
  const id = list.findIndex(t => t.id === parseInt(req.params.id));
  if (id !== -1) {
    list[id].title = req.body.title;
    list[id].completed = req.body.completed;
    list[id].description = req.body.description;
    res.status(200).send(list[id]);
  } else {
    res.status(404).send('id not found');
  }
});

//endpoint5
app.delete('/todos/:id', (req, res) => {
  const id = list.findIndex(t => t.id === parseInt(req.params.id));
  if (id !== -1) {
    list.splice(id, 1);
    res.status(200).send('todo deleted');
  } else {
    res.status(404).send('id not found');
  }
});

app.use('/', (req,res) => {
  res.status(404).send('route not defined');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});