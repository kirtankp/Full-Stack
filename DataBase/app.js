const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // You can change the port as per your preference

// Middleware
app.use(bodyParser.json());

// MongoDB connection
//mongodb+srv://Kirtankp:cluster0123@cluster0.rlpkw8i.mongodb.net/
mongoose.connect('mongodb+srv://Kirtankp:cluster0123@cluster0.rlpkw8i.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a schema and model for the name collection
const nameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const NameModel = mongoose.model('Name', nameSchema);

// Routes
app.post('/api/names', async(req, res) => {
  const name = req.body.name;
  const newName = new NameModel({ name });

  try {
    const savedName = await newName.save();
    res.status(201).json({ message: 'Name saved successfully', name: savedName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save name' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
