// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db"); // Import the SQLite3 database connection

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

app.post("/items", (req, res) => {
  const { name, calories, fat, carbs, protein } = req.body;
  db.run(
    `INSERT INTO food_items (name, calories, fat, carbs, protein) VALUES (?, ?, ?, ?, ?)`,
    [name, calories, fat, carbs, protein],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
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

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM food_items WHERE id = ?`, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ deleted: this.changes });
    }
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
