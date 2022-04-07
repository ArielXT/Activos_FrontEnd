import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUserCircle, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
const url = "http://127.0.0.1:8000/cye/activo_prov/";
class activo_prov extends Component {
    state = {
        activo_ti: [],
        prov_servicio: [],
        data: [],
        Insertar: false,
        form: {
            id_actprov: 0,
            id: 0,
            id_provservicio: 0
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
        axios.put(url + this.state.form.id_actprov + "/", this.state.form).then(response => {
            this.Insertar();
            this.MetodoGet();
        })
    }

    MetodoDelete = () => {
        axios.delete(url + this.state.form.id_actprov).then(response => {
            this.setState({ Eliminar: false });
            this.MetodoGet();
        })
    }

    Insertar = () => {
        this.setState({ Insertar: !this.state.Insertar });
    }

    seleccionarActivoProv = (activo_prov) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id_actprov: activo_prov.id_actprov,
                id: activo_prov.id,
                id_provservicio: activo_prov.id_provservicio
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
            .get("http://127.0.0.1:8000/cye/prov_servicio/")
            .then(response => {
                this.setState({ prov_servicio: response.data });
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
                        <h1>Lista de Proveedores Activos</h1>
                        <div className="centro"><Link to={"/Busqueda_ActivoProv/"} className="btn btn-warning">Hacer una Busqueda <FontAwesomeIcon icon={faSearch} /></Link></div>
                        <button type="button" className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.Insertar() }}>Agregar Un Nuevo Proveedor Activo <FontAwesomeIcon icon={faUserCircle} /></button>
                        <Link to={"/"} className="btn btn-info derecho">Volver al Inicio <FontAwesomeIcon icon={faHome} /></Link>
                        <br />
                        <br />
                        <table className="table table-condensed col-sm-8 text-center  table-dark table-striped table-bordered table-responsive" border="1">
                            <thead>
                                <tr>
                                    <th>ID de Prov_Servicio Activo</th>
                                    <th>Nombre del Activo</th>
                                    <th>Nombre/Tipo de la Prestación</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.data.map(activo_prov => {
                                return (
                                    <tr key={activo_prov.id_actprov}>
                                        <td>{activo_prov.id_actprov}</td>
                                        <td>{activo_prov.id}</td>{/*hay que ponerle una mejor descripcion letras*/}
                                        <td>{activo_prov.id_provservicio}</td>{/*hay que ponerle una mejor descripcion letras*/}
                                        <td>
                                            <button type="button" className="btn btn-warning mx-2" onClick={() => { this.seleccionarActivoProv(activo_prov); this.Insertar() }}>Editar <FontAwesomeIcon icon={faEdit} /></button>
                                            <button type="button" className="btn btn-danger" onClick={() => { this.seleccionarActivoProv(activo_prov); this.setState({ Eliminar: true }) }}>Eliminar <FontAwesomeIcon icon={faTrashAlt} /></button>
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
                                    <label htmlFor="id_actprov" style={{ color: "white" }}>ID de Prov_Servicio Activo</label>
                                    <input className="form-control" type="text" name="id_actprov" id="id_actprov" onChange={this.handleChange} value={form ? form.id_actprov : ''} />
                                    <br />
                                    <label htmlFor="id" style={{ color: "white" }}>Nombre del Activo</label>
                                    <select className="form-control" type="text" name="id" id="id" onChange={this.handleChange} value={form ? form.id : ''}>
                                        <option value="-- Elija un ID --"> -- Elija un ID -- </option>
                                        {this.state.activo_ti.map(activo_ti => (
                                            <option key={activo_ti.id} value={activo_ti.id}>{activo_ti.nombre}</option>
                                        ))
                                        }
                                    </select>
                                    {/*<input className="form-control" type="text" name="id" id="id" onChange={this.handleChange} value={form ? form.id : ''} />*/}
                                    <br />
                                    <label htmlFor="id_provservicio" style={{ color: "white" }}>Nombre/Tipo de la Prestación</label>
                                    <select className="form-control" type="text" name="id_provservicio" id="id_provservicio" onChange={this.handleChange} value={form ? form.id_provservicio : ''}>
                                        <option value="-- Elija un ID --"> -- Elija un ID -- </option>
                                        {this.state.prov_servicio.map(prov_servicio => (
                                            <option key={prov_servicio.id_provservicio} value={prov_servicio.id_provservicio}>{prov_servicio.nombre}</option>
                                        ))
                                        }
                                    </select>
                                    {/*<input className="form-control" type="text" name="id_provservicio" id="id_provservicio" onChange={this.handleChange} value={form ? form.id_provservicio : ''} />*/}
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
                                ¿Estás seguro que deseas eliminar el Activo Identificado con el ID:  {form && form.id_actprov}?
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
export default activo_prov;