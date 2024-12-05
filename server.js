// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { getItems, addItem, updateItem, deleteItem } = require("./app/database/item");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files if needed

// Get all items
app.get("/api/items", (req, res) => {
  getItems((err, items) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch items" });
    } else {
      res.json(items);
    }
  });
});

// Add a new item
app.post("/api/items", (req, res) => {
  addItem(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to add item" });
    } else {
      res.json({ id: result.id });
    }
  });
});

// Update an item
app.put("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  updateItem(id, req.body, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to update item" });
    } else {
      res.sendStatus(200);
    }
  });
});

// Delete an item
app.delete("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  deleteItem(id, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete item" });
    } else {
      res.sendStatus(200);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
