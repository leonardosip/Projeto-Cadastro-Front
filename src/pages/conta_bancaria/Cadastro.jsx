import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Menu from "./../../components/Menu"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import FormContaBancaria from "../../components/forms/FormContaBancaria";

const initialState = {
  conta_bancaria: {
    nome: '',
    saldo: ''
  },
  menuOpen: false
}

const CadastroContaBancaria = () => {
  const [state, setState] = useState({ ...initialState })
  const navigate = useNavigate()
  const { conta_bancaria_id } = useParams()

  const updateContaBancaria = (event) => {
    const { name, value } = event.target
    let { conta_bancaria } = state

    conta_bancaria[name] = value
    setState((prevState) => ({ ...prevState, conta_bancaria }))
  }

  const validarCampos = (conta_bancaria) => {
    if (conta_bancaria.nome === "" || conta_bancaria.saldo === "") {
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

  const salvarContaBancaria = async () => {
    try {
      let { conta_bancaria } = state
      
      if (!validarCampos(conta_bancaria)) {
        alert('Preencher todos os campos')
        return false
      }

      if (!conta_bancaria_id) {
        await axios.post("http://localhost:3333/conta_bancaria", conta_bancaria, getConfig())
      }else{
        await axios.put(`http://localhost:3333/conta_bancaria/${conta_bancaria_id}`, conta_bancaria, getConfig())
      }

      setState((prevState) => ({
        ...prevState,
        conta_bancaria: {
          nome: '',
          saldo: ''
        }
      }))
      alert("Conta cadastrada com sucesso")
      navigate("/listagemContaBancaria")

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
      if (conta_bancaria_id) {
        let { data: conta_bancaria } = await axios.get(`http://localhost:3333/conta_bancaria/${conta_bancaria_id}`, getConfig())

        delete conta_bancaria.criado_em 
        delete conta_bancaria.alterado_em

        setState((prevState) => ({
          ...prevState,
          conta_bancaria
        }))
      }else{
        setState((prevState) => ({
          ...prevState,
          conta_bancaria: {
            nome: '',
            saldo: ''
          }
        }))
      }
    }

    fetchData()

  }, [navigate, conta_bancaria_id])

  return (
    <div style={{ width: "100%", padding: 20 }}>
      <Menu tela="Cadastro de Contas Bancarias" menuOpen={state.menuOpen} abrirFecharMenu={() => abrirFecharMenu()} />
      <Grid container spacing={1} direction="row">
        <Grid item md={12} sm={6} xs={1}>
        </Grid>
      </Grid>
      <FormContaBancaria dados={state.conta_bancaria} updateField={(e) => updateContaBancaria(e)} salvarContaBancaria={() => salvarContaBancaria()} conta_bancaria_id={conta_bancaria_id} />
    </div>
  )
}

export default CadastroContaBancaria    