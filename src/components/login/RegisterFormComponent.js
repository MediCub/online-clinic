import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmailFieldComponent from '../fields/EmailFieldComponent';
import NameFieldComponent from '../fields/NameFieldComponent';
import LastNameFieldComponent from '../fields/LastNameFieldComponent';
import PhoneFieldComponent from '../fields/PhoneFieldComponent';
import PasswordFieldComponent from '../fields/PasswordFieldComponent';
import PasswordConfirmFieldComponent from '../fields/PasswordConfirmFieldComponent';
import { AuthContext } from '../../contexts/AuthContext';
import { RegisterFormValidation } from './AuthFormValidation';
import AuthFormsTitleComponent from './AuthFormsTitleComponent';
import ErrorMessageComponent from './ErrorMessageComponent';

const useStyles = makeStyles(() => ({
  registerContainer: {
    maxWidth: 370,
    padding: 20,
    background: '#f5f5f6',
    boxShadow: '0px 0px 3px 0px #ccc',
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
}));

function RegisterFormComponent() {
  const { signUpUser, loadingState, errorState } = useContext(AuthContext);
  const classes = useStyles();

  const onSubmit = values => {
    signUpUser(values);
  };

  return (
    <div className={classes.registerContainer}>
      <AuthFormsTitleComponent title="Registro" />
      <ErrorMessageComponent errorState={errorState} />
      <Form
        validate={RegisterFormValidation}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <NameFieldComponent classes={classes} />
              </Grid>
              <Grid item xs={12}>
                <LastNameFieldComponent classes={classes} />
              </Grid>
              <Grid item xs={12}>
                <PhoneFieldComponent classes={classes} />
              </Grid>
              <Grid item xs={12}>
                <EmailFieldComponent classes={classes} />
              </Grid>
              <Grid item xs={12}>
                <PasswordFieldComponent classes={classes} />
              </Grid>
              <Grid item xs={12}>
                <PasswordConfirmFieldComponent classes={classes} />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.wrapper}>
                  <Button
                    disableElevation
                    type="submit"
                    className={classes.formControl}
                    variant="contained"
                    color="primary"
                    disabled={loadingState}
                  >
                    Registrarse
                  </Button>
                  {loadingState && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </div>
  );
}

export default RegisterFormComponent;
