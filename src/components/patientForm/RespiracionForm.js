import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'mui-rff';

function RespiracionForm({ classStyle }) {
  // const { register, errors } = useFormContext();
  return (
    <div className={classStyle.paper}>
      <Typography className={classStyle.titleForms} variant="subtitle1">
        Respiracion (Capnometría):
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            className={classStyle.formControl}
            name="breathingEtCO"
            type="number"
            label="EtCO2:"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: 0,
              max: 100,
            }}
            placeholder="0 - 100 mmHg"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            className={classStyle.formControl}
            name="breathingFrecuency"
            type="number"
            label="Frecuencia Respiratoria:"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: 0,
              max: 100,
            }}
            placeholder="20RPM"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            className={classStyle.formControl}
            name="breathingPI"
            type="number"
            label="Indice Perfusion:"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: 0,
              max: 100,
            }}
            placeholder="5.5 %"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default RespiracionForm;
