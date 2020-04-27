import React, { useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { EDIT_FORM_TEXT } from '../../../commons/globalText';
import UserFieldComponent from '../../fields/UserFieldComponent';
import HospitalFieldComponent from '../../fields/HospitalFieldComponent';
import { useProfilesContext } from '../ProfilesContext';
import NameFieldComponent from '../../fields/NameFieldComponent';
import LastNameFieldComponent from '../../fields/LastNameFieldComponent';
import PhoneFieldComponent from '../../fields/PhoneFieldComponent';
import PatientsFieldComponent from '../../fields/PatientFieldsComponent';
import RoleFieldComponent from '../../fields/RoleFieldComponent';
import { getDoctorByIdAction } from '../reducers/ProfileActions';
import { getRoleByIdAction } from '../../fields/roles/reducers/RoleActions';
import { getHospitalByIdAction } from '../../hospital/reducers/HospitalActions';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
  headerStyle: {
    color: '#6c6c6c',
  },
  formControl: {
    width: '100%',
  },
});

function AddOrEditProfilesComponent({ title }) {
  const { profileSelected, saveProfileValues, formType, setModalVisible, getProfilesList } = useProfilesContext();
  const classes = useStyles();

  useEffect(() => {
    return () => {
      getProfilesList({});
    };
  }, [getProfilesList]);

  const onSubmit = async ({ user, ...values }) => {
    saveProfileValues(
      {
        ...values,
        ...(values.birthday ? { birthday: moment(values.birthday).toDate() } : {}),
        ...(values.doctor ? { doctor: await getDoctorByIdAction(values.doctor) } : {}),
        ...(values.role ? { role: await getRoleByIdAction(values.role) } : {}),
        ...(values.hospital ? { hospital: await getHospitalByIdAction(values.hospital) } : {}),
      },
      formType
    );
    setModalVisible(false, null);
  };

  const handleCancel = () => {
    setModalVisible(false, null);
  };

  return (
    <div className={classes.root}>
      <div className={classes.headerStyle}>
        <h4>{title}</h4>
      </div>
      <Form
        initialValues={
          formType === EDIT_FORM_TEXT &&
          profileSelected && {
            ...profileSelected,
            ...(profileSelected.user ? { user: profileSelected.user.email } : {}),
            ...(profileSelected.role ? { role: profileSelected.role.id } : {}),
            ...(profileSelected.doctor ? { doctor: profileSelected.doctor.id } : {}),
            ...(profileSelected.hospital ? { hospital: profileSelected.hospital.id } : {}),
            ...(profileSelected.birthday ? { birthday: profileSelected.birthday.toDate() } : {}),
          }
        }
        onSubmit={onSubmit}
        // validate={ValidateDoctorForm}
        render={({ handleSubmit, values }) => {
          return (
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {formType === EDIT_FORM_TEXT && <Field required name="id" type="hidden" component="input" />}
                <Grid item xs={12} sm={12} md={12}>
                  <NameFieldComponent classes={classes} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <LastNameFieldComponent classes={classes} />
                </Grid>
                <Grid item xs={12}>
                  <PhoneFieldComponent classes={classes} />
                </Grid>
                {values && values.role === 'patient' && <PatientsFieldComponent classes={classes} />}
                {values && values.role === 'doctor' && (
                  <Grid item xs={12}>
                    <HospitalFieldComponent classes={classes} />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <UserFieldComponent classes={classes} disabled />
                </Grid>
                <Grid item xs={12}>
                  <RoleFieldComponent classes={classes} />
                </Grid>
                <Grid item container xs={12} justify="space-evenly">
                  <Button disableElevation variant="contained" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button disableElevation variant="contained" type="submit" color="primary">
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      />
    </div>
  );
}

export default AddOrEditProfilesComponent;
