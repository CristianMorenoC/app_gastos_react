import React, {useState, useEffect, useContext} from 'react'
import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

//creamos contexto
const AuthContext = React.createContext()

//hook para acceder al contexto
const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {

    const [usuario, setUsuario] = useState(false)
    const [cargando, setCargando] = useState(true)

    //comprobamos si hay un usuario
    useEffect(() => {
        onAuthStateChanged(auth, (usuario)=> {
            setUsuario(usuario)
            setCargando(false)
        })
    }, []);

    return ( 
        <AuthContext.Provider value={{usuario: usuario}}>
            {!cargando && children}
        </AuthContext.Provider>
     );
}
 
export  {AuthProvider, AuthContext, useAuth}