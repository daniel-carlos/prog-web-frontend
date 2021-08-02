import React from 'react';
import { Link } from "react-router-dom";

function OrdersNavItem(props) {
    return (
        <li className="nav-item">
            <Link className="nav-link" to="/pedidos">
                <i className="bi bi-cart-check-fill fs-4 position-relative"></i>
            </Link>
        </li>
    );
}

export default OrdersNavItem;