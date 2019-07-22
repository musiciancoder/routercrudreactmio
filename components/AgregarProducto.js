import React, {useState} from 'react';
import Error  from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom'; /*//para redireccionar a un usuario luego que ya se ha ejecutado un component*/

function AgregarProducto({history, guardarRecargarProductos}) {


    const [nombrePlatillo, guardarNombre]= useState(''); //lo que se escribe en input Nombre
    const [precioPlatillo, guardarPrecio]= useState('');//lo que se escribe en input Precio
    const [categoria, guardarCategoria]= useState('');//lo que se escribe en input categoria
    const [error, guardarError] = useState(false);

    const leerValorRadio = e => { /*aca lee el radiobutton*/
        guardarCategoria(e.target.value);
    }

    const  agregarProducto = async e => {
        e.preventDefault();

        if(nombrePlatillo===''||precioPlatillo===''||categoria==='') {
            guardarError(true);
            return;
        }

        guardarError(false); //volvemos al estado original

        //Crear el nuevo producto
        try{
            const resultado = await axios.post('http://localhost:4000/restaurant', { //el segundo parametro es un objeto con los datos que se van a agregar
                nombrePlatillo,
                precioPlatillo,
                categoria
            });
            console.log(resultado);
            if(resultado.status===201){ //instalar libreria sweetalert2
                Swal.fire(
                    'Producto Creado',
                    'El producto se creo correctamente',
                    'success'


                )
            }
        } catch (error) {
            console.log(error);
            Swal.fire({  //instalar libreria sweetalert2
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

            })


        }
        guardarRecargarProductos(true); //antes de redirigir al route de productos, cambia el state de guardarRecargarProductos a true, para que en App entre en el loop if(guardarRecargarProductos(true){...
        //Redirigir al usuario a Productos luego de que escribe el nombre y precio y hace click en agregar producto, se debe agregar withrouter

        history.push('/productos');

    }

    return(
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>

            {(error)? <Error mensaje='Todos los campos son obligatorios'/>:null}
            <form
                className="mt-5"
                onSubmit={agregarProducto}
            >
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre Platillo"
                        onChange={e=> guardarNombre(e.target.value)}/* al comenzar a escribir en el input, el state debe cambiar en react tools*/
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder="Precio Platillo"
                        onChange={e=> guardarPrecio(e.target.value)}
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
                            onChange={leerValorRadio}
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
                            onChange={leerValorRadio}
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
                            onChange={leerValorRadio}
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
                            onChange={leerValorRadio}
                        />
                        <label className="form-check-label">
                            Ensalada
                        </label>
                    </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>


    )

}

export default withRouter(AgregarProducto); //para redireccionar a un usuario luego que ya se ha ejecutado un componte con history.pusg