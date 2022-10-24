import React from 'react'
import { Helmet } from 'react-helmet'
import {Header, Titulo} from '../elementos/Header'
import BtnRegresar from '../elementos/BtnRegresar'
import BarraTotalGastado from './BarraTotalGastado'
import useObtenerGastos from '../hooks/useObtenerGastos'

const ListaDeGastos = () => {

  const [gastos] = useObtenerGastos()
  return (
    <>
      <Helmet>
        <title>Lista de gastos</title>
      </Helmet>
      <Header>
        <BtnRegresar />
        <Titulo>Lista de gastos</Titulo>
      </Header>
      <BarraTotalGastado />
    </>
  )
}

export default ListaDeGastos