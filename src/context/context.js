import create from 'zustand'
import { getCookie, setCookie } from "./cookie";

export const useStore = create(set => ({
    username: false,
    isLoggedIn: () => {
        let token = getCookie("tw1.tkn");
        console.log("Token", token);
        return token !== "";
    },
    logged: false,
    login: (token) => {
        setCookie("tw1.tkn", token, 1);
        set(state => ({logged: true}))
    },
    logout: () => {
        setCookie("tw1.tkn", "", -1);
        set(state => ({logged: false}))
    },

}))