import { create } from "apisauce";
import env from "react-dotenv";

export const api = create({
    baseURL: `${env.BACKEND_HOST}:${env.BACKEND_PORT}/${env.BACKEND_VERSION}/`,
    headers: { Accept: 'application/vnd.github.v3+json' },
});

export const onLogin = (token) => {
    api.setHeader("Authorization", `Bearer ${token}`);
}

export const onLogout = (token) => {
    api.deleteHeader("Authorization");
}
