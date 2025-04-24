import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import Tabela from "./../../components/Tabela"
import Menu from ".//../../components/Menu"
import axios from "axios";

const initialState = {
  acoesTabela: ["edit", "remove"],
  list_pessoa: [],
  cabecalho: [
    {
      id: 'nome',
      label: 'Nome',
      numeric: false,
    },
    {
      id: 'idade',
      label: 'Idade',
      numeric: false,
    },
    {
      id: 'numero',
      label: 'Numero',
      numeric: false,
    },
    {
      id: 'cpf',
      label: 'CPF',
      numeric: false,
    }
  ],
  menuOpen: false
}

const ListagemPessoa = () => {
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

  const removerPessoa = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/pessoa/${id}`, getConfig())

      let list_pessoa = state.list_pessoa
			let index = list_pessoa.findIndex(param => param.id === id)
			list_pessoa.splice(index, 1)
			setState((prevState) => ({
				...prevState,
				list_pessoa
			}))

      alert('pessoa removida com sucesso')

    } catch (error) {
      console.log(error)
      alert('erro ao remover a pessoa')
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
        const {data: list_pessoa} = await axios.get("http://localhost:3333/pessoa", getConfig())

        setState((prevState) => ({
          ...prevState,
          list_pessoa
        }))
      } catch (error) {
        console.log(error)
      }
  }
   fetchData()
  }, [])

  let { list_pessoa, cabecalho, acoesTabela, menuOpen } = state

  return (
    <React.Fragment>
      <div style={{ width: "100%", padding: 20 }}>
        <Menu tela="Listagem de Pessoas" menuOpen={menuOpen} abrirFecharMenu={() => abrirFecharMenu()} />
        <Grid container spacing={1} direction="row">
          <Grid item md={10} sm={6} xs={1}>
          </Grid>

          <Grid item md={2} sm={6} xs={1}>
            <Link to='/cadastroPessoa'>
              <Button variant="contained" color="primary" fullWidth>
                Cadastrar Pessoa
              </Button>
            </Link>
          </Grid>
        </Grid>

        <Grid container direction="row" spacing={1}>
          <Grid item md={12}>
            <Tabela list={list_pessoa} cabecalho={cabecalho} acoes={acoesTabela} remover={(id) => removerPessoa(id)} caminhoEditar={'/cadastroPessoa/'} />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )

}


export default ListagemPessoa

