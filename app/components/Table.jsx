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

  // Fetch data from backend
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/items");
    const data = await response.json();
    setRows(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add a new row
  const handleAddRow = async () => {
    const response = await fetch("http://localhost:5000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRow),
    });
    if (response.ok) {
      fetchData();
      setNewRow({ name: "", calories: "", fat: "", carbs: "", protein: "" });
    }
  };

  // Delete a row
  const handleDeleteRow = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  // Update a row
  const handleSaveRow = async (row) => {
    await fetch(`http://localhost:5000/items/${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    setEditingRow(null);
    fetchData();
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
                                r.id === row.id ? { ...r, name: e.target.value } : r
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
                        <IconButton onClick={() => handleSaveRow(row)}>
                          <SaveIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => setEditingRow(row.id)}>
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleDeleteRow(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <TextField
                      value={newRow.name}
                      onChange={(e) =>
                        setNewRow({ ...newRow, name: e.target.value })
                      }
                      placeholder="Name"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={newRow.calories}
                      onChange={(e) =>
                        setNewRow({ ...newRow, calories: e.target.value })
                      }
                      placeholder="Calories"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={newRow.fat}
                      onChange={(e) => setNewRow({ ...newRow, fat: e.target.value })}
                      placeholder="Fat"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={newRow.carbs}
                      onChange={(e) =>
                        setNewRow({ ...newRow, carbs: e.target.value })
                      }
                      placeholder="Carbs"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={newRow.protein}
                      onChange={(e) =>
                        setNewRow({ ...newRow, protein: e.target.value })
                      }
                      placeholder="Protein"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Add Row">
                      <IconButton onClick={handleAddRow}>
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
