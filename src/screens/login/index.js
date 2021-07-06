import React, { useState } from 'react';
import { api } from "../../api/backend";
import { useStore } from "../../context/context";
import { Redirect } from "react-router-dom";

function LoginPage(props) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [hasError, setHasError] = useState(false);
    const [user, setUser] = useState({ username: "", password: "" });

    const login = useStore(store => store.login);
    const isLoggedIn = useStore(store => store.isLoggedIn);
    const logged = useStore(store => store.logged);

    const tryLogin = async () => {
        setLoading(true);
        const resp = await api.post("/login", { username: user.username, password: user.password });
        if (resp.ok) {
            if (resp.data.ok) {
                setHasError(false);
                setErrorMsg("");

                login(resp.data.token);
                console.log(isLoggedIn(resp.data.token));

                setLoading(true);
            } else {
                setErrorMsg(resp.data.msg);
                setHasError(true);
            }
        }
        setLoading(false);
    }

    return (
        <div className="container">
            {logged === true && <Redirect to="/" />}

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
            <div>
                {
                    loading === false ?
                        <button type="submit" className="btn btn-primary mb-3"
                            onClick={() => {
                                tryLogin();
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

export default LoginPage;