const express = require("express");
const mongoose = require("mongoose");
const todoRouter = require("./src/routes/todoRoute");
const { validateTodo } = require("./src/Request/todoValidation");

require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/todos",validateTodo, todoRouter);

app.get("/", (req, res) => {
  res.send("Wellcome to the Todo API");
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use((req, res) => {
  res.status(404).send("Not Found");  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
