const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

mongoose.connect('mongodb+srv://sourabh:18jan2002@cluster1.bw6g0pq.mongodb.net/Registration', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('Failed to connect to MongoDB', err));
const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Create Todo model
const Todo = mongoose.model('Todo', todoSchema);

// Routes
// Get all todos
app.get('/api/v1/alltodo', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ data: todos });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Create a new todo
app.post('/api/v1/todo', async (req, res) => {
  const { todo } = req.body;
  try {
    const newTodo = new Todo({ todo });
    await newTodo.save();
    res.status(201).json({ message: 'Todo added successfully', data: newTodo });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

// Update a todo
app.put('/api/v1/todo/:id', async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { todo }, { new: true });
    res.status(200).json({ message: 'Todo updated successfully', data: updatedTodo });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete a todo
app.delete('/api/v1/todo/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Get complete todos
app.get('/api/v1/completetodo', async (req, res) => {
  try {
    const completedTodos = await Todo.find({ completed: true });
    res.status(200).json({ data: completedTodos });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch completed todos' });
  }
});

// Get incomplete todos
app.get('/api/v1/incompletetodo', async (req, res) => {
  try {
    const incompleteTodos = await Todo.find({ completed: false });
    res.status(200).json({ data: incompleteTodos });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch incomplete todos' });
  }
});

// Delete all todos
app.delete('/api/v1/deleteall', async (req, res) => {
  try {
    await Todo.deleteMany({});
    res.status(200).json({ message: 'All todos deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todos' });
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});