import {useEffect, useState} from 'react'
import {db} from './../firebase/firebaseConfig'
import {useNavigate} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'

const useObtenerGasto = (id) => {
	const navigate = useNavigate();
	const [gasto, setGasto] = useState('');
	
	useEffect(() => {
		const obtenerGasto = async() => {
            const ref = doc(db, 'gastos', id)
			const documento = await getDoc(ref)

            
            documento.exists ? setGasto(documento.data()) : navigate('/lista')
		}

		obtenerGasto();
	}, [navigate, id]);

	return [gasto];
}
 
export default useObtenerGasto;