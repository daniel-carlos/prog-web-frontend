import React from 'react';
import { Link } from "react-router-dom";
import { useStore } from "../../../context/context";

function LoggedNavItem(props) {
    const {user, logout} = useStore(s => s);
    
    return (
        <li className="nav-item dropdown">
            <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                <i className="bi bi-person-circle fs-4 position-relative"></i>
            </Link>
            <ul style={{ transform: "translate(calc(-100% + 50px))" }} className="dropdown-menu" aria-labelledby="navbarDropdown">
                {!user.isAdmin && <li><Link className="dropdown-item" to="/meus-pedidos">Meus Pedidos</Link></li>}
                <li><hr className="dropdown-divider" /></li>
                <li><button onClick={() => { logout() }} className="dropdown-item">Sair</button></li>
            </ul>
        </li>
    );
}

export default LoggedNavItem;