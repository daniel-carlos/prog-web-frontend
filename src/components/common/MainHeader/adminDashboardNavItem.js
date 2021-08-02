import React from 'react';
import { Link } from "react-router-dom";

function AdminDashboardNavItem(props) {
    return (
        <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
                <i className="bi bi-graph-up fs-4 position-relative"></i>
            </Link>
        </li>
    );
}

export default AdminDashboardNavItem;