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

//filter todos by completed status
todoRouter.get("/filter", async (req, res) => {
    const { completed } = req.query;
    if (completed === undefined) {
        return res.status(400).json({ message: "Completed status is required" });
    }
    const isCompleted = completed === 'true';
    try {
        const todos = await Todo.find({ completed: isCompleted });
        res.status(200).json({ todos, message: "Todos fetched successfully" });
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
todoRouter.put("/:id",validateTodo, async (req, res) => {
  const todoId = req.params.id;
  const { title, description, completed } = req.body;
  // update method one
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res
      .status(200)
      .json({ data: updatedTodo, message: "Todo updated successfully" });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Error updating todo", error });
  }
  
});

// Delete a todo by ID
todoRouter.delete("/:id", async (req, res) => {
    const todoId = req.params.id;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "Error deleting todo", error });
    }
});

// Get a todo by ID
todoRouter.get("/:id", async (req, res) => {
    // Assuming req.params.id is the ID of the todo
    const todoId = req.params.id;
    // Here you would typically fetch the todo from the database using the ID
    const todo = await Todo.findById(todoId);
    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }else{
        return res.status(200).json({todo, message: "Todo fetched successfully" });
    } 
});



module.exports = todoRouter;