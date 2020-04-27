import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHospitalContext } from '../HospitalContext';

const useStyles = makeStyles({
  buttonActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

export default function DeleteHospitalComponent() {
  const { setModalVisible, hospitalSelected, saveHospitalValues, formType } = useHospitalContext();
  const classes = useStyles();

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  const onDelete = () => {
    saveHospitalValues(hospitalSelected, formType);
    handleCancel();
  };

  return (
    <div>
      <h3>Eliminar Hopital</h3>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography>Esta seguro que desea eliminar el hospital seleccionado.</Typography>
        </Grid>
        <Grid item className={classes.buttonActions} xs={12}>
          <Button disableElevation variant="contained" size="small" onClick={handleCancel}>
            cancelar
          </Button>
          <Button disableElevation size="small" variant="contained" color="secondary" onClick={onDelete}>
            eliminar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
