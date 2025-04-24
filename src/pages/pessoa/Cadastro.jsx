import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Menu from "./../../components/Menu"
import FormPessoa from "../../components/forms/FormPessoa";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const initialState = {
  pessoa: {
    nome: '',
    idade: '',
    numero: '',
    cpf: ''
  },
  menuOpen: false
}

const CadastroPessoa = () => {
  const [state, setState] = useState({ ...initialState })
  const navigate = useNavigate()
  const { pessoa_id } = useParams()

  const updatePessoa = (event) => {
    const { name, value } = event.target
    let { pessoa } = state

    pessoa[name] = value
    setState((prevState) => ({ ...prevState, pessoa }))
  }

  const validarCampos = (pessoa) => {
    if (pessoa.nome === "" || pessoa.idade === "" || pessoa.numero === "" || pessoa.cpf === "") {
      return false;
    }
    return true;
  }

  const getConfig = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    return config
  }

  const salvarPessoa = async () => {
    try {
      let { pessoa } = state
      
      if (!validarCampos(pessoa)) {
        alert('Preencher todos os campos')
        return false
      }

      pessoa.idade = parseInt(pessoa.idade)

      if (!pessoa_id) {
        await axios.post("http://localhost:3333/pessoa", pessoa, getConfig())
      }else{
        await axios.put(`http://localhost:3333/pessoa/${pessoa_id}`, pessoa, getConfig())
      }

      setState((prevState) => ({
        ...prevState,
        pessoa: {
          nome: '',
          idade: '',
          numero: '',
          cpf: ''
        }
      }))
      alert("Pessoa cadastrada com sucesso")
      navigate("/listagemPessoa")

    } catch (error) {
      console.log(error)
      alert("erro ao cadastrar")
    }
  }

  const abrirFecharMenu = () => {
    setState((prevState) => ({
      ...prevState,
      menuOpen: !state.menuOpen
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      if (pessoa_id) {
        let { data: pessoa } = await axios.get(`http://localhost:3333/pessoa/${pessoa_id}`, getConfig())

        delete pessoa.criado_em 
        delete pessoa.alterado_em

        setState((prevState) => ({
          ...prevState,
          pessoa
        }))
      }else{
        setState((prevState) => ({
          ...prevState,
          pessoa: {
            nome: '',
            idade: '',
            numero: '',
            cpf: ''
          }
        }))
      }
    }

    fetchData()

  }, [navigate, pessoa_id])

  return (
    <div style={{ width: "100%", padding: 20 }}>
      <Menu tela="Cadastro de Pessoas" menuOpen={state.menuOpen} abrirFecharMenu={() => abrirFecharMenu()} />
      <Grid container spacing={1} direction="row">
        <Grid item md={12} sm={6} xs={1}>
        </Grid>
      </Grid>
      <FormPessoa dados={state.pessoa} updateField={(e) => updatePessoa(e)} salvarPessoa={() => salvarPessoa()} pessoa_id={pessoa_id} />
    </div>
  )
}

export default CadastroPessoa