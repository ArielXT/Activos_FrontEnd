import '../App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


function Busqueda_Servicio() {

    const [servicio, setServicio] = useState([]);
    const [tablaServicio, setTablaServicio] = useState([]);
    const [busqueda, setBusqueda] = useState("");


    const peticionGet = async () => {
        await axios.get("http://127.0.0.1:8000/cye/servicio/")
            .then(response => {
                setServicio(response.data);
                setTablaServicio(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    const handleChange = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tablaServicio.filter((elemento) => {
            if (elemento.id_servicio.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.nombre_cor.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.nombre_larg.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            } else {
                return false;
            }
        });
        setServicio(resultadosBusqueda);
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
                    <h1>Busqueda de Servicio</h1>
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
                                    <th>ID Servicio</th>
                                    <th>Nombre Corto</th>
                                    <th>Nombre Largo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {servicio &&
                                    servicio.map((servicio) => (
                                        <tr key={servicio.id_servicio}>
                                            <td>{servicio.id_servicio}</td>
                                            <td>{servicio.nombre_cor}</td>
                                            <td>{servicio.nombre_larg}</td>
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

export default Busqueda_Servicio;
