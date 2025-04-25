import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'



const menu = ({ tela, menuOpen, abrirFecharMenu }) => (

  <div className="menu">
    <AppBar position="fixed" style={{ backgroundColor: "#5c5e75", borderRadius: 0,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1100,}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => abrirFecharMenu()}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          {tela}
        </Typography>
      </Toolbar>
    </AppBar>
    <Menu style={{top:-180}} id="simple-menu" keepMounted open={menuOpen} onClose={() => abrirFecharMenu() } className="opcoesMenu">
      <Link to="/">
        <MenuItem>
          Produtos
        </MenuItem>
      </Link>

      <Link to="/listagemPessoa">
        <MenuItem>
          Pessoa
        </MenuItem>
      </Link>

      <Link to="/listagemContaBancaria">
        <MenuItem>
          Conta Bancária
        </MenuItem>
      </Link>

    </Menu>
  </div>
)



export default menu;