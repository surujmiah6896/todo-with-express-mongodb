

//object
const TodoController = {};

// Import the Todo model
const Todo = require('../Model/Todo');

// Get all todos
TodoController.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos, { message: "Todos fetched successfully" });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Error fetching todos", error });
  }
};

// Filter todos by completed status
TodoController.filterTodos = async (req, res) => {
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
}

// Create a new todo
TodoController.createTodo = async (req, res) => {
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
  
}

