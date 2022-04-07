import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUserTag, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
const url = "http://127.0.0.1:8000/cye/nivel_acceso/";
class nivel_acceso extends Component {
    state = {
        administrador: [],
        tipo: [],
        data: [],
        Insertar: false,
        form: {
            id_nivelacceso: 0,
            id_admin: 0,
            id_tipo: 0,
            estado: '',
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
        axios.put(url + this.state.form.id_nivelacceso + "/", this.state.form).then(response => {
            this.Insertar();
            this.MetodoGet();
        })
    }

    MetodoDelete = () => {
        axios.delete(url + this.state.form.id_nivelacceso).then(response => {
            this.setState({ Eliminar: false });
            this.MetodoGet();
        })
    }

    Insertar = () => {
        this.setState({ Insertar: !this.state.Insertar });
    }

    seleccionarNivelAcceso = (nivel_acceso) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id_nivelacceso: nivel_acceso.id_nivelacceso,
                id_admin: nivel_acceso.id_admin,
                id_tipo: nivel_acceso.id_tipo,
                estado: nivel_acceso.estado
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
            .get("http://127.0.0.1:8000/cye/administrador/")
            .then(response => {
                this.setState({ administrador: response.data });
            }).catch(error => {
                console.log(error.message);
            })
        axios
            .get("http://127.0.0.1:8000/cye/tipo/")
            .then(response => {
                this.setState({ tipo: response.data });
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
                        <h1>Lista de los Niveles de acceso Registrado</h1>
                        <div className="centro"><Link to={"/Busqueda_NivelAcceso/"} className="btn btn-warning">Hacer una Busqueda <FontAwesomeIcon icon={faSearch} /></Link></div>
                        <button type="button" className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.Insertar() }}>Agregar Nuevo Acceso <FontAwesomeIcon icon={faUserTag} /></button>
                        <Link to={"/"} className="btn btn-info derecho">Volver al Inicio <FontAwesomeIcon icon={faHome} /></Link>
                        <br />
                        <br />
                        <table className="table table-condensed col-sm-8 text-center  table-dark table-striped table-bordered table-responsive" border="1">
                            <thead>
                                <tr>
                                    <th>ID del Nivel de acceso</th>
                                    <th>Iniciales/Nombres del Empleado</th>
                                    <th>Tipo Administrado</th>
                                    <th>Estado</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.data.map(nivel_acceso => {
                                return (
                                    <tr key={nivel_acceso.id_nivelacceso}>
                                        <td>{nivel_acceso.id_nivelacceso}</td>
                                        <td>{nivel_acceso.id_admin}</td> {/*hay que ponerle una mejor descripcion letras*/}
                                        <td>{nivel_acceso.id_tipo}</td> {/*hay que ponerle una mejor descripcion letras*/}
                                        <td>{nivel_acceso.estado}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning mx-2" onClick={() => { this.seleccionarNivelAcceso(nivel_acceso); this.Insertar() }}>Editar <FontAwesomeIcon icon={faEdit} /></button>
                                            <button type="button" className="btn btn-danger" onClick={() => { this.seleccionarNivelAcceso(nivel_acceso); this.setState({ Eliminar: true }) }}>Eliminar <FontAwesomeIcon icon={faTrashAlt} /></button>
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
                                    <label htmlFor="id_nivelacceso" style={{ color: "white" }}>ID del Nivel de Acceso</label>
                                    <input className="form-control" type="text" name="id_nivelacceso" id="id_nivelacceso" onChange={this.handleChange} value={form ? form.id_nivelacceso : ''} />
                                    <br />
                                    <label htmlFor="id_admin" style={{ color: "white" }}>DNI del Administrador</label>
                                    <select className="form-control" type="text" name="id_admin" id="id_admin" onChange={this.handleChange} value={form ? form.id_admin : ''}>
                                        <option value="-- Elija un ID --"> -- Elija un ID -- </option>
                                        {this.state.administrador.map(administrador => (
                                            <option key={administrador.id_admin} value={administrador.id_admin}>{administrador.dni}</option>
                                        ))
                                        }
                                    </select>
                                    {/*<input className="form-control" type="text" name="id_admin" id="id_admin" onChange={this.handleChange} value={form ? form.id_admin : ''} />*/}
                                    <br />
                                    <label htmlFor="id_tipo" style={{ color: "white" }}>Tipo Administrado</label>
                                    <select className="form-control" type="text" name="id_tipo" id="id_tipo" onChange={this.handleChange} value={form ? form.id_tipo : ''}>
                                        <option value="-- Elija un ID --"> -- Elija un ID -- </option>
                                        {this.state.tipo.map(tipo => (
                                            <option key={tipo.id_tipo} value={tipo.id_tipo}>{tipo.descripcion}</option>
                                        ))
                                        }
                                    </select>
                                    {/*<input className="form-control" type="text" name="id_tipo" id="id_tipo" onChange={this.handleChange} value={form ? form.id_tipo : ''} />*/}
                                    <br />
                                    <label htmlFor="estado" style={{ color: "white" }}>Estado del administrador: [1= Activo , 0 = Inactivo]</label>
                                    <select className="form-control" type="text" name="estado" id="estado" onChange={this.handleChange} value={form ? form.estado : ''}>
                                        <option value=" -- Elija un Estado --"> -- Elija un Estado -- </option>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
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
                                ¿Estás seguro que deseas eliminar el acceso del Administrador identificado con el ID:  {form && form.id_admin}?
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
export default nivel_acceso;