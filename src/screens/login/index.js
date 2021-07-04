import React from 'react';

function LoginPage(props) {
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
                <button type="submit" className="btn btn-primary mb-3">Entrar</button>
            </div>
        </div>
    );
}

export default LoginPage;