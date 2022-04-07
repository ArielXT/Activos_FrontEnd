import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUserShield, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
const url = "http://127.0.0.1:8000/cye/administrador/";

class administrador extends Component {
    state = {
        empleado: [],
        data: [],
        Insertar: false,
        form: {
            id_admin: 0,
            dni: 0,
            estado: '',
            iniciales: ''
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
        axios.put(url + this.state.form.id_admin + "/", this.state.form).then(response => {
            this.Insertar();
            this.MetodoGet();
        })
    }

    MetodoDelete = () => {
        axios.delete(url + this.state.form.id_admin).then(response => {
            this.setState({ Eliminar: false });
            this.MetodoGet();
        })
    }

    Insertar = () => {
        this.setState({ Insertar: !this.state.Insertar });
    }

    seleccionarAdministrador = (administrador) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id_admin: administrador.id_admin,
                dni: administrador.dni,
                estado: administrador.estado,
                iniciales: administrador.iniciales
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
            .get("http://127.0.0.1:8000/cye/empleado/")
            .then(response => {
                this.setState({ empleado: response.data });
            }).catch(error => {
                console.log(error.message);
            })
    }

    render() {
        const { form } = this.state;
        return (
            <body className="back">
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
                    <h1>Lista de Administradores</h1>
                    <div className="centro"><Link to={"/Busqueda_Administrador/"} className="btn btn-warning">Hacer una Busqueda <FontAwesomeIcon icon={faSearch} /></Link></div>
                    <button type="button" className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.Insertar() }}>Agregar Nuevo Rol Administrador <FontAwesomeIcon icon={faUserShield} /></button>
                    <Link to={"/"} className="btn btn-info derecho">Volver al Inicio <FontAwesomeIcon icon={faHome} /></Link>
                    <br />
                    <br />
                    <table className="table table-condensed col-sm-8 text-center  table-dark table-striped table-bordered table-responsive" border="1">
                        <thead>
                            <tr>
                                <th>ID del Admin</th>
                                <th>DNI</th>
                                <th>Estado</th>
                                <th>Iniciales/Nombres del Empleado</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.data.map(administrador => {
                            return (
                                <tr key={administrador.id_admin}>
                                    <td>{administrador.id_admin}</td>
                                    <td>{administrador.dni}</td>
                                    <td>{administrador.estado}</td>
                                    <td>{administrador.iniciales}</td>
                                    <td>
                                        <button type="button" className="btn btn-warning mx-2" onClick={() => { this.seleccionarAdministrador(administrador); this.Insertar() }}>Editar <FontAwesomeIcon icon={faEdit} /></button>
                                        <button type="button" className="btn btn-danger" onClick={() => { this.seleccionarAdministrador(administrador); this.setState({ Eliminar: true }) }}>Eliminar <FontAwesomeIcon icon={faTrashAlt} /></button>
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
                                <label htmlFor="id_admin" style={{ color: "white" }}>ID Administrador</label>
                                <input className="form-control" type="text" name="id_admin" id="id_admin" onChange={this.handleChange} value={form ? form.id_admin : ''} />
                                <br />
                                <label htmlFor="dni" style={{ color: "white" }}>DNI</label>
                                <select className="form-control" type="text" name="dni" id="dni" onChange={this.handleChange} value={form ? form.dni : ''}>
                                    <option value="-- Elija un ID --"> -- Elija un DNI -- </option>
                                    {this.state.empleado.map(empleado => (
                                        <option key={empleado.dni} value={empleado.dni}>{empleado.dni} - {empleado.nombre}</option>
                                    ))
                                    }
                                </select>
                                {/*<input className="form-control" type="text" name="dni" id="dni" onChange={this.handleChange} value={form ? form.dni : ''} />*/}
                                <br />
                                <label htmlFor="estado" style={{ color: "white" }}>Estado del Administrador: </label>
                                <select className="form-control" type="text" name="estado" id="estado" onChange={this.handleChange} value={form ? form.estado : ''}>
                                    <option value=" -- Elija un Estado --"> -- Elija un Estado -- </option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                                <br />
                                <label htmlFor="iniciales" style={{ color: "white" }}>Iniciales/Nombres del empleado</label>
                                <input className="form-control" type="text" name="iniciales" id="iniciales" onChange={this.handleChange} value={form ? form.iniciales : ''} />
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
                            ¿Estás seguro que deseas eliminar a la administrador identificado con el ID: {form && form.id_admin}?
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-danger" onClick={() => this.MetodoDelete()}>Sí</button>
                            <button className="btn btn-secundary" onClick={() => this.setState({ Eliminar: false })}>No</button>
                        </ModalFooter>
                    </Modal>
                </div>
            </body>
        )
    }
}
export default administrador;