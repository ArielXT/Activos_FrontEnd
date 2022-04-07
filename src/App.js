import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWalking, faTruck, faBuilding, faMapMarkedAlt, faIdCard, faUserShield,
  faUserTag, faBox, faUserCircle, faWarehouse, faHotel, faFileInvoice, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Card } from 'react-bootstrap'

class App extends Component {
  render() {
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
            <Card className="bg-dark">
              <Card.Img className="imgsize" src="/consultoria.jpg" alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title className="cardsize">Consultoria <br />y<br /> Estrategia</Card.Title>
              </Card.ImgOverlay>
            </Card>
            <hr />
          </div>
          <div className="container">
            <div className="row card-group">
              <div className="col-12">
                <Card bg="secondary" className="text-center">
                  <Card.Img variant="top" src="/search.png" />
                  <Card.Body>
                    <Card.Text className="strong">
                      Busqueda de Activos
                    </Card.Text>
                    <NavLink to={"/Busqueda_Activoti/"} className="btn btn-success">Hacer Una Busqueda <FontAwesomeIcon icon={faSearch} /></NavLink>
                  </Card.Body>
                  <Card.Footer />
                </Card>
              </div>
            </div>
            <hr />
          </div>
          <div className="container">
            <div className="row card-group">
              <div className="col-12">
                <Card bg="secondary" className="text-center">
                  <Card.Body>
                    <Card.Text className="strong">
                      Buscar:
                    </Card.Text>
                    <NavLink to={"/Busqueda_Empleado/"} className="btn btn-success">Empleado <FontAwesomeIcon icon={faSearch} /></NavLink>
                    &nbsp;
                    <NavLink to={"/Busqueda_Administrador/"} className="btn btn-success">Administrador <FontAwesomeIcon icon={faSearch} /></NavLink>
                    &nbsp;
                    <NavLink to={"/Busqueda_NivelAcceso/"} className="btn btn-success">Nivel Acceso <FontAwesomeIcon icon={faSearch} /></NavLink>
                    &nbsp;
                    <NavLink to={"/Busqueda_Activoti/"} className="btn btn-success">Activo TI <FontAwesomeIcon icon={faSearch} /></NavLink>
                    &nbsp;
                    <NavLink to={"/Busqueda_Proveedor/"} className="btn btn-success">Proveedor <FontAwesomeIcon icon={faSearch} /></NavLink>
                    &nbsp;
                    <NavLink to={"/Busqueda_Servicio/"} className="btn btn-success">Servicio <FontAwesomeIcon icon={faSearch} /></NavLink>
                    &nbsp;
                    <NavLink to={"/Busqueda_ProvServicio/"} className="btn btn-success">Proveedor Servicio <FontAwesomeIcon icon={faSearch} /></NavLink>
                    &nbsp;
                    <NavLink to={"/Busqueda_ActivoProv/"} className="btn btn-success">Activo Proveedor <FontAwesomeIcon icon={faSearch} /></NavLink>
                    <br/><br/>
                    <NavLink to={"/Busqueda_Empresa/"} className="btn btn-success">Empresa <FontAwesomeIcon icon={faSearch} /></NavLink>
                    &nbsp;
                    <NavLink to={"/Busqueda_Contrato/"} className="btn btn-success">Contrato <FontAwesomeIcon icon={faSearch} /></NavLink>
                    &nbsp;
                    <NavLink to={"/Busqueda_ActivoContrato/"} className="btn btn-success">Activo Contrato <FontAwesomeIcon icon={faSearch} /></NavLink>                    
                    &nbsp;
                    <NavLink to={"/Busqueda_ActivoEmpleado/"} className="btn btn-success">Activo Empleado <FontAwesomeIcon icon={faSearch} /></NavLink>
                  </Card.Body>
                  <Card.Footer />
                </Card>
              </div>
            </div>
            <hr />
          </div>
          <br />
          <div className="container">
            <div className="row card-group">
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/location.jpg" />
                  <Card.Body>
                    <Card.Title>Locaciones de la Empresa</Card.Title>
                    <NavLink to={"/loc_empresa/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faBuilding} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/costo.png" />
                  <Card.Body>
                    <Card.Title>Centro de Coste</Card.Title>
                    <NavLink to={"/centro_de_coste/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faBuilding} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/precor1.jpg" />
                  <Card.Body>
                    <Card.Title>Sedes</Card.Title>
                    <NavLink to={"/sede/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faMapMarkedAlt} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/family.png" />
                  <Card.Body>
                    <Card.Title>Empleados</Card.Title>
                    <NavLink to={"/empleado/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faIdCard} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <br />
            <div className="row card-group">
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/radmin.jpg" />
                  <Card.Body>
                    <Card.Title>Tipo al que se Administra</Card.Title><br />
                    <NavLink to={"/tipo/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faUserShield} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/admin.jpg" />
                  <Card.Body>
                    <Card.Title>Administradores</Card.Title><br />
                    <NavLink to={"/administrador/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faUserShield} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/rol.jpg" />
                  <Card.Body>
                    <Card.Title>Registro de el Nivel de Acceso</Card.Title>
                    <NavLink to={"/nivel_acceso/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faUserTag} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/activos.png" />
                  <Card.Body>
                    <Card.Title>Lista de Activos TI</Card.Title><br />
                    <NavLink to={"/activo_ti/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faBox} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <br />
            <div className="row card-group">
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/prov.png" />
                  <Card.Body>
                    <Card.Title>Lista de Proveedores</Card.Title><br />
                    <NavLink to={"/proveedor/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faTruck} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/servicio.png" />
                  <Card.Body>
                    <Card.Title>Lista de Servicios</Card.Title><br />
                    <NavLink to={"/servicio/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faWarehouse} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/hand.png" />
                  <Card.Body>
                    <Card.Title>Registro de Proveedor y Servicio</Card.Title>
                    <NavLink to={"/prov_servicio/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faWalking} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/proveedor.jpg" />
                  <Card.Body>
                    <Card.Title>Lista de Proveedores Activos</Card.Title>
                    <NavLink to={"/activo_prov/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faUserCircle} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <br />
            <div className="row card-group">
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/empresa.png" />
                  <Card.Body>
                    <Card.Title>Lista de Empresas</Card.Title>
                    <NavLink to={"/empresa/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faHotel} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/contrato.png" />
                  <Card.Body>
                    <Card.Title>Lista de contratos</Card.Title>
                    <NavLink to={"/contrato/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faFileInvoice} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/activocontrato.png" />
                  <Card.Body>
                    <Card.Title>Lista de Contratos Activos</Card.Title>
                    <NavLink to={"/activo_contrato/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faFileInvoice} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-3">
                <Card bg="secondary" className="text-center" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="/employee.png" />
                  <Card.Body>
                    <Card.Title>Registro de Empleados con Activos Asignados</Card.Title>
                    <NavLink to={"/activo_empleado/"} className="btn btn-success">Ir a la tabla <FontAwesomeIcon icon={faIdCard} /></NavLink>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <hr />
          </div>
          <br />
        </div>        
      </body>
    )
  }
}
export default App;