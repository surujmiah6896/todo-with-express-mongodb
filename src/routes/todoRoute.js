const express = require("express");
const todoRouter = express.Router();
const Todo = require('../Model/Todo');
const { validateTodo } = require("../Request/todoValidation");

// Get all todos
todoRouter.get("/all", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos,{message: "Todos fetched successfully"});
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: "Error fetching todos", error });
    }
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
        res.status(201).json({data: savedTodo, status: true, message: "Todo created successfully" });
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