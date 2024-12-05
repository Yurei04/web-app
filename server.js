// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db"); 

const app = express();
app.use(bodyParser.json());
app.use(cors());

// API Endpoints
app.get("/items", (req, res) => {
  db.all("SELECT * FROM food_items", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post('/items', async (req, res) => {
  try {
    const { name, calories, fat, carbs, protein } = req.body;
    if (!name || !calories || !fat || !carbs || !protein) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await db.run(`INSERT INTO items (name, calories, fat, carbs, protein) VALUES (?, ?, ?, ?, ?)`, 
      [name, calories, fat, carbs, protein]);
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put("/items/:id", (req, res) => {
  const { name, calories, fat, carbs, protein } = req.body;
  const { id } = req.params;
  db.run(
    `UPDATE food_items SET name = ?, calories = ?, fat = ?, carbs = ?, protein = ? WHERE id = ?`,
    [name, calories, fat, carbs, protein, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ updated: this.changes });
      }
    }
  );
});

app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.run(`DELETE FROM items WHERE id = ?`, [id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
