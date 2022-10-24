import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import WebFont from 'webfontloader'
import Contenedor from './elementos/Contenedor'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import EditarGasto from './componentes/EditarGasto'
import ListaDeGastos from './componentes/ListaDeGastos'
import GastosPorCategoria from './componentes/GastosPorCategoria'
import InicioSesion from './componentes/InicioSesion'
import RegistroUsuarios from './componentes/RegistroUsuarios'
import {Helmet} from 'react-helmet'
import favicon from './imagenes/logo.png'
import Fondo from './elementos/Fondo'
import {AuthProvider} from './contextos/auth.context'
import RutaPrivada from './componentes/RutaPrivada'


WebFont.load({
    google: {
      families: ['open sans:400, 500, 700', 'sans serif']
    }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Helmet>
    <link rel="shortcut icon" href={favicon} type='image/x-icon' ></link>
  </Helmet>

  <AuthProvider>
    <BrowserRouter>
      <Contenedor>
        <Routes>
          <Route path='/iniciar-sesion' element={<InicioSesion />} />
          <Route path='/crear-cuenta' element={<RegistroUsuarios />} />

          <Route path='/categorias' element={
            <RutaPrivada>
              <GastosPorCategoria></GastosPorCategoria>
            </RutaPrivada>
          }></Route>
          
          <Route path='/lista' element={
            <RutaPrivada>
              <ListaDeGastos></ListaDeGastos>
            </RutaPrivada>
          }></Route>

          <Route path='/editar:id' element={
            <RutaPrivada>
              <EditarGasto></EditarGasto>
            </RutaPrivada>
          }></Route>

          <Route path='/' element={
            <RutaPrivada>
              <App></App>
            </RutaPrivada>
          }></Route>


        </Routes>
      </Contenedor>
    </BrowserRouter>
  </AuthProvider>

  <Fondo />
  </>
);

