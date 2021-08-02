import React from 'react';
import { Link } from "react-router-dom";

function UnloggedNavItem(props) {
    return (
        <li className="nav-item">
            <Link replace={true} className="nav-link" to="/login">
                <i className="bi bi-person-circle fs-4 position-relative"></i>
            </Link>
        </li>
    );
}

export default UnloggedNavItem;