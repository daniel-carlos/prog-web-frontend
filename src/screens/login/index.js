import React, { useState } from 'react';

function LoginPage(props) {
    const [loading, setLoading] = useState(false);

    return (
        <div className="container">
            <div className="mb-3">
                <label htmlFor="login-user" className="form-label">Usuário</label>
                <input type="username" className="form-control" id="login-user" placeholder="seu nome de usuário" />
            </div>
            <div className="mb-3">
                <label htmlFor="login-pass" className="form-label">Senha</label>
                <input type="password" className="form-control" id="login-pass" placeholder="" />
            </div>
            <div>
                {
                    loading === false ?
                        <button type="submit" className="btn btn-primary mb-3"
                            onClick={() => {
                                setLoading(true);
                                setTimeout(() => {
                                    setLoading(false);
                                }, 1500);
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