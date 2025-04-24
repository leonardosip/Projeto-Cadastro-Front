import React, { useState, useEffect } from "react";
import "./Produto.scss";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import Tabela from "./../../components/Tabela"
import Menu from ".//../../components/Menu"
import axios from "axios";

// Define as variaveis iniciais do estado da pagina
const initialState = {
	acoesTabela: ["edit", "remove"],
	list_produto: [],
	cabecalho: [
		{
			id: 'nome',
			label: 'Nome',
			numeric: false,
		},
		{
			id: 'sub_grupo',
			label: 'Sub Grupo',
			numeric: false,
		},
		{
			id: 'grupo',
			label: 'Grupo',
			numeric: false,
		},
		{
			id: 'valor',
			label: 'Valor',
			numeric: false,
		}
	],
	menuOpen: false
}

const ListagemProduto = () => {
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

	const removerProduto = async (id) => {
		try {
			await axios.delete(`http://localhost:3333/produto/${id}`, getConfig())

			let list_produto = state.list_produto
			let index = list_produto.findIndex(param => param.id === id)
			list_produto.splice(index, 1)
			setState((prevState) => ({
				...prevState,
				list_produto
			}))

			alert('Produto removido com sucesso')
		} catch (error) {
			console.log(error)
		}
	}

	const abrirFecharMenu = () => {
		setState((prevState) => ({
			...prevState,
			menuOpen: !state.menuOpen
		}))

	}

	// Funcao que executa quando a tela eh carregada

	useEffect(() => {
		const fetchData = async() => {
				try {
					const {data: list_produto} = await axios.get("http://localhost:3333/produto", getConfig())

					setState((prevState) => ({
						...prevState,
						list_produto
					}))
				} catch (error) {
					console.log(error)
				}
		}
		 fetchData()
	}, [])

	let { list_produto, cabecalho, acoesTabela, menuOpen } = state
	return (
		<React.Fragment>
			<div style={{ width: "100%", padding: 20 }}>
				<Menu tela="Listagem de Produtos" menuOpen={menuOpen} abrirFecharMenu={() => abrirFecharMenu()} />
				<Grid container spacing={1} direction="row">
					<Grid item md={10} sm={6} xs={1}>
					</Grid>

					<Grid item md={2} sm={6} xs={1}>
						<Link to='/cadastro'>
							<Button variant="contained" color="primary" fullWidth>
								Cadastrar Produto
							</Button>
						</Link>
					</Grid>
				</Grid>

				<Grid container direction="row" spacing={1}>
					<Grid item md={12}>
						<Tabela list={list_produto} cabecalho={cabecalho} acoes={acoesTabela} remover={(id) => removerProduto(id)} caminhoEditar={'/cadastro/'} />
					</Grid>
				</Grid>
			</div>
		</React.Fragment>

	)
}

export default ListagemProduto