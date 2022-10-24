import React, {useState} from 'react'
import {ContenedorBoton, InputGrande, Formulario, ContenedorFiltros, Input } from '../elementos/ElementosDeFormulario'
import DatePicker from './DatePicker'
import {ReactComponent as IconoPlus} from '../imagenes/plus.svg'
import SelectCategorias from './SelectCategorias'
import Boton from '../elementos/Boton'
import agregarGasto from '../firebase/agregarGasto'
// import fromUnixTime from 'date-fns/fromUnixTime'
import getUnixTime from 'date-fns/getUnixTime'
import {useAuth} from '../contextos/auth.context'
import Alerta from '../elementos/Alerta'

const FormularioGasto = () => {
    const [inputDescripcion, setInputDescripcion] = useState('')
    const [inputCantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('hogar')
    const [fecha, setFecha] = useState(new Date())
    const [estadoAlerta, setEstadoAlerta] = useState(false)
    const [alerta, setAlerta] = useState({})
    const {usuario} = useAuth()



    const handleChange = (e) => {
        if(e.target.name === 'descripcion') setInputDescripcion(e.target.value)
        if(e.target.name === 'cantidad') setCantidad(e.target.value.replace(/[^0-9.]/g, ''))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let cantidad = Number(inputCantidad).toFixed(2)
        if(inputCantidad !== '' && categoria !== ''){
            agregarGasto({
                descripcion: inputDescripcion,
                cantidad,
                categoria,
                fecha: getUnixTime(fecha),
                uIdUsuario: usuario.uid,
            })
            .then(()=> {
                setInputDescripcion('')
                setCategoria('hogar')
                setCantidad('')
                setFecha(new Date())
                setEstadoAlerta(true)
                setAlerta({tipo: 'exito', mensaje: 'el gasto fue agregado correctamente'})

            })
            .catch(err => {
                setEstadoAlerta(true)
                setAlerta({tipo: 'error', mensaje: 'hubo un problema para agregar el gasto'})
               
            })
        }else {
            setEstadoAlerta(true)
            setAlerta({tipo: 'error', mensaje: 'por favor rellena todos los campos'})
        }
    }

  return (
    <Formulario onSubmit={handleSubmit}>
        <ContenedorFiltros>
            <SelectCategorias categoria={categoria} setCategoria={setCategoria} ></SelectCategorias>
            <DatePicker fecha={fecha} setFecha={setFecha} />
        </ContenedorFiltros>

        <div>
            <Input
            type="text"
            name="descripcion"
            id="descripcion"
            placeholder="Descripcion de gasto"
            value={inputDescripcion}
            onChange={handleChange}
            />
            <InputGrande
            type="text"
            name="cantidad"
            id="cantidad"
            placeholder="$0.00"
            value={inputCantidad}
            onChange={handleChange}

            />
        </div>

        <ContenedorBoton>
            <Boton as="button" primario conIcono type='submit'>
                Agregar gasto
                <IconoPlus />
            </Boton>
        </ContenedorBoton>
        <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta} />
    </Formulario>
  )
}

export default FormularioGasto