const express = require("express");
const todoRouter = express.Router();
const Todo = require('../Model/Todo');
const { validateTodo, validateTodoId } = require("../Request/todoValidation");
const {
    getAllTodos,
    filterTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodoById
} = require("../Controllers/TodoController");

// Get all todos
todoRouter.get("/all", getAllTodos);

//filter todos by completed status
todoRouter.get("/filter", filterTodos);

// Create a new todo
todoRouter.post("/", validateTodo, createTodo);

// Update a todo by ID
todoRouter.put("/:id", validateTodo, updateTodo);

// Delete a todo by ID
todoRouter.delete("/:id", validateTodoId, deleteTodo);

// Get a todo by ID
todoRouter.get("/:id", validateTodoId, getTodoById);



module.exports = todoRouter;