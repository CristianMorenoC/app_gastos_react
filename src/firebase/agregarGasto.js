import { collection, addDoc } from "firebase/firestore";
import {db} from './firebaseConfig'

const agregarGasto = ({categoria, cantidad, descripcion, fecha, uIdUsuario}) => {
  return addDoc(collection(db, 'gastos'), {
    uIdUsuario,
    categoria,
    cantidad,
    descripcion,
    fecha,
  })
}

export default agregarGasto