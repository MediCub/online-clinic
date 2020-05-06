import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { useTreatmentsContext } from '../TreatmentsContext';
import { DialogTitleComponent } from '../../ModalComponent';
import useCustomStyles from '../../../jss/globalStyles';

function DetailsTreatmentComponent() {
  const { selected, setModalVisible } = useTreatmentsContext();
  const classes = useCustomStyles();

  const handleCloseForm = () => {
    setModalVisible(false, null);
  };
  return (
    <>
      <DialogTitleComponent onClose={handleCloseForm}>Detalles del tratamiento</DialogTitleComponent>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography>
                      Paciente:
                      {selected ? <strong>{selected.patient && selected.patient.fullname}</strong> : '-'}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className={classes.textDetailStyle}>
            <Typography>
              Medicamento: {selected ? <strong>{selected.medicine && selected.medicine.name}</strong> : '?'}
            </Typography>
            <Typography>
              Fecha inicio:{' '}
              {selected ? (
                <strong>{selected.startDate && moment(selected.startDate.toDate()).format('DD/MM/YYYY')}</strong>
              ) : (
                '?'
              )}
            </Typography>
            <Typography>
              Fecha fin:{' '}
              {selected ? (
                <strong>{selected.endDate && moment(selected.endDate.toDate()).format('DD/MM/YYYY')}</strong>
              ) : (
                '?'
              )}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disableElevation onClick={handleCloseForm}>
          aceptar
        </Button>
      </DialogActions>
    </>
  );
}
export default DetailsTreatmentComponent;
