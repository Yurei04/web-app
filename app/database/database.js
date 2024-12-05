const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "database.sqlite"), (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        calories INTEGER,
        fat REAL,
        carbs REAL,
        protein REAL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        }
      }
    );
  }
});

module.exports = db;
