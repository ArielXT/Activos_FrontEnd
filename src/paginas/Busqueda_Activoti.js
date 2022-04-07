import '../App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


function Busqueda_Activoti() {

    const [activo_ti, setActivoti] = useState([]);
    const [tablaUsuarios, setTablaUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");


    const peticionGet = async () => {
        await axios.get("http://127.0.0.1:8000/cye/activo_ti/")
            .then(response => {
                setActivoti(response.data);
                setTablaUsuarios(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    const handleChange = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
            if (elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.descripcion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.hostname.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.ip_interna.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.ip_externa.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.descripcion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.usuario.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.clave.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.link.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.observacion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.rol_servicio.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.clin_empresa.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.tipo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.f_inicio.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.f_final.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.estado.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.descripcion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.fabricante.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.marca.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setActivoti(resultadosBusqueda);
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

                <div className="right-container">
                    <br></br>
                    <br></br>
                    <h1>Busqueda de Activos TI</h1>

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
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>HostName</th>
                                    <th>IP Interna</th>
                                    <th>IP Externa</th>
                                    <th>ID del Tipo de Administrador</th>
                                    <th>Usuario</th>
                                    <th>Clave</th>
                                    <th>Link</th>
                                    <th>Observacion</th>
                                    <th>Rol Servicio</th>
                                    <th>Cliente Empresa</th>
                                    <th>Tipo</th>
                                    <th>Fecha de Inicio</th>
                                    <th>Fecha Final</th>
                                    <th>Estado</th>
                                    <th>Descripción</th>
                                    <th>Fabricante</th>
                                    <th>Marca</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activo_ti &&
                                    activo_ti.map((activo_ti) => (
                                        <tr key={activo_ti.id}>
                                            <td className="centrando">{activo_ti.id}</td>
                                            <td className="centrando">{activo_ti.nombre}</td>
                                            <td className="centrando">{activo_ti.hostname}</td>
                                            <td className="centrando">{activo_ti.ip_interna}</td>
                                            <td className="centrando">{activo_ti.ip_externa}</td>
                                            <td className="centrando">{activo_ti.id_tipo}</td>
                                            <td className="centrando">{activo_ti.usuario}</td>
                                            <td className="centrando">{activo_ti.clave}</td>
                                            <td className="centrando">{activo_ti.link}</td>
                                            <td className="centrando">{activo_ti.observacion}</td>
                                            <td className="centrando">{activo_ti.rol_servicio}</td>
                                            <td className="centrando">{activo_ti.clin_empresa}</td>
                                            <td className="centrando">{activo_ti.tipo}</td>
                                            <td className="centrando">{activo_ti.f_inicio}</td>
                                            <td className="centrando">{activo_ti.f_final}</td>
                                            <td className="centrando">{activo_ti.estado}</td>
                                            <td className="centrando">{activo_ti.descripcion}</td>
                                            <td className="centrando">{activo_ti.fabricante}</td>
                                            <td className="centrando">{activo_ti.marca}</td>
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

export default Busqueda_Activoti;