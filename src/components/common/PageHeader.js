import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useStore } from "../../context/context";
import icon from "../../assets/icons/jumping-dog.png";

function PageHeader(props) {
    const { logged, logout, login, cart, isAdmin } = useStore(state => ({ logged: state.logged, login: state.login, logout: state.logout, cart: state.cart, isAdmin: state.isAdmin }));
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        let count = 0;
        Object.keys(cart).map((c, i) => {
            count += parseInt(cart[c]);
        });
        setCartCount(count);
    });

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <div className="d-flex">
                        <img width={50} src={icon} />
                        <div className="my-auto ms-2 d-none d-sm-block">
                            Sansão Sincerão
                        </div>
                    </div>
                </Link>

                <div className="navbar" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {
                            !isAdmin &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/carrinho">
                                    <i className="bi bi-cart-fill fs-4 position-relative">
                                        {
                                            cartCount > 0 &&
                                            <span style={{ fontSize: "50%" }} className="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-danger">
                                                {cartCount}
                                            </span>
                                        }
                                    </i>
                                </Link>
                            </li>
                        }

                        {
                            logged && isAdmin &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/admindashboard">
                                    <i className="bi bi-graph-up fs-4 position-relative"></i>
                                </Link>
                            </li>
                        }

                        {
                            logged && isAdmin &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/pedidos">
                                    <i className="bi bi-cart-check-fill fs-4 position-relative"></i>
                                </Link>
                            </li>
                        }

                        {logged === true ?
                            <li className="nav-item dropdown">
                                <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                    <i className="bi bi-person-circle fs-4 position-relative"></i>
                                </Link>
                                <ul style={{ transform: "translate(calc(-100% + 50px))" }} className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {!isAdmin && <li><Link className="dropdown-item" to="/meus-pedidos">Meus Pedidos</Link></li>}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button onClick={() => { logout() }} className="dropdown-item">Sair</button></li>
                                </ul>
                            </li>
                            :
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    <i className="bi bi-person-circle fs-4 position-relative"></i>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default PageHeader;