"use client";

import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  TextField,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// Dark theme setup
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    background: {
      paper: "#121212",
      default: "#121212",
    },
    text: { primary: "#ffffff", secondary: "#bbbbbb" },
  },
});

// Default fallback data
const defaultRows = [
  { id: 1, name: "Apple", calories: 52, fat: 0.2, carbs: 14, protein: 0.3 },
  { id: 2, name: "Banana", calories: 96, fat: 0.3, carbs: 27, protein: 1.3 },
];

export default function CRUDDarkModeTable() {
  const [rows, setRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState({
    name: "",
    calories: "",
    fat: "",
    carbs: "",
    protein: "",
  });

  // Fetch data from backend or fallback to default data
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/items");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRows(defaultRows); // Fallback to default rows on error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add a new row
  const handleAddRow = async () => {
    try {
      const response = await fetch("http://localhost:5000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRow),
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      fetchData(); // Refresh data after successful addition
    } catch (error) {
      console.error("Error adding row:", error);
      alert("Failed to add new data. Please try again.");
    }
  };
  

  // Delete a row
  const handleDeleteRow = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      fetchData(); // Refresh data after successful deletion
    } catch (error) {
      console.error("Error deleting row:", error);
      alert("Failed to delete data. Please try again.");
    }
  };
  

  // Update a row
  const handleSaveRow = async (row) => {
    try {
      const response = await fetch(`http://localhost:5000/items/${row.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      });
      if (!response.ok) throw new Error("Failed to save row");
      setEditingRow(null);
      fetchData();
    } catch (error) {
      console.error("Error saving row:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: "100%", p: 2 }}>
        <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flex: "1 1 100%" }}>
              SQLite CRUD Table in Dark Mode
            </Typography>
          </Toolbar>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Calories</TableCell>
                  <TableCell>Fat (g)</TableCell>
                  <TableCell>Carbs (g)</TableCell>
                  <TableCell>Protein (g)</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {editingRow === row.id ? (
                        <TextField
                          value={row.name}
                          onChange={(e) =>
                            setRows((prevRows) =>
                              prevRows.map((r) =>
                                r.id === row.id
                                  ? { ...r, name: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      ) : (
                        row.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRow === row.id ? (
                        <TextField
                          value={row.calories}
                          onChange={(e) =>
                            setRows((prevRows) =>
                              prevRows.map((r) =>
                                r.id === row.id
                                  ? { ...r, calories: e.target.value }
                                  : r
                              )
                            )
                          }
                        />
                      ) : (
                        row.calories
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRow === row.id ? (
                        <TextField
                          value={row.fat}
                          onChange={(e) =>
                            setRows((prevRows) =>
                              prevRows.map((r) =>
                                r.id === row.id ? { ...r, fat: e.target.value } : r
                              )
                            )
                          }
                        />
                      ) : (
                        row.fat
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRow === row.id ? (
                        <TextField
                          value={row.carbs}
                          onChange={(e) =>
                            setRows((prevRows) =>
                              prevRows.map((r) =>
                                r.id === row.id ? { ...r, carbs: e.target.value } : r
                              )
                            )
                          }
                        />
                      ) : (
                        row.carbs
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRow === row.id ? (
                        <TextField
                          value={row.protein}
                          onChange={(e) =>
                            setRows((prevRows) =>
                              prevRows.map((r) =>
                                r.id === row.id ? { ...r, protein: e.target.value } : r
                              )
                            )
                          }
                        />
                      ) : (
                        row.protein
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {editingRow === row.id ? (
                        <>
                          <Tooltip title="Save">
                            <IconButton
                              onClick={() => handleSaveRow(row)}
                              color="primary"
                            >
                              <SaveIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <IconButton
                              onClick={() => setEditingRow(null)}
                              color="secondary"
                            >
                              Cancel
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => setEditingRow(row.id)}
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDeleteRow(row.id)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <TextField
                      placeholder="Name"
                      value={newRow.name}
                      onChange={(e) =>
                        setNewRow((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Calories"
                      value={newRow.calories}
                      onChange={(e) =>
                        setNewRow((prev) => ({ ...prev, calories: e.target.value }))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Fat"
                      value={newRow.fat}
                      onChange={(e) =>
                        setNewRow((prev) => ({ ...prev, fat: e.target.value }))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Carbs"
                      value={newRow.carbs}
                      onChange={(e) =>
                        setNewRow((prev) => ({ ...prev, carbs: e.target.value }))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Protein"
                      value={newRow.protein}
                      onChange={(e) =>
                        setNewRow((prev) => ({ ...prev, protein: e.target.value }))
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Add">
                      <IconButton onClick={handleAddRow} color="success">
                        <AddCircleIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
