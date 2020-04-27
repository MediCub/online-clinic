import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext } from '../../contexts/AuthContext';
import { LoginFormValidation } from './AuthFormValidation';
import AuthFormsTitleComponent from './AuthFormsTitleComponent';
import ErrorMessageComponent from './ErrorMessageComponent';

const useStyles = makeStyles({
  root: {
    maxWidth: 360,
    background: '#f5f5f6',
    boxShadow: '0px 0px 3px 0px #ccc',
    margin: '3% auto',
    padding: 20,
  },
  formControl: {
    width: '100%',
  },
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

function LoginComponent() {
  const { signInUser, loadingState, errorState } = useContext(AuthContext);
  const history = useHistory();

  const classes = useStyles();

  const onSubmit = value => {
    signInUser(value);
  };

  const onRegisterClick = () => {
    history.push('/registrarse');
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={LoginFormValidation}
      render={({ handleSubmit }) => (
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Grid className={classes.root} item container spacing={2}>
            <ErrorMessageComponent errorState={errorState} />
            <AuthFormsTitleComponent title="Acceso" />
            <Grid item xs={12}>
              <TextField
                className={classes.formControl}
                type="email"
                size="small"
                variant="outlined"
                label="Correo"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.formControl}
                type="password"
                size="small"
                variant="outlined"
                label="Contraseña"
                name="password"
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.wrapper}>
                <Button
                  disableElevation
                  disabled={loadingState}
                  className={classes.formControl}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Acceder
                </Button>
                {loadingState && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                disableElevation
                className={classes.formControl}
                color="default"
                variant="contained"
                onClick={onRegisterClick}
              >
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
}

export default LoginComponent;
