import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useStore } from "../../context/context";

function PageHeader(props) {
    const { logged, logout } = useStore(state => ({ logged: state.logged, logout: state.logout }));
    const [profilePopover, setProfilePopover] = useState(false);

    return (
        <nav className="navbar navbar-light bg-light">


            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <div>
                        <h1>
                            Sansão Sincero
                        </h1>
                    </div>
                </Link>

                <ul className="navbar-nav me-auto mb-2 mb-sm-0 d-flex flex-row">
                    <li className="nav-item me-3">
                        <Link className="nav-link" aria-current="page" to="/cart">
                            <i className="bi bi-cart-fill fs-4 position-relative">
                                <span style={{ fontSize: "50%" }} className="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-danger">
                                    5
                                    <span className="visually-hidden">produtos</span>
                                </span>
                            </i>
                        </Link>

                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-person-circle fs-4 position-relative"></i>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#">Meus Pedidos</a></li>
                            <li><a className="dropdown-item" href="#">Perfil</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Sair</a></li>
                        </ul>
                    </li>

                </ul>
            </div>


        </nav >
    );
}

export default PageHeader;