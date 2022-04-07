import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faWalking, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
const url = "http://127.0.0.1:8000/cye/prov_servicio/";

class prov_servicio extends Component {
    state = {
        servicio: [],
        proveedor: [],
        data: [],
        Insertar: false,
        form: {
            id_provservicio: 0,
            id_proveedor: 0,
            id_servicio: 0,
            nombre: '',
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
        axios.put(url + this.state.form.id_provservicio + "/", this.state.form).then(response => {
            this.Insertar();
            this.MetodoGet();
        })
    }

    MetodoDelete = () => {
        axios.delete(url + this.state.form.id_provservicio).then(response => {
            this.setState({ Eliminar: false });
            this.MetodoGet();
        })
    }

    Insertar = () => {
        this.setState({ Insertar: !this.state.Insertar });
    }

    seleccionarProvServicio = (prov_servicio) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id_provservicio: prov_servicio.id_provservicio,
                id_proveedor: prov_servicio.id_proveedor,
                id_servicio: prov_servicio.id_servicio,
                nombre: prov_servicio.nombre
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
            .get("http://127.0.0.1:8000/cye/servicio/")
            .then(response => {
                this.setState({ servicio: response.data });
            }).catch(error => {
                console.log(error.message);
            })
        axios
            .get("http://127.0.0.1:8000/cye/proveedor/")
            .then(response => {
                this.setState({ proveedor: response.data });
            }).catch(error => {
                console.log(error.message);
            })
    }

    render() {
        const { form } = this.state;
        return (
            <body className="back">
                <div className="tiledBackground" style={{ backgroundImage: "url(/night.jpg)" }}>
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
                        <h1>Lista de Servicio que ofrece el Proveedor</h1>
                        <div className="centro"><Link to={"/Busqueda_ProvServicio/"} className="btn btn-warning">Hacer una Busqueda <FontAwesomeIcon icon={faSearch} /></Link></div>
                        <button type="button" className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.Insertar() }}>Agregar Un Nuevo Servicio de Proveedor <FontAwesomeIcon icon={faWalking} /></button>
                        <Link to={"/"} className="btn btn-info derecho">Volver al Inicio <FontAwesomeIcon icon={faHome} /></Link>
                        <br />
                        <br />
                        <table className="table table-condensed col-sm-8 text-center  table-dark table-striped table-bordered table-responsive" border="1">
                            <thead>
                                <tr>
                                    <th>ID Prov_Servicio</th>
                                    <th>Nombre del Proveedor</th>
                                    <th>Nombre del Servicio</th>
                                    <th>Nombre/Tipo de la Prestación</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.data.map(prov_servicio => {
                                return (
                                    <tr key={prov_servicio.id_provservicio}>
                                        <td>{prov_servicio.id_provservicio}</td>
                                        <td>{prov_servicio.id_proveedor}</td> {/*hay que ponerle una mejor descripcion letras*/}
                                        <td>{prov_servicio.id_servicio}</td> {/*hay que ponerle una mejor descripcion letras*/}
                                        <td>{prov_servicio.nombre}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning mx-2" onClick={() => { this.seleccionarProvServicio(prov_servicio); this.Insertar() }}>Editar <FontAwesomeIcon icon={faEdit} /></button>
                                            <button type="button" className="btn btn-danger" onClick={() => { this.seleccionarProvServicio(prov_servicio); this.setState({ Eliminar: true }) }}>Eliminar <FontAwesomeIcon icon={faTrashAlt} /></button>
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
                                    <label htmlFor="id_provservicio" style={{ color: "white" }}>ID Prov_Servicio</label>
                                    <input className="form-control" type="text" name="id_provservicio" id="id_provservicio" onChange={this.handleChange} value={form ? form.id_provservicio : ''} />
                                    <br />
                                    <label htmlFor="id_proveedor" style={{ color: "white" }}>Nombre del Proveedor</label>
                                    <select className="form-control" type="text" name="id_proveedor" id="id_proveedor" onChange={this.handleChange} value={form ? form.id_proveedor : ''}>
                                        <option value="-- Elija un ID --"> -- Elija un ID -- </option>
                                        {this.state.proveedor.map(proveedor => (
                                            <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>{proveedor.nombre}</option>
                                        ))
                                        }
                                    </select>
                                    {/*<input className="form-control" type="text" name="id_proveedor" id="id_proveedor" onChange={this.handleChange} value={form ? form.id_proveedor : ''} />*/}
                                    <br />
                                    <label htmlFor="id_servicio" style={{ color: "white" }}>Nombre del Servicio</label>
                                    <select className="form-control" type="text" name="id_servicio" id="id_servicio" onChange={this.handleChange} value={form ? form.id_servicio : ''}>
                                        <option value="-- Elija un ID --"> -- Elija un ID -- </option>
                                        {this.state.servicio.map(servicio => (
                                            <option key={servicio.id_servicio} value={servicio.id_servicio}>{servicio.nombre_larg}</option>
                                        ))
                                        }
                                    </select>
                                    {/*<input className="form-control" type="text" name="id_servicio" id="id_servicio" onChange={this.handleChange} value={form ? form.id_servicio : ''} />*/}
                                    <br />
                                    <label htmlFor="nombre" style={{ color: "white" }}>Nombre/Tipo de la Prestación</label>
                                    <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} />
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
                                ¿Estás seguro que deseas eliminar al Proveedor:  {form && form.nombre}?
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
export default prov_servicio;