import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Productos from './components/Productos';
import EditarProducto from './components/EditarProducto';
import AgregarProducto from './components/AgregarProducto';
import Producto from './components/Producto';

function App() {


    const [ productos, guardarProductos ] = useState([]);
    const [ recargarProductos, guardarRecargarProductos ] = useState(true); //para actualizar la pagina de productos una vez que al escribir un Nuevo Producto y ser redireccionado a Productos (con history.push y withrouter), en Productos aparezca el Nuevo Producto que acabamos de escribir sin necesidad de refresh

    useEffect(() => {
        if(recargarProductos) { //si esta como true, es decir la primera vez que se carga (ya que recargar producto inicia como true) o si hemos hecho click en AGREGAR PRODUCTO
            const consultarApi = async () => {
                // consultar la api de json-server //consultar la api de json-server. En un caso mas elaborado la despuesta REST debe  ser generada con un lenguaje de backend como Node, Java o PHP
                const resultado = await axios.get('http://localhost:4000/restaurant');
                console.log(resultado.data); //esto se ve en console
                guardarProductos(resultado.data); //le pasa el resultado de la api al state, esto se puede ver en React tools
            }
            consultarApi(); //ejecutar la funcion

            // Cambiar a false la recarga de los productos una vez que productos ya haya sido visualizado, porque sino seria un loop infinito debido a if(recargarProducto)
            guardarRecargarProductos(false); //actualizacion del state de productos, que inicia como true  y que recibe props desde App para cambiar el state
        }
    }, [recargarProductos]);




    return (
        <Router>
            <Header /> {/*lo que esté fuera del Switch y dentro del Router se cargará automáticamente para todos los componentes cuyas URL hemos asignado con Route dentro del Switch*/}
            <main className="container mt-5">
                <Switch>
                    {/*  Asignar URL a un componente con exact-path. Si queremos pasar props a un componente lo hacemos con Render, como en el primer caso, sino queremos pasar nada lo hacemos con component */}
                    <Route exact path="/productos"
                           render={ () => (
                               <Productos
                                   productos={productos}

                               />
                           ) }
                    />
                    <Route exact path="/nuevo-producto"
                    render={() => ( //uso render porque necesito pasar guardarRecargarProductos
                        <AgregarProducto
                            guardarRecargarProductos={guardarRecargarProductos}
                            />

                    )}/>
                    <Route exact path="/productos/:id" component={Producto} />
                    {/*id es un comodin*, ya sea que pongamos un 1 o un 100000 siempre va a salir EditarProducto en el URL*/}
                    <Route exact path="/productos/editar/:id"
                    render={props =>{ //con esto tengo acceso a las props, que contienen el id, que es lo que nos interesa rescatar al editar
                        console.log(props.match.params.id);

                        //tomar el ID del producto
                        //de string a numero con parseint
                        const idProducto=parseInt(props.match.params.id);

                        // productos es el resultado de la api
                        const producto = productos.filter(producto => producto.id === idProducto);//idProducto es cuando hacemos click en editar, producto.id es el id en el json. Con esto extraemos el producto que nos interesa

                        return(
                            <EditarProducto
                            producto={producto[0]}
                            />
                        )
                    }}
                    />
                </Switch>
            </main>
            <p className="mt-4 p2 text-center">Todos los derechos Reservados</p>
        </Router>
    );
}

export default App;

