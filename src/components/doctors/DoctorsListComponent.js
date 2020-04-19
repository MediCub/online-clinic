import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import EnhancedTableHead from '../EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolbar';
import { useDoctorsContext } from '../../contexts/DoctorsContext';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Apellidos' },
  { id: 'birthday', numeric: true, disablePadding: false, label: 'Fecha de nacimiento' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Telefono' },
  { id: 'hospitalId', numeric: false, disablePadding: false, label: 'Hospital' },
];

const useStyles = makeStyles(theme => {
  return {
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    largeCells: {
      maxWidth: 230,
    },
    textCells: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    pagination: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: 10,
    },
  };
});

export default function DoctorsListComponent() {
  const history = useHistory();
  const { doctors, getListDoctors, selectDoctors } = useDoctorsContext();
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getListDoctors({ limit: rowsPerPage, page });
  }, [rowsPerPage, page]);

  useEffect(() => {
    selectDoctors(selected);
  }, [selected]);

  const handleRowsPerPage = ev => {
    setRowsPerPage(parseInt(ev.target.value, 10));
  };

  const handleNextPage = () => {
    setPage({ next: doctors[doctors.length - 1] });
  };

  const handlePrevPage = () => {
    setPage({ prev: doctors[0] });
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = doctors.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };
  const isSelected = name => selected.indexOf(name) !== -1;

  const handleAddDoctorButon = () => {
    history.push('/doctores/adicionar');
  };

  const handleEditDoctorButon = () => {
    history.push('/doctores/editar');
  };

  const handleDelDoctorButon = () => {
    history.push('/doctores/eliminar');
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          title="Lista de doctores"
          selected={selected}
          onAdd={handleAddDoctorButon}
          onEdit={handleEditDoctorButon}
          onDelete={handleDelDoctorButon}
        />
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size="small" aria-label="enhanced table">
            <EnhancedTableHead
              headCells={headCells}
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={doctors.length}
            />
            <TableBody>
              {doctors.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                    </TableCell>
                    <TableCell className={classes.largeCells}>
                      <Tooltip title={row.name} arrow placement="top">
                        <Typography className={classes.textCells}>{row.name}</Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={classes.largeCells}>
                      <Typography className={classes.textCells}>{row.address}</Typography>
                    </TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.maxDoctors}</TableCell>
                    <TableCell align="center">{row.maxPatients}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.pagination}>
          <FormControl>
            <IconButton size="small" onClick={handlePrevPage}>
              <ArrowBackIosIcon />
            </IconButton>
          </FormControl>
          <FormControl>
            <IconButton size="small" onClick={handleNextPage}>
              <ArrowForwardIosIcon />
            </IconButton>
          </FormControl>
          <FormControl>
            <Select
              value={rowsPerPage}
              onChange={handleRowsPerPage}
              className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Paper>
    </div>
  );
}
