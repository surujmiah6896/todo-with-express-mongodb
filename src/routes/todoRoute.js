const express = require("express");
const todoRouter = express.Router();
const Todo = require('../Model/Todo');


// Get all todos
todoRouter.get("/all", async (req, res) => {
    // try {
    //     const todos = await Todo.find();
    //     res.status(200).json(todos);
    // } catch (error) {
    //     console.error("Error fetching todos:", error);
    //     res.status(500).json({ message: "Error fetching todos", error });
    // }
});

// Create a new todo
todoRouter.post("/", async (req, res) => {
    console.log("Request body:", req.body);

    res.send("Todo created successfully");

//   const { title, description } = req.body;
//   // Validate input
//   if (!title || !description) {
//     return res
//       .status(400)
//       .json({ message: "Title and description are required" });
//   }

//   // Create a new todo
//   const newTodo = new Todo({
//     title,
//     description,
//   });

//   try {
//     const savedTodo = await newTodo.save();
//     res.status(201).json(savedTodo);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating todo", error });
//   }
});

// Update a todo by ID
todoRouter.put("/:id", async (req, res) => {});

// Delete a todo by ID
todoRouter.delete("/:id", async (req, res) => {});


// Get a todo by ID
todoRouter.get("/:id", async (req, res) => {});

module.exports = todoRouter;