const express = require("express");
const todoRouter = express.Router();
const Todo = require('../Model/Todo');
const { validateTodo } = require("../Request/todoValidation");

// Get all todos
todoRouter.get("/all", async (req, res) => {
   
});

// Create a new todo
todoRouter.post("/", validateTodo, async (req, res) => {
    const { title, description } = req.body;
    const newTodo = new Todo({
        title,
        description,
    });

    try{
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    }catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ message: "Error creating todo", error });
    }
  
});

// Update a todo by ID
todoRouter.put("/:id", async (req, res) => {});

// Delete a todo by ID
todoRouter.delete("/:id", async (req, res) => {});


// Get a todo by ID
todoRouter.get("/:id", async (req, res) => {});

module.exports = todoRouter;