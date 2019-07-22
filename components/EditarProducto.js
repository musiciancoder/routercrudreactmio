import React, {useState, useRef} from 'react';
import Error from "./Error";

import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';


//cuando se hace click en editar
function EditarProducto(props) {


    //destructuring de props
    const {history, producto, guardarRecargarProductos}=props;


    //generar los reffs. Con ellos accedemos directamente a un elemento del dom. Se recomienda para ediciones
    const precioPlatilloRef=useRef('');
    const nombrePlatilloRef =useRef('');



    const [error, guardarError] = useState(false);
    const [categoria, guardarCategoria]= useState('');

    const editarProducto = async e =>{
        e.preventDefault();

        // validacion
        const nuevoNombrePlatillo = nombrePlatilloRef.current.value, //nombrePlatilloRef.current.value es lo que esta en el input
            nuevoPrecioPlatillo = precioPlatilloRef.current.value;

        if(nuevoNombrePlatillo === '' || nuevoPrecioPlatillo === '' ) {
            guardarError(true);
            return;
        }

        guardarError(false);

        //Revisar si cambio la cetegoria, de lo contrario asignar el mismo valor

        let categoriaPlatillo = (categoria ==='')? producto.categoria:categoria;

        console.log(categoriaPlatillo);

        //Obtener los valores del formulario

        console.log(precioPlatilloRef); //con esto averiguo que precioPlatilloRef tiene la propiedad current

        const editarPlatillo = {
            precioPlatillo: precioPlatilloRef.current.value,
            nombrePlatillo:nombrePlatilloRef.current.value,
            categoria: categoriaPlatillo
        }



        console.log(editarPlatillo);
        /*luego de cambiar el precio de 350 a 400 y hacer click en Editar Producto
        {precioPlatillo: "400", nombrePlatillo: "Rib Eye 400g"}
        nombrePlatillo: "Rib Eye 400g"
        precioPlatillo: "400"
        __proto__: Object*/



    //Enviar el Request


        // Enviar el Request
        const url = `http://localhost:4000/restaurant/${producto.id}`;//aca se actualiza la url

        try {
            const resultado = await axios.put(url, editarPlatillo);

            if(resultado.status === 200) {
                Swal.fire(
                    'Producto Editado',
                    'El producto se editó correctamente',
                    'success'
                )
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, vuelve a intentarlo'
            })
        }

        //redirigir al usuario
        guardarRecargarProductos(true);
        history.push('/productos');

    }

    const leerValorRadio = e => { /*aca lee el radiobutton*/
        guardarCategoria(e.target.value);
    }

    return(

        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>

            {(error)? <Error mensaje='Todos los campos son obligatorios'/>:null}
            <form
                className="mt-5"
                onSubmit={editarProducto}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre Platillo"
                        ref={nombrePlatilloRef}
                        defaultValue={producto.nombrePlatillo}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder="Precio Platillo"
                        ref={precioPlatilloRef}
                        defaultValue={producto.precioPlatillo}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="postre"
                            defaultChecked={(producto.categoria==='postre')}
                        />
                        <label className="form-check-label">
                            Postre
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="bebida"
                            defaultChecked={(producto.categoria==='bebida')}
                        />
                        <label className="form-check-label">
                            Bebida
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="cortes"
                            defaultChecked={(producto.categoria==='cortes')}
                        />
                        <label className="form-check-label">
                            Cortes
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="ensalada"
                            defaultChecked={(producto.categoria==='ensalada')}
                        />
                        <label className="form-check-label">
                            Ensalada
                        </label>
                    </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
            </form>
        </div>


)
}

export default withRouter(EditarProducto);