const express = require("express");
const router = express.Router();


// Get all todos
router.get("/", async (req, res) => {

});


// Create a new todo
router.post("/", async (req, res) => {
    const { title, description } = req.body;
    // Validate input
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }
    
    // Create a new todo
    const newTodo = new Todo({
        title,
        description,
    });
    
    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: "Error creating todo", error });
    }
});