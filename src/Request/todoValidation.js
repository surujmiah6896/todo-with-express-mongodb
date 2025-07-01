
// declaration of TodoValidation object
const TodoValidation = {}



TodoValidation.validateTodo = (req, res, next) => {
    const { title, description } = req.body;

    // Check if title are strings
    if (typeof title !== 'string') {
        return res.status(400).json({ message: "Title must be strings" });
    }

    // Check if description is a string
    if (typeof description !== 'string') {
        return res.status(400).json({ message: "Description must be a string" });
    }

    // Check if title and description are within length limits
    if (title.length < 3 || title.length > 100) {
        return res.status(400).json({ message: "Title must be between 3 and 100 characters" });
    }

    if (description.length < 5 || description.length > 500) {
        return res.status(400).json({ message: "Description must be between 5 and 500 characters" });
    }

    // Check if title and description are not empty
    if (!title.trim() || !description.trim()) {
        return res.status(400).json({ message: "Title and description cannot be empty" });
    }

    next();
}

//todoId validation
TodoValidation.validateTodoId = (req, res, next) => {
    const todoId = req.params.id;

    // Check if todoId is a valid MongoDB ObjectId
    if (!todoId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid Todo ID format" });
    }

    next();
}
// Export the TodoValidation object
module.exports = TodoValidation;