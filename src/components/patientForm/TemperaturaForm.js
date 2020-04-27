import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'mui-rff';
import Typography from '@material-ui/core/Typography';

function TemperaturaForm({ classStyle }) {
  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Temperatura:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            className={classStyle.formControl}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            label="Grados Celcius"
            name="temperatureCelsiusDegree"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classStyle.formControl}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            rows={4}
            label="Nota"
            name="temperatureNote"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default TemperaturaForm;
