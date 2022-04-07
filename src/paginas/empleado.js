import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faUserTimes, faUserPlus, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
const url = "http://127.0.0.1:8000/cye/empleado/";

class empleado extends Component {
    state = {
        centro_de_coste: [],
        loc_empresa: [],
        sede: [],
        data: [],
        Insertar: false,
        form: {
            dni: 0,
            nombre: '',
            apellido: '',
            area: '',
            id_locempresa: 0,
            id_admin: 0,
            cargo: '',
            id_sede: 0,
            id_ceco: 0,
        }
    }

    MetodoGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    MetodoPost = async () => {
        await axios.post(url, this.state.form).then(response => {
            this.Insertar();
            this.MetodoGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    MetodoPut = () => {
        axios.put(url + this.state.form.dni + "/", this.state.form).then(response => {
            this.Insertar();
            this.MetodoGet();
        })
    }

    MetodoDelete = () => {
        axios.delete(url + this.state.form.dni).then(response => {
            this.setState({ Eliminar: false });
            this.MetodoGet();
        })
    }

    Insertar = () => {
        this.setState({ Insertar: !this.state.Insertar });
    }

    seleccionarEmpleado = (empleado) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                dni: empleado.dni,
                nombre: empleado.nombre,
                apellido: empleado.apellido,
                area: empleado.area,
                id_locempresa: empleado.id_locempresa,
                id_admin: empleado.id_admin,
                cargo: empleado.cargo,
                id_sede: empleado.id_sede,
                id_ceco: empleado.id_ceco,
            }
        })
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.MetodoGet();
        axios
            .get("http://127.0.0.1:8000/cye/centro_de_coste/")
            .then(response => {
                this.setState({ centro_de_coste: response.data });
            }).catch(error => {
                console.log(error.message);
            })
        axios
            .get("http://127.0.0.1:8000/cye/loc_empresa/")
            .then(response => {
                this.setState({ loc_empresa: response.data });
            }).catch(error => {
                console.log(error.message);
            })
        axios
            .get("http://127.0.0.1:8000/cye/sede/")
            .then(response => {
                this.setState({ sede: response.data });
            }).catch(error => {
                console.log(error.message);
            })
    }
    render() {
        const { form } = this.state;
        return (
            <body className="back">
                <div className="tiledBackground">
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
                        <br />
                        <br />
                        <h1>Lista de Empleados</h1>
                        <div className="centro"><Link to={"/Busqueda_Empleado/"} className="btn btn-warning">Hacer una Busqueda <FontAwesomeIcon icon={faSearch} /></Link></div>
                        <button type="button" className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.Insertar() }}>Agregar Nuevo Empleado <FontAwesomeIcon icon={faUserPlus} /></button>
                        <Link to={"/"} className="btn btn-info derecho">Volver al Inicio <FontAwesomeIcon icon={faHome} /></Link>
                        <br />
                        <br />
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
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.data.map(empleado => {
                                return (
                                    <tr key={empleado.dni}>
                                        <td>{empleado.dni}</td>
                                        <td>{empleado.nombre}</td>
                                        <td>{empleado.apellido}</td>
                                        <td>{empleado.area}</td>
                                        <td>{empleado.cargo}</td>
                                        <td>{empleado.id_locempresa}</td>
                                        <td>{empleado.id_sede}</td>
                                        <td>{empleado.id_ceco}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning mx-2" onClick={() => { this.seleccionarEmpleado(empleado); this.Insertar() }}>Editar <FontAwesomeIcon icon={faUserCog} /></button>
                                            <button type="button" className="btn btn-danger" onClick={() => { this.seleccionarEmpleado(empleado); this.setState({ Eliminar: true }) }}>Eliminar <FontAwesomeIcon icon={faUserTimes} /></button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <Modal isOpen={this.state.Insertar} className="my-modal">
                            <ModalHeader style={{ display: 'block' }}>
                                <span style={{ float: 'right' }} onClick={() => this.Insertar()}>x</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="dni" style={{ color: "white" }}>DNI</label>
                                    <input className="form-control" type="text" name="dni" id="dni" onChange={this.handleChange} value={form ? form.dni : ''} />
                                    <br />
                                    <label htmlFor="nombre" style={{ color: "white" }}>Nombre</label>
                                    <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} />
                                    <br />
                                    <label htmlFor="apellido" style={{ color: "white" }}>Apellido</label>
                                    <input className="form-control" type="text" name="apellido" id="apellido" onChange={this.handleChange} value={form ? form.apellido : ''} />
                                    <br />
                                    <label htmlFor="area" style={{ color: "white" }}>Area</label>
                                    <input className="form-control" type="text" name="area" id="area" onChange={this.handleChange} value={form ? form.area : ''} />
                                    <br />
                                    <label htmlFor="id_locempresa" style={{ color: "white" }}>ID Locacion de empresa</label>
                                    <select className="form-control" type="text" name="id_locempresa" id="id_locempresa" onChange={this.handleChange} value={form ? form.id_locempresa : ''}>
                                        <option value="-- Elija un ID --"> -- Elija un ID -- </option>
                                        {this.state.loc_empresa.map(loc_empresa => (
                                            <option key={loc_empresa.id_locempresa} value={loc_empresa.id_locempresa}>{loc_empresa.nom_empresa}</option>
                                        ))
                                        }
                                    </select>
                                    {/*<input className="form-control" type="text" name="id_locempresa" id="id_locempresa" onChange={this.handleChange} value={form ? form.id_locempresa : ''}/>*/}
                                    <br />
                                    <label htmlFor="cargo" style={{ color: "white" }}>Cargo</label>
                                    <input className="form-control" type="text" name="cargo" id="cargo" onChange={this.handleChange} value={form ? form.cargo : ''} />
                                    <br />
                                    <label htmlFor="id_sede" style={{ color: "white" }}>ID Sede</label>
                                    <select className="form-control" type="text" name="id_sede" id="id_sede" onChange={this.handleChange} value={form ? form.id_sede : ''}>
                                        <option value="-- Elija un ID --"> -- Elija un ID -- </option>
                                        {this.state.sede.map(sede => (
                                            <option key={sede.id_sede} value={sede.id_sede}>{sede.nombre}</option>
                                        ))
                                        }
                                    </select>
                                    {/*<input className="form-control" type="text" name="id_sede" id="id_sede" onChange={this.handleChange} value={form ? form.id_sede : ''}/>*/}
                                    <br />
                                    <label htmlFor="id_ceco" style={{ color: "white" }}>ID Centro de Coste</label>
                                    <select className="form-control" type="text" name="id_ceco" id="id_ceco" onChange={this.handleChange} value={form ? form.id_ceco : ''}>
                                        <option value="-- Elija un ID --"> -- Elija un ID -- </option>
                                        {this.state.centro_de_coste.map(centro_de_coste => (
                                            <option key={centro_de_coste.id_ceco} value={centro_de_coste.id_ceco}>{centro_de_coste.descripcion}</option>
                                        ))
                                        }
                                    </select>
                                    {/*<input className="form-control" type="text" name="id_ceco" id="id_ceco" onChange={this.handleChange} value={form ? form.id_ceco : ''} />*/}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                {this.state.tipoModal === 'insertar' ?
                                    <button className="btn btn-success" onClick={() => this.MetodoPost()}>
                                        Insertar
                                    </button> : <button className="btn btn-primary" onClick={() => this.MetodoPut()}>
                                        Actualizar
                                    </button>
                                }
                                <button className="btn btn-danger" onClick={() => this.Insertar()}>Cancelar</button>
                            </ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.Eliminar}>
                            <ModalBody>
                                ¿Estás seguro que deseas eliminar al {form && form.cargo}: {form && form.nombre} {form && form.apellido}?
                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btn-danger" onClick={() => this.MetodoDelete()}>Sí</button>
                                <button className="btn btn-secundary" onClick={() => this.setState({ Eliminar: false })}>No</button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </body>
        )
    }
}
export default empleado;