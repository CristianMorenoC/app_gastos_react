import {useEffect, useState} from 'react'
import { db } from '../firebase/firebaseConfig'
import { query, where, orderBy, collection, onSnapshot } from 'firebase/firestore'
import { useAuth } from '../contextos/auth.context'
import { endOfMonth, startOfMonth, getUnixTime } from 'date-fns'

const useObtenerGastosDelMes = () => {

    const {usuario} = useAuth()
    const [gastosDelMes, setGastosDelMes] = useState([])

    useEffect(() => {

        const inicioMes = getUnixTime(startOfMonth(new Date()))
        const finMes = getUnixTime(endOfMonth(new Date()))

        if(usuario){
            const consulta = query(
                collection(db, 'gastos'),
                orderBy('fecha', 'desc'),
                where('fecha', '>=', inicioMes),
                where('fecha', '<=', finMes),
                where('uIdUsuario', '==', usuario.uid),
            )
    
            const unsuscribe = onSnapshot(consulta, (snapshot) => {

                const gastosArr = snapshot.docs.map(doc => {
                    return { ...doc.data(), id: doc.id}
                })
    
                setGastosDelMes(gastosArr)
    
            }, err => console.log(err))
            return unsuscribe
        }
    }, [usuario])
    return gastosDelMes
}
 
export default useObtenerGastosDelMes;