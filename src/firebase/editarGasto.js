import { doc, setDoc } from "firebase/firestore";
import {db} from './firebaseConfig'

const editarGasto = async ({id, categoria, cantidad, descripcion, fecha, uIdUsuario}) => {

    // const documento = doc(db, 'gastos', id)
    const documento = doc(db, 'gastos', id)
    return await setDoc(documento, {
        categoria,
        cantidad: Number(cantidad),
        descripcion,
        fecha,
        uIdUsuario
    })

}

export default editarGasto