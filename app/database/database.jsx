// db.js (No need for JSX, as this is backend logic)
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Connect to SQLite3 database
const dbPath = path.resolve(__dirname, "data.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite3 database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS food_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        calories INTEGER,
        fat REAL,
        carbs INTEGER,
        protein REAL
      )`
    );
  }
});

module.exports = db;
