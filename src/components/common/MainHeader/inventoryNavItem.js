import React from 'react';
import { Link } from "react-router-dom";

function InventoryNavItem(props) {
    return (
        <li className="nav-item">
            <Link className="nav-link" to="/estoque">
                <i className="bi bi-box-seam fs-4 position-relative"></i>
            </Link>
        </li>
    );
}

export default InventoryNavItem;