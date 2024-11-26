"use client"

import * as React from 'react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
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
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ThemeProvider } from '@emotion/react';

//Add Dark Theme here later

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
            </Table>
          </TableContainer>
      </Box>
    </ThemeProvider>
  )

}

