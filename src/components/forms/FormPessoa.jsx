import { TextField } from "@mui/material";
import React from "react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';

const FormPessoa =({updateField, dados, salvarPessoa, pessoa_id}) => (
  <React.Fragment>
    <Grid container spacing={1} direction="row">
      <Grid item md={3}>
        <TextField label="Nome" variant="outlined" fullWidth name="nome" value={dados.nome} onChange={(e) => updateField(e)} />
      </Grid>

      <Grid item md={3}>
        <TextField type="number" label="Idade da Pessoa" variant="outlined" fullWidth name="idade" value={dados.idade} onChange={(e) => updateField(e)} /> 
      </Grid>
      <Grid item md={3}>
      <TextField type="number" label="Numero Telefone" variant="outlined" fullWidth name="numero" value={dados.numero} onChange={(e) => updateField(e)} />
      </Grid>

      <Grid item md={3}>
        <TextField type="number" label="Cpf" variant="outlined" fullWidth name="cpf" value={dados.cpf} onChange={(e) => updateField(e)} />
      </Grid>

    </Grid>

    <Grid container spacing={1} direction="row" style={{marginTop:10}}>
    <Grid item md={2}>
        <Link to='/listagemPessoa'>
        <Button variant="contained" color="error" fullWidth>
          Voltar
        </Button>
        </Link>
      </Grid>
      <Grid item md={2}>
        <Button variant="contained" color="primary" fullWidth onClick={()=>salvarPessoa()}>
          {pessoa_id ?"Alterar": "Cadastrar"} Pessoa
        </Button>
      </Grid>
    </Grid>
  </React.Fragment>
)

export default FormPessoa;