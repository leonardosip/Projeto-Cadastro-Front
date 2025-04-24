import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import Tabela from "./../../components/Tabela"
import Menu from ".//../../components/Menu"
import axios from "axios";

const initialState = {
  acoesTabela: ["edit", "remove"],
  list_conta_bancaria: [],
  cabecalho: [
    {
      id: 'nome',
      label: 'Nome',
      numeric: false,
    },
    {
      id: 'saldo',
      label: 'Saldo',
      numeric: false,
    }
  ],
  menuOpen: false
}

const ListagemContaBancaria = () => {
  const [state, setState] = useState({ ...initialState })

  const getConfig = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    return config
  }

  const removerContaBancaria = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/conta_bancaria/${id}`, getConfig())

      let list_conta_bancaria = state.list_conta_bancaria
			let index = list_conta_bancaria.findIndex(param => param.id === id)
			list_conta_bancaria.splice(index, 1)
			setState((prevState) => ({
				...prevState,
				list_conta_bancaria
			}))

      alert('conta removida com sucesso')

    } catch (error) {
      console.log(error)
      alert('erro ao remover a conta')
    }
   
  }

  const abrirFecharMenu = () => {
    setState((prevState) => ({
      ...prevState,
      menuOpen: ! state.menuOpen
    }))
  }

  useEffect(() => {
    const fetchData = async() => {
      try {
        const {data: list_conta_bancaria} = await axios.get("http://localhost:3333/conta_bancaria", getConfig())

        setState((prevState) => ({
          ...prevState,
          list_conta_bancaria
        }))
      } catch (error) {
        console.log(error)
      }
  }
   fetchData()
  }, [])

  let { list_conta_bancaria, cabecalho, acoesTabela, menuOpen } = state

  return (
    <React.Fragment>
      <div style={{ width: "100%", padding: 20 }}>
        <Menu tela="Listagem de Contas" menuOpen={menuOpen} abrirFecharMenu={() => abrirFecharMenu()} />
        <Grid container spacing={1} direction="row">
          <Grid item md={10} sm={6} xs={1}>
          </Grid>

          <Grid item md={2} sm={6} xs={1}>
            <Link to='/cadastroContaBancaria'>
              <Button variant="contained" color="primary" fullWidth>
                Cadastrar Conta
              </Button>
            </Link>
          </Grid>
        </Grid>

        <Grid container direction="row" spacing={1}>
          <Grid item md={12}>
            <Tabela list={list_conta_bancaria} cabecalho={cabecalho} acoes={acoesTabela} remover={(id) => removerContaBancaria(id)} caminhoEditar={'/cadastroContaBancaria/'} />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )

}


export default ListagemContaBancaria

