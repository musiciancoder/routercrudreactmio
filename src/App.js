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
    //const [ recargarProductos, guardarRecargarProductos ] = useState(true);

    useEffect(() => {
        //if(recargarProductos) {
            const consultarApi = async () => {
                // consultar la api de json-server //consultar la api de json-server. En un caso mas elaborado la despuesta REST debe  ser generada con un lenguaje de backend como Node, Java o PHP
                const resultado = await axios.get('http://localhost:4000/restaurant');
                console.log(resultado.data); //esto se ve en console
                guardarProductos(resultado.data); //le pasa el resultado de la api al state, esto se puede ver en React tools
            }
            consultarApi();

            // Cambiar a false la recarga de los productos
            //guardarRecargarProductos(false); //actualizacion del state de productos, se puede ver con React tools

    }, []);




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
                    <Route exact path="/nuevo-producto" component={AgregarProducto}/>
                    <Route exact path="/productos/:id" component={Producto} />
                    {/*id es un comodin*, ya sea que pongamos un 1 o un 100000 siempre va a salir EditarProducto en el URL*/}
                    <Route exact path="/productos/editar/:id" component={EditarProducto} />
                </Switch>
            </main>
            <p className="mt-4 p2 text-center">Todos los derechos Reservados</p>
        </Router>
    );
}

export default App;



