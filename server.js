const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://arunbaghe192004:06aoj9dPNK1OQJ60@cluster0.1dkqyk1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  isCompleted: { type: Boolean, default: false },
  dueDate: Date, // Optional
  category: String, // Optional
});

const Task = mongoose.model('Task', TaskSchema);

app.post('/tasks', async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const task = new Task({ title, description, dueDate, category });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.patch('/tasks/:id/complete', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (task.isCompleted) return res.status(400).json({ error: 'Task already completed' });

    task.isCompleted = true;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark task as complete' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const task = await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate, category }, { new: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});


app.put('/tasks/:id', async (req, res) => {
    try {
      const { title, description, dueDate, category } = req.body;
      if (!title) return res.status(400).json({ error: 'Title is required' });
  
      const task = await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate, category }, { new: true });
      if (!task) return res.status(404).json({ error: 'Task not found' });
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  });
  

app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
