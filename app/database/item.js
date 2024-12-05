const db = require("./database");

const getItems = (callback) => {
  db.all("SELECT * FROM items", [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};


const addItem = (item, callback) => {
  const { name, calories, fat, carbs, protein } = item;
  db.run(
    `INSERT INTO items (name, calories, fat, carbs, protein) VALUES (?, ?, ?, ?, ?)`,
    [name, calories, fat, carbs, protein],
    function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID });
      }
    }
  );
};

const updateItem = (id, item, callback) => {
  const { name, calories, fat, carbs, protein } = item;
  db.run(
    `UPDATE items SET name = ?, calories = ?, fat = ?, carbs = ?, protein = ? WHERE id = ?`,
    [name, calories, fat, carbs, protein, id],
    function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    }
  );
};

const deleteItem = (id, callback) => {
  db.run(`DELETE FROM items WHERE id = ?`, [id], function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

module.exports = { getItems, addItem, updateItem, deleteItem };
