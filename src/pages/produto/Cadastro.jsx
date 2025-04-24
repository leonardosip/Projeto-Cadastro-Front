import React, { useState, useEffect } from "react";
import "./Produto.scss";
import Grid from '@mui/material/Grid';
import FormProduto from "./../../components/forms/FormProduto"
import Menu from "./../../components/Menu"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const initialState = {
  produto: {
    nome: '',
    sub_grupo: '',
    grupo: '',
    valor: ''
  },
  menuOpen: false
}

const CadastroProduto = () => {
  const [state, setState] = useState({ ...initialState })
  const navigate = useNavigate()
  const { produto_id } = useParams()

  const updateProduto = (event) => {
    const { name, value } = event.target
    let { produto } = state

    produto[name] = value
    setState((prevState) => ({ ...prevState, produto }))
  }

  const validarCampos = (produto) => {
    if (produto.nome === "" || produto.sub_grupo === "" || produto.grupo === "" || produto.valor === "") {
      return false;
    }
    return true
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

  const salvarProduto = async () => {
    try {
      let { produto } = state
      if (!validarCampos(produto)) {
        alert('Preencher todos os campos')
        return false
      }

      produto.valor = parseInt(produto.valor)

      if (!produto_id) {
        await axios.post("http://localhost:3333/produto", produto, getConfig())
      }else{
        await axios.put(`http://localhost:3333/produto/${produto_id}`, produto, getConfig())
      }

      setState((prevState) => ({
        ...prevState,
        produto: {
          nome: '',
          sub_grupo: '',
          grupo: '',
          valor: ''
        }
      }))
      alert("Produto cadastrado com sucesso")
      navigate("/")

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
      if (produto_id) {
        let { data: produto } = await axios.get(`http://localhost:3333/produto/${produto_id}`, getConfig())

        delete produto.criado_em
        delete produto.alterado_em

        setState((prevState) => ({
          ...prevState,
          produto
        }))
      } else {
        setState((prevState) => ({
          ...prevState,
          produto: {
            nome: '',
            sub_grupo: '',
            grupo: '',
            valor: ''
          }
        }))
      }
    }

    fetchData()
  }, [navigate, produto_id])

  return (
    <div style={{ width: "100%", padding: 20 }}>
      <Menu tela="Cadastro de Produtos" menuOpen={state.menuOpen} abrirFecharMenu={() => abrirFecharMenu()} />
      <Grid container spacing={1} direction="row">
        <Grid item md={12} sm={6} xs={1}>
        </Grid>
      </Grid>
      <FormProduto dados={state.produto} updateField={(e) => updateProduto(e)} salvarProduto={() => salvarProduto()} produto_id={produto_id} />
    </div>
  )
}

export default CadastroProduto


