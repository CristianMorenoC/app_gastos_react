import React, {useState, useEffect, useContext} from 'react'
import useObtenerGastosDelMes from '../hooks/useObtenerGastosDelMes'

const totalGastadoContext = React.createContext()

const useGastosDelMes = () => {
    return useContext(totalGastadoContext)
}

const TotalGastadoProvider = ({children}) =>{

    const gastosDelMes = useObtenerGastosDelMes()
    const [total, setTotal] = useState(0)

    useEffect(() => {

        let gastoTotal = 0
        
        gastosDelMes.forEach(gasto => gastoTotal += gasto.cantidad)
        setTotal(gastoTotal)
        
    }, [gastosDelMes]);

    return (
        <totalGastadoContext.Provider value={ { total, } }>
            {children}
        </totalGastadoContext.Provider>
    )
}

export {TotalGastadoProvider, useGastosDelMes, totalGastadoContext}