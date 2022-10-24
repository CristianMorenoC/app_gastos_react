import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import {Header, ContenedorHeader, Titulo} from '../elementos/Header'
import Boton from '../elementos/Boton'
import {ContenedorBoton, Formulario, Input } from '../elementos/ElementosDeFormulario'
import { ReactComponent as SvgLogin } from '../imagenes/login.svg'
import styled from 'styled-components'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import Alerta from '../elementos/Alerta'

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem;
  margin-bottom: 1.25rem;  
`

const RegistroUsuarios = () => {
  const navigate = useNavigate()

  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [estadoAlerta, setEstadoAlerta] = useState(false)
  const [alerta, setAlerta] = useState({})

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setCorreo(e.target.value)
        break;
      case 'password':
        setPassword(e.target.value)
        break;
      case 'password2':
        setPassword2(e.target.value)
        break;
    
      default:
        break;
    }
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
    if(correo === '' || password === '' || password2 === ''){
      setEstadoAlerta(true)
      setAlerta({tipo: 'error', mensaje: 'por favor llene el formulario completo'})
      return
    }
    if(password !== password2){
      setEstadoAlerta(true)
      setAlerta({tipo: 'error', mensaje: 'las contraseñas no coinciden'})
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, correo, password)
      console.log('usuario creado correctamente')
      navigate('/')
    } catch (error) {
      setEstadoAlerta(true)
			let mensaje;
			switch(error.code){
				case 'auth/weak-password':
					mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
					break;
				case 'auth/email-already-in-use':
					mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
				break;
				case 'auth/invalid-email':
					mensaje = 'El correo electrónico no es válido.'
				break;
				default:
					mensaje = 'Hubo un error al intentar crear la cuenta.'
				break;
			}
      setAlerta({tipo: 'error', mensaje})

    }
  }


  return (
    <>

      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Crear Cuenta</Titulo>
          <div>
            <Boton to="/iniciar-sesion" >Iniciar Sesion</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit} >
        <Svg />
        <Input 
        type="email" 
        name="email" 
        placeholder="Correo electronico"
        value={correo}
        onChange={handleChange}
        />
        <Input 
        type="password" 
        name="password" 
        placeholder="Contraseña"
        value={password}
        onChange={handleChange}
        />
        <Input 
        type="password" 
        name="password2" 
        placeholder="Repetir la contraseña"
        value={password2}
        onChange={handleChange}
        />
        <ContenedorBoton>
        <Boton as="button" type="submit" primario>Crear cuenta</Boton>
        </ContenedorBoton>
      </Formulario>
      <Alerta 
      estadoAlerta={estadoAlerta}
      setEstadoAlerta={setEstadoAlerta}
      tipo={alerta.tipo}
      mensaje={alerta.mensaje}
      />
    </>
  )
}

export default RegistroUsuarios