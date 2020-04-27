import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useProfilesContext } from '../ProfilesContext';

const useStyles = makeStyles({
  buttonActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

export default function DeleteProfilesComponent() {
  const { setModalVisible, profileSelected, saveProfileValues, formType, getProfilesList } = useProfilesContext();
  const classes = useStyles();

  useEffect(() => {
    return () => {
      getProfilesList({});
    };
  }, [getProfilesList]);

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  const onDelete = () => {
    saveProfileValues(profileSelected, formType);
    handleCancel();
  };

  return (
    <div>
      <h3>Eliminar Perfile</h3>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography>Esta seguro que desea eliminar el perfile seleccionado.</Typography>
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
