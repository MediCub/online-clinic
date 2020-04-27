import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { AuthContext } from '../contexts/AuthContext';

const useStyles = makeStyles(theme => ({
  navigation: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2),
      fontSize: '0.4rem',
    },
    '& > *': {
      textTransform: 'none',
      fontSize: '0.7rem',
    },
  },
}));

export default function NavigationComponent() {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();
  const handleClickReporte = () => {
    history.push('/paciente/form');
  };

  const handleClickPacientes = () => {
    history.push('/pacientes');
  };

  const handleClickHospital = () => {
    history.push('/hospitales');
  };

  const handleClickProfiles = () => {
    history.push('/perfiles');
  };

  return (
    <>
      {currentUser && (
        <Container className={classes.navigation}>
          <div>
            <Button disableElevation color="inherit" onClick={handleClickReporte}>
              Reporte
            </Button>
            <Button disableElevation color="inherit" onClick={handleClickPacientes}>
              Pacientes
            </Button>
            <Button disableElevation color="inherit" onClick={handleClickProfiles}>
              Perfiles
            </Button>
            <Button disableElevation color="inherit" onClick={handleClickHospital}>
              Hospitales
            </Button>
          </div>
        </Container>
      )}
    </>
  );
}
