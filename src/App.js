import React from 'react'
import {Helmet} from 'react-helmet'
import { ContenedorBotones, Titulo} from './elementos/Header'
import Boton  from './elementos/Boton'
import BtnCerrarSesion from './elementos/BtnCerrarSesion'
import FormularioGasto from './componentes/FormularioGasto'
import BarraTotalGastado from './componentes/BarraTotalGastado'

const App = () => {
  return (
    <>
      <Helmet>
        <Titulo>Agregar Gasto</Titulo>
      </Helmet>
      <ContenedorBotones>
        <Titulo>Agregar Gasto</Titulo>
        <Boton to="/categorias">Categorias</Boton>
        <Boton to="/lista">Lista de gastos</Boton>
        <BtnCerrarSesion></BtnCerrarSesion>
      </ContenedorBotones>

      <FormularioGasto />
      <BarraTotalGastado />
    </>
  )
}

export default App