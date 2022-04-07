import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFileInvoice, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
const url = "http://127.0.0.1:8000/cye/contrato/";
class contrato extends Component {
    state = {
        proveedor: [],
        empresa: [],
        data: [],
        Insertar: false,
        form: {
            id_contrato: 0,
            id_proveedor: 0,
            id_empresa: 0,
            f_firma: '',
            estado: '',
            nombre: '',
            f_final: ''
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
        axios.put(url + this.state.form.id_contrato + "/", this.state.form).then(response => {
            this.Insertar();
            this.MetodoGet();
        })
    }

    MetodoDelete = () => {
        axios.delete(url + this.state.form.id_contrato).then(response => {
            this.setState({ Eliminar: false });
            this.MetodoGet();
        })
    }

    Insertar = () => {
        this.setState({ Insertar: !this.state.Insertar });
    }

    seleccionarContrato = (contrato) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id_contrato: contrato.id_contrato,
                id_proveedor: contrato.id_proveedor,
                id_empresa: contrato.id_empresa,
                f_firma: contrato.f_firma,
                estado: contrato.estado,
                nombre: contrato.nombre,
                f_final: contrato.f_final
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
            .get("http://127.0.0.1:8000/cye/proveedor/")
            .then(response => {
                this.setState({ proveedor: response.data });
            }).catch(error => {
                console.log(error.message);
            })
        axios
            .get("http://127.0.0.1:8000/cye/empresa/")
            .then(response => {
                this.setState({ empresa: response.data });
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
                        <h1>Lista de Contratos</h1>
                        <div className="centro"><Link to={"/Busqueda_Contrato/"} className="btn btn-warning">Hacer una Busqueda <FontAwesomeIcon icon={faSearch} /></Link></div>
                        <button type="button" className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.Insertar() }}>Agregar un Nuevo Contrato <FontAwesomeIcon icon={faFileInvoice} /></button>
                        <Link to={"/"} className="btn btn-info derecho">Volver al Inicio <FontAwesomeIcon icon={faHome} /></Link>
                        <br />
                        <br />
                        <table className="table table-condensed col-sm-8 text-center  table-dark table-striped table-bordered table-responsive" border="1">
                            <thead>
                                <tr>
                                    <th>ID Contrato</th>
                                    <th>Nombre del Proveedor</th>
                                    <th>Nombre de la Empresa</th>
                                    <th>Estado</th>
                                    <th>Nombre del contrato</th>
                                    <th>Fecha de la Firma</th>
                                    <th>Fecha Final</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.data.map(contrato => {
                                return (
                                    <tr key={contrato.id_contrato}>
                                        <td>{contrato.id_contrato}</td>
                                        <td>{contrato.id_proveedor}</td>
                                        <td>{contrato.id_empresa}</td>
                                        <td>{contrato.estado}</td>
                                        <td>{contrato.nombre}</td>
                                        <td>{contrato.f_firma}</td>
                                        <td>{contrato.f_final}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning mx-2" onClick={() => { this.seleccionarContrato(contrato); this.Insertar() }}>Editar <FontAwesomeIcon icon={faEdit} /></button>
                                            <button type="button" className="btn btn-danger" onClick={() => { this.seleccionarContrato(contrato); this.setState({ Eliminar: true }) }}>Eliminar <FontAwesomeIcon icon={faTrashAlt} /></button>
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
                                    <label htmlFor="id_contrato" style={{ color: "white" }}>ID Contrato</label>
                                    <input className="form-control" type="text" name="id_contrato" id="id_contrato" onChange={this.handleChange} value={form ? form.id_contrato : ''} />
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
                                    <label htmlFor="id_empresa" style={{ color: "white" }}>Nombre de la Empresa</label>
                                    <select className="form-control" type="text" name="id_empresa" id="id_empresa" onChange={this.handleChange} value={form ? form.id_empresa : ''}>
                                        <option value="-- Elija un ID --"> -- Elija un ID -- </option>
                                        {this.state.empresa.map(empresa => (
                                            <option key={empresa.id_empresa} value={empresa.id_empresa}>{empresa.descripcion}</option>
                                        ))
                                        }
                                    </select>
                                    {/*<input className="form-control" type="text" name="id_empresa" id="id_empresa" onChange={this.handleChange} value={form ? form.id_empresa : ''} />*/}
                                    <br />
                                    <label htmlFor="nombre" style={{ color: "white" }}>Nombre del contrato</label>
                                    <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} />
                                    <br />
                                    <label htmlFor="estado" style={{ color: "white" }}>Estado: </label>
                                    <select className="form-control" type="text" name="estado" id="estado" onChange={this.handleChange} value={form ? form.estado : ''}>
                                        <option value=" -- Elija un Estado --"> -- Elija un Estado -- </option>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                    <br />
                                    <label htmlFor="f_firma" style={{ color: "white" }}>Fecha de Firma hecha [Año-Mes-Dia] </label>
                                    <input className="form-control" type="text" name="f_firma" id="f_firma" onChange={this.handleChange} value={form ? form.f_firma : ''} />
                                    <br />
                                    <label htmlFor="f_final" style={{ color: "white" }}>Fecha final del Contrato [Año-Mes-Dia]</label>
                                    <input className="form-control" type="text" name="f_final" id="f_final" onChange={this.handleChange} value={form ? form.f_final : ''} />
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
                                ¿Estás seguro que deseas eliminar el Contrato de Id: {form && form.id_contrato}?
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
export default contrato;