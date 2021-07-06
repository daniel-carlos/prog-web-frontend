import React from 'react';
import { Link } from "react-router-dom";
import { useStore } from "../../context/context";

function PageHeader(props) {
    const {logged, logout} = useStore(state => ({logged: state.logged, logout: state.logout}));

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <div>
                        <h1>
                            Sansão Sincero
                        </h1>
                    </div>
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Início</Link>
                        </li>
                        {logged === false && <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>}
                        {logged === true && <li className="nav-item">
                            <Link
                                className="nav-link"
                                onClick={() => {
                                    logout();
                                }}
                            >Sair</Link>
                        </li>}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default PageHeader;