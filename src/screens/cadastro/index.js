import React, { useState, useEffect } from 'react';
import { api } from "../../api/backend";
import { useStore, isLoggedIn } from "../../context/context";
import { Redirect, Link } from "react-router-dom";

function PageCadastro(props) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [hasError, setHasError] = useState(false);
    const [user, setUser] = useState({ username: "", password: "", email: "" });
    const [confirmPassword, setConfirmPassword] = useState("");

    const logged = useStore(state => state.logged);

    const tryCreateUser = async () => {
        if (confirmPassword != user.password) {
            setHasError(true);
            setErrorMsg("As senhas devem ser iguais");
            return;
        }
        setHasError(false);
        setErrorMsg("");

        setLoading(true);

        const resp = await api.post("/create_user", {
            username: user.username,
            password: user.password,
            email: user.email,
        });

        if (resp.ok) {
            const data = resp.data;
            if (data.ok) {
            } else {
                setHasError(true);
                setErrorMsg(`Erro código ${data.code}`);
            }
        }

        setLoading(false);
    }

    return (
        <div className="container">
            {logged === true && <Redirect to="/" />}

            <h2>Cadastre-se</h2>
            {hasError === true && <div className='text-danger'>{errorMsg}</div>}
            <div className="mb-3">
                <label htmlFor="login-user" className="form-label">Usuário</label>
                <input
                    type="username"
                    className="form-control"
                    id="login-user"
                    placeholder="seu nome de usuário"
                    onChange={({ target }) => {
                        setUser({ ...user, username: target.value });
                    }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="login-email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="login-email"
                    placeholder="seu nome de usuário"
                    onChange={({ target }) => {
                        setUser({ ...user, email: target.value });
                    }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="login-pass" className="form-label">Senha</label>
                <input
                    type="password"
                    className="form-control"
                    id="login-pass"
                    placeholder=""
                    onChange={({ target }) => {
                        setUser({ ...user, password: target.value });
                    }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="login-pass-conf" className="form-label">Confirme sua senha</label>
                <input
                    type="password"
                    className="form-control"
                    id="login-pass-conf"
                    placeholder=""
                    onChange={({ target: { value } }) => {
                        setConfirmPassword(value);
                    }}
                />
            </div>
            <div>
                {
                    loading === false ?
                        <button type="submit" className="btn btn-primary mb-3"
                            onClick={() => {
                                tryCreateUser();
                            }}
                        >
                            Entrar
                        </button>
                        :
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                            Entrando...
                        </button>
                }
            </div>
        </div>

    );
}

export default PageCadastro;