"use client"

import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import alpha from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import visuallyHidden from '@mui/utils';
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ThemeProvider } from '@emotion/react';
import { TextField } from '@mui/material';

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

export default function CRUDTable() {
  const [rows, setRows] = useState({});
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState({
    name: "",
    calories: "",
    fat: "",
    carbs: "",
    protein: "",
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: "100%", p: 2}}>
        <Paper sx={{ width: "100%", mb: 2, p: 2 }}></Paper>
          <Toolbar>
            
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
                                r.id === row.id ? { ...r, calories: e.target.value } : r
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
                        <IconButton onClick={() => handleSaveRow(row.id)}>
                          <SaveIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => handleEditRow(row.id)}>
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleDeleteRow(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Add New Row */}
                <TableRow>
                  <TableCell>
                    <TextField
                      placeholder="Name"
                      value={newRow.name}
                      onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Calories"
                      value={newRow.calories}
                      onChange={(e) =>
                        setNewRow({ ...newRow, calories: e.target.value })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Fat"
                      value={newRow.fat}
                      onChange={(e) => setNewRow({ ...newRow, fat: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Carbs"
                      value={newRow.carbs}
                      onChange={(e) => setNewRow({ ...newRow, carbs: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Protein"
                      value={newRow.protein}
                      onChange={(e) =>
                        setNewRow({ ...newRow, protein: e.target.value })
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={handleAddRow}>
                      <AddCircleIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>

            </Table>
          </TableContainer>
      </Box>
    </ThemeProvider>
  )

}

