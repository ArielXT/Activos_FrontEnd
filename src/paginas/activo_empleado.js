import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faIdCard, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
const url = "http://127.0.0.1:8000/cye/activo_empleado/";

class activo_empleado extends Component {
    state = {
        activo_ti: [],
        empleado: [],
        data: [],
        Insertar: false,
        form: {
            id_actempleado: 0,
            dni: '',
            id: 0,
            estado: '',
            f_inicio: '',
            f_fin: ''
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
        axios.put(url + this.state.form.id_actempleado + "/", this.state.form).then(response => {
            this.Insertar();
            this.MetodoGet();
        })
    }

    MetodoDelete = () => {
        axios.delete(url + this.state.form.id_actempleado).then(response => {
            this.setState({ Eliminar: false });
            this.MetodoGet();
        })
    }

    Insertar = () => {
        this.setState({ Insertar: !this.state.Insertar });
    }

    seleccionarActivoEmpleado = (activo_empleado) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id_actempleado: activo_empleado.id_actempleado,
                dni: activo_empleado.dni,
                id: activo_empleado.id,
                estado: activo_empleado.estado,
                f_inicio: activo_empleado.f_inicio,
                f_fin: activo_empleado.f_fin
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
            .get("http://127.0.0.1:8000/cye/activo_ti/")
            .then(response => {
                this.setState({ activo_ti: response.data });
            }).catch(error => {
                console.log(error.message);
            })
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
                        <h1>Lista de Empleados con un Activo</h1>
                        <br />
                        <div className="centro"><Link to={"/Busqueda_ActivoEmpleado/"} className="btn btn-warning">Hacer una Busqueda <FontAwesomeIcon icon={faSearch} /></Link></div>
                        <button type="button" className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.Insertar() }}>Registrar Nuevo Empleado Activo <FontAwesomeIcon icon={faIdCard} /></button>
                        <Link to={"/"} className="btn btn-info derecho">Volver al Inicio <FontAwesomeIcon icon={faHome} /></Link>
                        <br />
                        <br />
                        <table className="table table-condensed col-sm-8 text-center  table-dark table-striped table-bordered table-responsive" border="1">
                            <thead>
                                <tr>
                                    <th>ID Activo Empleado</th>
                                    <th>DNI del Empleado</th>
                                    <th>Nombre del Activo Asignado</th>
                                    <th>Estado</th>
                                    <th>Fecha de inicio</th>
                                    <th>Fecha Final</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.data.map(activo_empleado => {
                                return (
                                    <tr key={activo_empleado.id_actempleado}>
                                        <td>{activo_empleado.id_actempleado}</td>
                                        <td>{activo_empleado.dni}</td>
                                        <td>{activo_empleado.id}</td>
                                        <td>{activo_empleado.estado}</td>
                                        <td>{activo_empleado.f_inicio}</td>
                                        <td>{activo_empleado.f_fin}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning mx-2" onClick={() => { this.seleccionarActivoEmpleado(activo_empleado); this.Insertar() }}>Editar <FontAwesomeIcon icon={faEdit} /></button>
                                            <button type="button" className="btn btn-danger" onClick={() => { this.seleccionarActivoEmpleado(activo_empleado); this.setState({ Eliminar: true }) }}>Eliminar <FontAwesomeIcon icon={faTrashAlt} /></button>
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
                                    <label htmlFor="id_actempleado" style={{ color: "white" }}>ID Activo Empleado</label>
                                    <input className="form-control" type="text" name="id_actempleado" id="id_actempleado" onChange={this.handleChange} value={form ? form.id_actempleado : ''} />
                                    <br />
                                    <label htmlFor="dni" style={{ color: "white" }}>DNI  del Empleado</label>
                                    <select className="form-control" type="text" name="dni" id="dni" onChange={this.handleChange} value={form ? form.dni : ''}>
                                        <option value="-- Elija un ID --"> -- Elija un ID -- </option>
                                        {this.state.empleado.map(empleado => (
                                            <option key={empleado.dni} value={empleado.dni}>{empleado.dni} - {empleado.nombre}</option>
                                        ))
                                        }
                                    </select>
                                    {/*<input className="form-control" type="text" name="dni" id="dni" onChange={this.handleChange} value={form ? form.dni : ''} />*/}
                                    <br />
                                    <label htmlFor="id" style={{ color: "white" }}>Nombre del Activo Asignado</label>
                                    <select className="form-control" type="text" name="id" id="id" onChange={this.handleChange} value={form ? form.id : ''}>
                                        <option value="-- Elija un ID --"> -- Elija un ID -- </option>
                                        {this.state.activo_ti.map(activo_ti => (
                                            <option key={activo_ti.id} value={activo_ti.id}>{activo_ti.nombre}</option>
                                        ))
                                        }
                                    </select>
                                    {/*<input className="form-control" type="text" name="id" id="id" onChange={this.handleChange} value={form ? form.id : ''} />*/}
                                    <br />
                                    <label htmlFor="estado" style={{ color: "white" }}>Estado Del Empleado: </label>
                                    <select className="form-control" type="text" name="estado" id="estado" onChange={this.handleChange} value={form ? form.estado : ''}>
                                        <option value=" -- Elija un Estado --"> -- Elija un Estado -- </option>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                    <br />
                                    <label htmlFor="f_inicio" style={{ color: "white" }}>Fecha de Inicio [Año-Mes-Dia]</label>
                                    <input className="form-control" type="text" name="f_inicio" id="f_inicio" onChange={this.handleChange} value={form ? form.f_inicio : ''} />
                                    <br />
                                    <label htmlFor="f_fin" style={{ color: "white" }}>Fecha de Fin [Año-Mes-Dia]</label>
                                    <input className="form-control" type="text" name="f_fin" id="f_fin" onChange={this.handleChange} value={form ? form.f_fin : ''} />
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
                                ¿Estás seguro que deseas eliminar al trabajador de DNI: {form && form.dni}?
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
export default activo_empleado;