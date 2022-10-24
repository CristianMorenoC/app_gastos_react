import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import {Header, ContenedorHeader, Titulo} from '../elementos/Header'
import Boton from '../elementos/Boton'
import {ContenedorBoton, Formulario, Input } from '../elementos/ElementosDeFormulario'
import { ReactComponent as SvgLogin } from '../imagenes/registro.svg'
import styled from 'styled-components'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom' 
import { auth } from '../firebase/firebaseConfig'
import Alerta from '../elementos/Alerta'

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem;
  margin-bottom: 1.25rem;  
`

const InicioSesion = () => {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [estadoAlerta, setEstadoAlerta] = useState(false)
  const [alerta, setAlerta] = useState({})

  const handleChange = (e) => {
    if(e.target.name === 'email') setCorreo(e.target.value)
    if(e.target.name === 'password') setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEstadoAlerta(false)
    setAlerta({})


    const expressionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
    if( !expressionRegular.test(correo) ){
      setEstadoAlerta(true)
      setAlerta({tipo: 'error', mensaje: 'por favor ingresa un correo valido'})
      return
    } 
    if(correo === '' || password === ''){
      setEstadoAlerta(true)
      setAlerta({tipo: 'error', mensaje: 'por favor llene el formulario completo'})
      return
    }

    try {
      await signInWithEmailAndPassword(auth, correo, password)
      console.log('usuario logeado correctamente')
      navigate('/')
    } catch (error) {
      setEstadoAlerta(true)
			let mensaje;
			switch(error.code){
				case 'auth/wrong-password':
					mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
					break;
				case 'auth/user-not-found':
					mensaje = 'No se encontro el usuario'
				break;
				case 'auth/invalid-email':
					mensaje = 'El correo electrónico no es válido.'
				break;
				default:
					mensaje = 'Hubo un error al intentar iniciar sesion.'
				break;
			}
      setAlerta({tipo: 'error', mensaje})

    }
  }


  return (
    <>

      <Helmet>
        <title>Iniciar Sesion</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesion</Titulo>
          <div>
            <Boton to="/crear-cuenta" >Registrarse</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit} >
        <Svg />
        <Input type="email" name="email" placeholder="Correo electronico" value={correo} onChange={handleChange} />
        <Input type="password" name="password" placeholder="Contraseña" value={password} onChange={handleChange} />
        <ContenedorBoton>
        <Boton as="button" type="submit" primario>Iniciar Sesion</Boton>
        </ContenedorBoton>
      </Formulario>

      <Alerta estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta} tipo={alerta.tipo} mensaje={alerta.mensaje} />
    </>
  )
}

export default InicioSesion