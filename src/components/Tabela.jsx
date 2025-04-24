import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'


const tabela = ({ list, cabecalho, acoes, remover,caminhoEditar }) => (
  <Table className={"tabela"} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        {cabecalho.map((coluna, key) => (
          <TableCell align={coluna.numeric ? 'right' : 'left'} key={key}>{coluna.label}</TableCell>
        ))}
        {acoes.length > 0 &&
          <TableCell align={"center"} style={{width:140}}>Acões</TableCell>
        }
      </TableRow>
    </TableHead>
    <TableBody>
      {list.map((row, key) => (
        <TableRow key={key}>
          {cabecalho.map((coluna, key2) => (
            <TableCell align={coluna.numeric ? 'right' : 'left'} key={key2}>
              {row[coluna.id]}
            </TableCell>
          ))}
          {acoes.length > 0 &&
            <TableCell align={'center'}>
              {acoes.map((acao, key) => {
                if (acao === "edit") {
                  return (

                    <Link to={`${caminhoEditar}${row.id}`} key={key}>
                      <IconButton color="primary">
                        <CreateIcon />
                      </IconButton>
                    </Link>
                  )
                } else if (acao === "remove") {
                  return (
                    <IconButton color="secondary" onClick={()=>remover(row.id)} key={key}>
                      <DeleteIcon />
                    </IconButton>
                  )
                }
                return false
              })}
            </TableCell>
          }
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

 export default tabela;
