import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ADD_FORM_TEXT, DELETE_FORM_TEXT, EDIT_FORM_TEXT } from '../commons/globalText';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  button: {
    borderRadius: '80%',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { title = '', selected, onAdd, onEdit, onDelete } = props;

  const handleAddItem = () => {
    onAdd(ADD_FORM_TEXT);
  };

  const handleEditSelected = () => {
    onEdit(EDIT_FORM_TEXT);
  };

  const handleDeleteSelecteds = () => {
    onDelete(DELETE_FORM_TEXT);
  };

  return (
    <Toolbar
      color="primary"
      className={clsx(classes.root, {
        [classes.highlight]: selected.length > 0,
      })}
    >
      {selected.length > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {selected.length} seleccionados
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
      )}
      <IconButton variant="contained" color="primary" arial-label="add" onClick={handleAddItem}>
        <AddIcon fontSize="large" />
      </IconButton>
      {selected.length === 1 && (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleEditSelected}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      {selected.length > 0 && (
        <Tooltip title="Delete">
          <IconButton color="secondary" aria-label="delete" onClick={handleDeleteSelecteds}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      {selected.length < 1 && (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
