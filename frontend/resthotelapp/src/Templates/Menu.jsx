import React, { useEffect, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import 'cdbreact';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/styleMenu.css'

export default function Menu(props) {
  const [listaMenus, setListaMenus] = useState(null)
  const [listaSubMenus, setListaSubMenus] = useState(null)
  
  const criarMenus = () => {
    const listaItens = []

    for (const menu of listaMenus) {
      if (menu.permissao_menu.caminho == '#') {
        const subMenuAtual = listaSubMenus.filter((item) => item.menu_id === menu.menu_id)
        listaItens.push(
          <div className="nav-item dropdown">
            <a href='#' key={menu.menu_id} className='nav-link dropdown-toggle' data-bs-toggle='dropdown'>
              {menu.permissao_menu.nome}
            </a>
            <div className="dropdown-menu bg-light rounded-0 rounded-bottom m-0">
              {
                subMenuAtual.map((submenu) => (
                  <NavLink 
                    key={submenu.permissao_item_menu.id}
                    to={"/" + submenu.permissao_item_menu.caminho}  
                    className="dropdown-item">
                    {submenu.permissao_item_menu.nome}
                  </NavLink>                
                ))
              }
            </div>
          </div>
        )
      }
      else {
        listaItens.push(<NavLink to={"/" + menu.permissao_menu.caminho} className="nav-item nav-link">{menu.permissao_menu.nome}</NavLink>)
      }
    }

    return listaItens
  }

  useEffect(() => {
    setListaMenus(JSON.parse(localStorage.getItem('listaMenus')))
    setListaSubMenus(JSON.parse(localStorage.getItem('listaSubMenus')))
  }, [])

  return (
    <div className="container-fluid bg-white sticky-top border-bottom" style={{fontFamily: 'Montserrat'}}>
      <div className="container">
          <nav className="navbar navbar-expand-lg bg-white navbar-light p-lg-0">
              <a href="index.html" className="navbar-brand d-lg-none">
                  <h1 className="fw-bold m-0">GrowMark</h1>
              </a>
              <button type="button" className="navbar-toggler me-0" data-bs-toggle="collapse"
                  data-bs-target="#navbarCollapse">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                  <div className="navbar-nav">
                      <NavLink to="/" className="nav-item nav-link active">Home</NavLink>
                      <NavLink to="/sobre" className="nav-item nav-link">Sobre</NavLink>
                      <NavLink to="/ofertas" className="nav-item nav-link">Ofertas</NavLink>
                      {listaMenus !== null && listaSubMenus !== null && criarMenus()}
                      <NavLink to="/contato" className="nav-item nav-link">Contato</NavLink>
                  </div>
                  <div className="ms-auto d-none d-lg-block navbar-nav">
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id="tooltip-help">Aperte F2 para ajuda</Tooltip>}>
                        <span className="nav-link">
                            <FaQuestionCircle />
                        </span>
                    </OverlayTrigger>
                  </div>
                  <div className="navbar-nav">
                        <NavLink to="/logout" className="nav-item nav-link">Sair</NavLink>
                  </div>
              </div>
          </nav>
      </div>
    </div>
  )
}