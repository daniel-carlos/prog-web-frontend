import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useStore } from "../../context/context";

function PageHeader(props) {
    const { logged, logout } = useStore(state => ({ logged: state.logged, logout: state.logout }));
    const [profilePopover, setProfilePopover] = useState(false);

    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Loja do Sansão</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <i className="bi bi-cart-fill fs-4 position-relative">
                                    <span style={{ fontSize: "50%" }} className="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-danger">
                                        5
                                    </span>
                                </i>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-person-circle fs-4 position-relative"></i>
                            </a>
                            <ul style={{transform: "translate(calc(-100% + 50px))"}} className="dropdown-menu dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/meus-pedidos">Meus Pedidos</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/login">Sair</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

{/* <i className="bi bi-person-circle fs-4 position-relative"></i> */ }
export default PageHeader;