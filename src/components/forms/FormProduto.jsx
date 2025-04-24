import React from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

const formProduto = ({ updateField, dados, salvarProduto, produto_id }) => (
  <React.Fragment>
    <Grid container spacing={1} direction="row">
      <Grid item md={3}>
        <TextField label="Nome do Produto" variant="outlined" fullWidth name="nome" value={dados.nome} onChange={(e) => updateField(e)} />
      </Grid>

      <Grid item md={3}>
        <TextField select SelectProps={{ native: true }} InputLabelProps={{ shrink: true }} label="Grupo do Produto" variant="outlined" fullWidth name="grupo" value={dados.grupo} onChangeCapture={(e) => updateField(e)}>
          <option value={''}>Selecionar Grupo</option>
          <option value={'Eletrodomestico'}>Eletrodomestico</option>
          <option value={'Eletronico'}>Eletronico</option>
          <option value={'Moveis'}>Moveis</option>
        </TextField>
      </Grid>

      <Grid item md={3}>
        <TextField select SelectProps={{ native: true }} InputLabelProps={{ shrink: true }} label="Sub Grupo do Produto" variant="outlined" fullWidth name="sub_grupo" value={dados.sub_grupo} onChangeCapture={(e) => updateField(e)}>
          <option value={''}>Selecionar Sub Grupo</option>
          <option value={'Produtos Sala'}>Produtos Sala</option>
          <option value={'Produtos Cozinha'}>Produtos Cozinha</option>
          <option value={'Moveis Sala'}>Moveis Sala</option>
        </TextField>
      </Grid>

      <Grid item md={3}>
        <TextField type="number" label="Valor do Produto" variant="outlined" fullWidth name="valor" value={dados.valor} onChange={(e) => updateField(e)} />
      </Grid>

    </Grid>

    <Grid container spacing={1} direction="row" style={{marginTop:10}}>
    <Grid item md={2}>
        <Link to='/'>
        <Button variant="contained" color="warning" fullWidth>
          Voltar
        </Button>
        </Link>
      </Grid>
      <Grid item md={2}>
        <Button variant="contained" color="success" fullWidth onClick={()=>salvarProduto()}>
          {produto_id ?"Alterar":"Cadastrar"} Produto
        </Button>
      </Grid>
    </Grid>
  </React.Fragment>
)
export default formProduto;
