import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faBox, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
const url = "http://127.0.0.1:8000/cye/activo_ti/";

class activo_ti extends Component {
    state = {
        tipo: [],
        data: [],
        Insertar: false,
        form: {
            id: 0,
            nombre: '',
            hostname: '',
            ip_interna: '',
            ip_externa: '',
            id_tipo: 0,
            usuario: '',
            clave: '',
            link: '',
            observacion: '',
            rol_servicio: '',
            clin_empresa: '',
            tipo: '',
            f_inicio: '',
            f_final: '',
            estado: '',
            descripcion: '',
            fabricante: '',
            marca: '',
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
        axios.put(url + this.state.form.id + "/", this.state.form).then(response => {
            this.Insertar();
            this.MetodoGet();
        })
    }

    MetodoDelete = () => {
        axios.delete(url + this.state.form.id).then(response => {
            this.setState({ Eliminar: false });
            this.MetodoGet();
        })
    }

    Insertar = () => {
        this.setState({ Insertar: !this.state.Insertar });
    }

    seleccionarActivoTi = (activo_ti) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: activo_ti.id,
                nombre: activo_ti.nombre,
                hostname: activo_ti.hostname,
                ip_interna: activo_ti.ip_interna,
                ip_externa: activo_ti.ip_externa,
                id_tipo: activo_ti.id_tipo,
                usuario: activo_ti.usuario,
                clave: activo_ti.clave,
                link: activo_ti.link,
                observacion: activo_ti.observacion,
                rol_servicio: activo_ti.rol_servicio,
                clin_empresa: activo_ti.clin_empresa,
                tipo: activo_ti.tipo,
                f_inicio: activo_ti.f_inicio,
                f_final: activo_ti.f_final,
                estado: activo_ti.estado,
                descripcion: activo_ti.descripcion,
                fabricante: activo_ti.fabricante,
                marca: activo_ti.marca,
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
                    <div className="right-container">
                        <br />
                        <br />
                        <h1>Lista de Activos TI</h1>
                        <br />
                        <div className="centro"><Link to={"/Busqueda_Activoti/"} className="btn btn-warning">Hacer una Busqueda <FontAwesomeIcon icon={faSearch} /></Link></div>
                        <button type="button" className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.Insertar() }}>Agregar Nuevo Activo <FontAwesomeIcon icon={faBox} /></button>
                        <Link to={"/"} className="btn btn-info derecho">Volver al Inicio <FontAwesomeIcon icon={faHome} /></Link>
                        <br />
                        <br />
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
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>{this.state.data.map(activo_ti => {
                                    return (
                                        <tr key={activo_ti.id}>
                                            <td className="centrando">{activo_ti.id}</td>
                                            <td className="centrando">{activo_ti.nombre}</td>
                                            <td className="centrando">{activo_ti.hostname}</td>
                                            <td className="centrando">{activo_ti.ip_interna}</td>
                                            <td className="centrando">{activo_ti.ip_externa}</td>
                                            <td className="centrando">{activo_ti.id_tipo}</td>{/*hay que ponerle una mejor descripcion letras*/}
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
                                            <td>
                                                <button type="button" className="btn btn-warning" onClick={() => { this.seleccionarActivoTi(activo_ti); this.Insertar() }}>Editar <FontAwesomeIcon icon={faEdit} /></button>
                                                <button type="button" className="btn btn-danger" onClick={() => { this.seleccionarActivoTi(activo_ti); this.setState({ Eliminar: true }) }}>Eliminar <FontAwesomeIcon icon={faTrashAlt} /></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        <Modal isOpen={this.state.Insertar} className="my-modal">
                            <ModalHeader style={{ display: 'block' }}>
                                <span style={{ float: 'right' }} onClick={() => this.Insertar()}>x</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="id" style={{ color: "white" }}>ID</label>
                                    <input className="form-control" type="text" name="id" id="id" onChange={this.handleChange} value={form ? form.id : ''} />
                                    <br />
                                    <label htmlFor="nombre" style={{ color: "white" }}>Nombre</label>
                                    <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} />
                                    <br />
                                    <label htmlFor="hostname" style={{ color: "white" }}>Hostname</label>
                                    <input className="form-control" type="text" name="hostname" id="hostname" onChange={this.handleChange} value={form ? form.hostname : ''} />
                                    <br />
                                    <label htmlFor="ip_interna" style={{ color: "white" }}>IP Interna</label>
                                    <input className="form-control" type="text" name="ip_interna" id="ip_interna" onChange={this.handleChange} value={form ? form.ip_interna : ''} />
                                    <br />
                                    <label htmlFor="ip_externa" style={{ color: "white" }}>IP Externa</label>
                                    <input className="form-control" type="text" name="ip_externa" id="ip_externa" onChange={this.handleChange} value={form ? form.ip_externa : ''} />
                                    <br />
                                    <label htmlFor="id_tipo" style={{ color: "white" }}>ID del Tipo de Administrador</label>
                                    <select className="form-control" type="text" name="id_tipo" id="id_tipo" onChange={this.handleChange} value={form ? form.id_tipo : ''}>
                                        <option value="-- Elija un ID --"> -- Elija un ID -- </option>
                                        {this.state.tipo.map(tipo => (
                                            <option key={tipo.id_tipo} value={tipo.id_tipo}>{tipo.descripcion}</option>
                                        ))
                                        }
                                    </select>
                                    {/*<input className="form-control" type="text" name="id_tipo" id="id_tipo" onChange={this.handleChange} value={form ? form.id_tipo : ''} />*/}
                                    <br />
                                    <label htmlFor="usuario" style={{ color: "white" }}>Usuario</label>
                                    <input className="form-control" type="text" name="usuario" id="usuario" onChange={this.handleChange} value={form ? form.usuario : ''} />
                                    <br />
                                    <label htmlFor="clave" style={{ color: "white" }}>Clave</label>
                                    <input className="form-control" type="text" name="clave" id="clave" onChange={this.handleChange} value={form ? form.clave : ''} />
                                    <br />
                                    <label htmlFor="link" style={{ color: "white" }}>Link</label>
                                    <input className="form-control" type="text" name="link" id="link" onChange={this.handleChange} value={form ? form.link : ''} />
                                    <br />
                                    <label htmlFor="observacion" style={{ color: "white" }}>Observacion</label>
                                    <input className="form-control" type="text" name="observacion" id="observacion" onChange={this.handleChange} value={form ? form.observacion : ''} />
                                    <br />
                                    <label htmlFor="rol_servicio" style={{ color: "white" }}>Rol del Servicio</label>
                                    <input className="form-control" type="text" name="rol_servicio" id="rol_servicio" onChange={this.handleChange} value={form ? form.rol_servicio : ''} />
                                    <br />
                                    <label htmlFor="clin_empresa" style={{ color: "white" }}>Clinte de Empresa</label>
                                    <input className="form-control" type="text" name="clin_empresa" id="clin_empresa" onChange={this.handleChange} value={form ? form.clin_empresa : ''} />
                                    <br />
                                    <label htmlFor="f_inicio" style={{ color: "white" }}>Fecha de Inicio [Año-Mes-Dia]</label>
                                    <input className="form-control" type="text" name="f_inicio" id="f_inicio" onChange={this.handleChange} value={form ? form.f_inicio : ''} />
                                    <br />
                                    <label htmlFor="f_final" style={{ color: "white" }}>Fecha de Final [Año-Mes-Dia]</label>
                                    <input className="form-control" type="text" name="f_final" id="f_final" onChange={this.handleChange} value={form ? form.f_final : ''} />
                                    <br />
                                    <label htmlFor="estado" style={{ color: "white" }}>Estado: </label>
                                    <select className="form-control" type="text" name="estado" id="estado" onChange={this.handleChange} value={form ? form.estado : ''}>
                                        <option value=" -- Elija un Estado --"> -- Elija un Estado -- </option>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                    <br />
                                    <label htmlFor="tipo" style={{ color: "white" }}>Tipo</label>
                                    <input className="form-control" type="text" name="tipo" id="tipo" onChange={this.handleChange} value={form ? form.tipo : ''} />
                                    <br />
                                    <label htmlFor="descripcion" style={{ color: "white" }}>Descripcion</label>
                                    <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={this.handleChange} value={form ? form.descripcion : ''} />
                                    <br />
                                    <label htmlFor="fabricante" style={{ color: "white" }}>Fabricante</label>
                                    <input className="form-control" type="text" name="fabricante" id="fabricante" onChange={this.handleChange} value={form ? form.fabricante : ''} />
                                    <br />
                                    <label htmlFor="marca" style={{ color: "white" }}>Marca</label>
                                    <input className="form-control" type="text" name="marca" id="marca" onChange={this.handleChange} value={form ? form.marca : ''} />
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
                                ¿Estás seguro que deseas eliminar el Activo:  {form && form.nombre}?
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
export default activo_ti;