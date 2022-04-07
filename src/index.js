import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route,BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Paginas from './paginas/empleado'
import empleado from './paginas/empleado'
import Paginas2 from './paginas/loc_empresa'
import loc_empresa from './paginas/loc_empresa'
import Paginas3 from './paginas/centro_de_coste'
import centro_de_coste from './paginas/centro_de_coste'
import Paginas4 from './paginas/sede'
import sede from './paginas/sede'
import Paginas5 from './paginas/activo_empleado'
import activo_empleado from './paginas/activo_empleado'
import Paginas6 from './paginas/administrador'
import administrador from './paginas/administrador'
import Paginas7 from './paginas/nivel_acceso'
import nivel_acceso from './paginas/nivel_acceso'
import Paginas8 from './paginas/tipo'
import tipo from './paginas/tipo'
import Paginas9 from './paginas/activo_ti'
import activo_ti from './paginas/activo_ti'
import Paginas10 from './paginas/activo_prov'
import activo_prov from './paginas/activo_prov'
import Paginas11 from './paginas/prov_servicio'
import prov_servicio from './paginas/prov_servicio'
import Paginas12 from './paginas/proveedor'
import proveedor from './paginas/proveedor'
import Paginas13 from './paginas/servicio'
import servicio from './paginas/servicio'
import Paginas14 from './paginas/empresa'
import empresa from './paginas/empresa'
import Paginas15 from './paginas/contrato'
import contrato from './paginas/contrato'
import Paginas16 from './paginas/activo_contrato'
import activo_contrato from './paginas/activo_contrato'
import Busqueda_ActivoContrato from './paginas/Busqueda_ActivoContrato'
import Busqueda_ActivoEmpleado from './paginas/Busqueda_ActivoEmpleado'
import Busqueda_ActivoProv from './paginas/Busqueda_ActivoProv'
import Busqueda_Activoti from './paginas/Busqueda_Activoti'
import Busqueda_Administrador from './paginas/Busqueda_Administrador'
import Busqueda_Contrato from './paginas/Busqueda_Contrato'
import Busqueda_Empleado from './paginas/Busqueda_Empleado'
import Busqueda_Empresa from './paginas/Busqueda_Empresa'
import Busqueda_NivelAcceso from './paginas/Busqueda_NivelAcceso'
import Busqueda_Proveedor from './paginas/Busqueda_Proveedor'
import Busqueda_ProvServicio from './paginas/Busqueda_ProvServicio'
import Busqueda_Servicio from './paginas/Busqueda_Servicio'


const routing = (
  <Router>
      <Route exact path="/" component={App} />
      <Route exact path="/empleado/" component={empleado} />
      <Route exact path="/empleado/:dni" render={
          props => {
            var dni = props.match.params.dni;
            return <Paginas dni={dni} />
          }
        } />
      <Route exact path="/loc_empresa/" component={loc_empresa} />
      <Route exact path="/loc_empresa/:id_locempresa" render={
          props => {
            var id_locempresa = props.match.params.id_locempresa;
            return <Paginas2 id_locempresa={id_locempresa} />
          }
        } />
      <Route exact path="/centro_de_coste/" component={centro_de_coste} />
      <Route exact path="/centro_de_coste/:id_ceco" render={
          props => {
            var id_ceco = props.match.params.id_ceco;
            return <Paginas3 id_ceco={id_ceco} />
          }
        } />
      <Route exact path="/sede/" component={sede} />
      <Route exact path="/sede/:id_sede" render={
          props => {
            var id_sede = props.match.params.id_sede;
            return <Paginas4 id_sede={id_sede} />
          }
        } />
      <Route exact path="/activo_empleado/" component={activo_empleado} />
      <Route exact path="/activo_empleado/:id" render={
          props => {
            var id = props.match.params.id;
            return <Paginas5 id={id} />
          }
        } />
      <Route exact path="/administrador/" component={administrador} />
      <Route exact path="/administrador/:id_admin" render={
          props => {
            var id_admin = props.match.params.id_admin;
            return <Paginas6 id_admin={id_admin} />
          }
        } />
      <Route exact path="/nivel_acceso/" component={nivel_acceso} />
      <Route exact path="/nivel_acceso/:id_admin" render={
          props => {
            var id_admin = props.match.params.id_admin;
            return <Paginas7 id_admin={id_admin} />
          }
        } />
      <Route exact path="/tipo/" component={tipo} />
      <Route exact path="/tipo/:id_tipo" render={
          props => {
            var id_tipo = props.match.params.id_tipo;
            return <Paginas8 id_tipo={id_tipo} />
          }
        } />
      <Route exact path="/activo_ti/" component={activo_ti} />
      <Route exact path="/activo_ti/:id" render={
          props => {
            var id = props.match.params.id;
            return <Paginas9 id={id} />
          }
        } />
      <Route exact path="/activo_prov/" component={activo_prov} />
      <Route exact path="/activo_prov/:id" render={
          props => {
            var id = props.match.params.id;
            return <Paginas10 id={id} />
          }
        } />
      <Route exact path="/prov_servicio/" component={prov_servicio} />
      <Route exact path="/prov_servicio/:id_proveedor" render={
          props => {
            var id_proveedor = props.match.params.id_proveedor;
            return <Paginas11 id_proveedor={id_proveedor} />
          }
        } />
      <Route exact path="/proveedor/" component={proveedor} />
      <Route exact path="/proveedor/:id_proveedor" render={
          props => {
            var id_proveedor = props.match.params.id_proveedor;
            return <Paginas12 id_proveedor={id_proveedor} />
          }
        } />
      <Route exact path="/servicio/" component={servicio} />
      <Route exact path="/servicio/:id_servicio" render={
          props => {
            var id_servicio = props.match.params.id_servicio;
            return <Paginas13 id_servicio={id_servicio} />
          }
        } />
      <Route exact path="/empresa/" component={empresa} />
      <Route exact path="/empresa/:id_empresa" render={
          props => {
            var id_empresa = props.match.params.id_empresa;
            return <Paginas14 id_empresa={id_empresa} />
          }
        } />
      <Route exact path="/contrato/" component={contrato} />
      <Route exact path="/contrato/:id_contrato" render={
          props => {
            var id_contrato = props.match.params.id_contrato;
            return <Paginas15 id_contrato={id_contrato} />
          }
        } />
      <Route exact path="/activo_contrato/" component={activo_contrato} />
      <Route exact path="/activo_contrato/:id" render={
          props => {
            var id = props.match.params.id;
            return <Paginas16 id={id} />
          }
        } />
      <Route exact path="/Busqueda_ActivoContrato/" component={Busqueda_ActivoContrato} />
      <Route exact path="/Busqueda_ActivoEmpleado/" component={Busqueda_ActivoEmpleado} />
      <Route exact path="/Busqueda_ActivoProv/" component={Busqueda_ActivoProv} />
      <Route exact path="/Busqueda_Activoti/" component={Busqueda_Activoti} />
      <Route exact path="/Busqueda_Administrador/" component={Busqueda_Administrador} />
      <Route exact path="/Busqueda_Contrato/" component={Busqueda_Contrato} />
      <Route exact path="/Busqueda_Empleado/" component={Busqueda_Empleado} />
      <Route exact path="/Busqueda_Empresa/" component={Busqueda_Empresa} />
      <Route exact path="/Busqueda_NivelAcceso/" component={Busqueda_NivelAcceso} />
      <Route exact path="/Busqueda_Proveedor/" component={Busqueda_Proveedor} />
      <Route exact path="/Busqueda_ProvServicio/" component={Busqueda_ProvServicio} />
      <Route exact path="/Busqueda_Servicio/" component={Busqueda_Servicio} />
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))