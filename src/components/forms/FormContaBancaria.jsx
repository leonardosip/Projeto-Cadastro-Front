import { TextField } from "@mui/material";
import React from "react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';

const FormContaBancaria =({updateField, dados, salvarContaBancaria, conta_bancaria_id}) => (
  <React.Fragment>
    <Grid container spacing={1} direction="row">
      <Grid item md={6}>
        <TextField label="Nome" variant="outlined" fullWidth name="nome" value={dados.nome} onChange={(e) => updateField(e)} />
      </Grid>

      <Grid item md={6}>
        <TextField type="number" label="Saldo da Conta" variant="outlined" fullWidth name="saldo" value={dados.saldo} onChange={(e) => updateField(e)} /> 
      </Grid>

    </Grid>

    <Grid container spacing={1} direction="row" style={{marginTop:10}}>
    <Grid item md={2}>
        <Link to='/listagemContaBancaria'>
        <Button variant="contained" color="error" fullWidth>
          Voltar
        </Button>
        </Link>
      </Grid>
      <Grid item md={2}>
        <Button variant="contained" color="primary" fullWidth onClick={()=>salvarContaBancaria()}>
          {conta_bancaria_id ?"Alterar": "Cadastrar"} Conta Bancaria
        </Button>
      </Grid>
    </Grid>
  </React.Fragment>
)

export default FormContaBancaria;