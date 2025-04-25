import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ListagemProduto from './../pages/produto/Listagem'
import CadastroProduto from './../pages/produto/Cadastro'
import ListagemPessoa from './../pages/pessoa/Listagem'
import CadastroPessoa from './../pages/pessoa/Cadastro'
import ListagemContaBancaria from './../pages/conta_bancaria/Listagem'
import CadastroContaBancaria from './../pages/conta_bancaria/Cadastro'

const Rotas = () => (
  <Router>
    <Routes>
      
      <Route exact path={`/`} element={<ListagemProduto/>} />
      <Route exact path={`/cadastro`} element={<CadastroProduto/>} />
      <Route exact path={`/cadastro/:produto_id`} element={<CadastroProduto/>} />
      <Route exact path={`/listagemPessoa`} element={<ListagemPessoa/>}/>
      <Route exact path={`/cadastroPessoa`} element={<CadastroPessoa/>} />
      <Route exact path={`/cadastroPessoa/:pessoa_id`} element={<CadastroPessoa/>} />
      <Route exact path={`/listagemContaBancaria`} element={<ListagemContaBancaria/>} />
      <Route exact path={`/cadastroContaBancaria`} element={<CadastroContaBancaria/>} />
      <Route exact path={`/cadastroContaBancaria/:conta_bancaria_id`} element={<CadastroContaBancaria/>} />


      
    </Routes>
  </Router>
);

export default Rotas;
