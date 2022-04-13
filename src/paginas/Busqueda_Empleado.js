import '../App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


function Busqueda_Empleado() {

    const [empleado, setEmpleado] = useState([]);
    const [tablaEmpleado, setTablaEmpleado] = useState([]);
    const [busqueda, setBusqueda] = useState("");


    const peticionGet = async () => {
        await axios.get("http://127.0.0.1:8000/cye/empleado/")
            .then(response => {
                setEmpleado(response.data);
                setTablaEmpleado(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    const handleChange = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tablaEmpleado.filter((elemento) => {
            if (elemento.dni.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.apellido.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.area.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.cargo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.id_locempresa.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.id_sede.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.id_ceco.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setEmpleado(resultadosBusqueda);
    }

    useEffect(() => {
        peticionGet();
    }, [])

    return (
        <body className="back">
            <div className="App">
                <div className="container" id="body">
                    <Navbar bg="dark" variant="dark" fixed="top">
                        <div className="container">
                            <Navbar.Brand href="/"><img
                                alt=""
                                src="/favicon.svg"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                                Consultoria y Estrategia</Navbar.Brand>
                            <Nav className="me-auto">
                                <NavLink className="NavLink" to={"/"}>Inicio</NavLink>
                                <NavLink className="NavLink" to={"/empleado/"}>Empleado</NavLink>
                                <NavLink className="NavLink" to={"/activo_ti/"}>Activo TI</NavLink>
                            </Nav>
                        </div>
                    </Navbar>
                </div>

                <div className="container">
                    <br></br>
                    <br></br>
                    <h1>Busqueda de Empleados</h1>
                    <Link to={"/"} className="btn btn-info izquierdo">Volver al Inicio <FontAwesomeIcon icon={faHome} /></Link>
                    <div className="containerInput">
                        <input
                            className="form-control inputBuscar"
                            value={busqueda}
                            placeholder="Búsqueda por Nombre o Empresa"
                            onChange={handleChange}
                        />
                        <button className="btn btn-success mini-izq">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-condensed col-sm-8 text-center  table-dark table-striped table-bordered table-responsive" border="1">
                            <thead>
                                <tr>
                                    <th>DNI</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Area</th>
                                    <th>Cargo</th>
                                    <th>ID Locacion de empresa</th>
                                    <th>ID Sede</th>
                                    <th>ID Centro de Coste</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empleado &&
                                    empleado.map((empleado) => (
                                        <tr key={empleado.dni}>
                                            <td>{empleado.dni}</td>
                                            <td>{empleado.nombre}</td>
                                            <td>{empleado.apellido}</td>
                                            <td>{empleado.area}</td>
                                            <td>{empleado.cargo}</td>
                                            <td>{empleado.id_locempresa}</td>
                                            <td>{empleado.id_sede}</td>
                                            <td>{empleado.id_ceco}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Busqueda_Empleado;