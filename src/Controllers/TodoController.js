

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
