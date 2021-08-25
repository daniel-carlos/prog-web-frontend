import { create } from "apisauce";
// import env from "react-dotenv";
import { env } from "../variables";

const HTTP_HOST = env.BACKEND_HOST;
const HTTP_PORT = env.BACKEND_PORT;
const VERSION = env.BACKEND_VERSION;


export const api = create({
    baseURL: `http://${HTTP_HOST}:${HTTP_PORT}/${VERSION}/`,
    headers: { Accept: 'application/vnd.github.v3+json' },
});

export const onLogin = (token) => {
    api.setHeader("Authorization", `Bearer ${token}`);
}

export const onLogout = (token) => {
    api.deleteHeader("Authorization");
}
