import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faHotel, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
const url = "http://127.0.0.1:8000/cye/empresa/";
class empresa extends Component {
    state = {
        data: [],
        Insertar: false,
        form: {
            id_empresa: 0,
            descripcion: '',
            ruc: 0,
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
        axios.put(url + this.state.form.id_empresa + "/", this.state.form).then(response => {
            this.Insertar();
            this.MetodoGet();
        })
    }

    MetodoDelete = () => {
        axios.delete(url + this.state.form.id_empresa).then(response => {
            this.setState({ Eliminar: false });
            this.MetodoGet();
        })
    }

    Insertar = () => {
        this.setState({ Insertar: !this.state.Insertar });
    }

    seleccionarEmpresa = (empresa) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id_empresa: empresa.id_empresa,
                descripcion: empresa.descripcion,
                ruc: empresa.ruc
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
                        <h1>Lista de Empresas</h1>
                        <div className="centro"><Link to={"/Busqueda_Empresa/"} className="btn btn-warning">Hacer una Busqueda <FontAwesomeIcon icon={faSearch} /></Link></div>
                        <button type="button" className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.Insertar() }}>Agregar Una Nueva Empresa <FontAwesomeIcon icon={faHotel} /></button>
                        <Link to={"/"} className="btn btn-info derecho">Volver al Inicio <FontAwesomeIcon icon={faHome} /></Link>
                        <br />
                        <br />
                        <table className="table table-condensed col-sm-8 text-center  table-dark table-striped table-bordered table-responsive" border="1">
                            <thead>
                                <tr>
                                    <th>Id Empresa</th>
                                    <th>Descripcion</th>
                                    <th>Ruc</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.data.map(empresa => {
                                return (
                                    <tr key={empresa.id_empresa}>
                                        <td className="centrando">{empresa.id_empresa}</td>
                                        <td className="centrando">{empresa.descripcion}</td>
                                        <td className="centrando">{empresa.ruc}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning mx-2" onClick={() => { this.seleccionarEmpresa(empresa); this.Insertar() }}>Editar <FontAwesomeIcon icon={faEdit} /></button>
                                            <button type="button" className="btn btn-danger" onClick={() => { this.seleccionarEmpresa(empresa); this.setState({ Eliminar: true }) }}>Eliminar <FontAwesomeIcon icon={faTrashAlt} /></button>
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
                                    <label htmlFor="id_empresa" style={{ color: "white" }}>Id Empresa</label>
                                    <input className="form-control" type="text" name="id_empresa" id="id_empresa" onChange={this.handleChange} value={form ? form.id_empresa : ''} />
                                    <br />
                                    <label htmlFor="descripcion" style={{ color: "white" }}>Descripcion</label>
                                    <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={this.handleChange} value={form ? form.descripcion : ''} />
                                    <br />
                                    <label htmlFor="ruc" style={{ color: "white" }}>Ruc</label>
                                    <input className="form-control" type="text" name="ruc" id="ruc" onChange={this.handleChange} value={form ? form.ruc : ''} />
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
                                ¿Estás seguro que deseas eliminar la empresa {form && form.descripcion}?
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
export default empresa;