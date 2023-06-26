/*
    Save responses(list) in files, so that even if u exit the app and run it again, the data remains (similar to databases)


    The expected API endpoints are defined below,
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

    - For any other route not defined in the server return 404
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const fs = require("fs");
const port = 3005;

function findIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return i;
    }
    return -1;
}

//endpoint 1
app.get('/todos/', (req, res) => {
    fs.readFile('./todos.json', 'utf-8', (error, data) => {
        if (error) {
            res.status(404).send('file not found');
        } else {
            res.json(JSON.parse(data));
        }
    })
});

//endpoint2
app.get('/todos/:id', (req, res) => {
    fs.readFile("./todos.json", "utf8", (error, data) => {
        if (error) {
            res.status(404).send('file not found');
        } else {
            const todos = JSON.parse(data);
            const todoIndex = findIndex(todos, parseInt(req.params.id));
            if (todoIndex === -1) {
                res.status(404).send();
            } else {
                res.json(todos[todoIndex]);
            }
        }
    });
});

//endpoint3
app.post('/todos/', (req, res) => {
    const todo = {
        id: Math.floor(Math.random() * 1000000), // unique random id
        title: req.body.title,
        completed: req.body.completed,
        description: req.body.description
    };
    fs.readFile("./todos.json", "utf8", (error, data) => {
        if (error) {
            res.status(404).send('file not found');
        } else {
            const todos = JSON.parse(data);
            todos.push(todo);
            fs.writeFile("./todos.json", JSON.stringify(todos), (error) => {
                if (error) {
                    res.status(404).send('file not found');
                } else {
                    res.status(201).json(todo);
                }
            });
        }
    });
});

//endpoint4
app.put('/todos/:id', (req, res) => {
    fs.readFile("./todos.json", "utf8", (error, data) => {
        if (error) {
            res.status(404).send('file not found');
        } else {
            const todos = JSON.parse(data);
            const todoIndex = findIndex(todos, parseInt(req.params.id));
            if (todoIndex === -1) {
                res.status(404).send();
            } else {
                const updatedTodo = {
                    id: todos[todoIndex].id,
                    title: req.body.title,
                    completed: req.body.completed,
                    description: req.body.description
                };
                todos[todoIndex] = updatedTodo;
                fs.writeFile("./todos.json", JSON.stringify(todos), (error) => {
                    if (error) {
                        throw err;
                    } else {
                        res.status(200).json(updatedTodo);
                    }
                });
            }
        }
    });
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

app.use((req, res, next) => {
    res.status(404).send('Route not found');
})

app.listen(port, () => {
    console.log(`App is running on Port ${port}`);
});
