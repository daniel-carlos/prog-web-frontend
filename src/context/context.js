import create from 'zustand'
import { api } from '../api/backend';
import { getCookie, setCookie } from "./cookie";

export const useStore = create(set => ({
    token: "",
    setToken: "",
    logged: false,
    login: (token) => {
        set(state => ({ logged: true, token: token }))
    },
    logout: () => {
        set(state => ({ logged: false, token: null }))
    },
    
    
    cart: [],
    reloadCart: () => {
        //load cart from cookies
        let _cart_str = getCookie("pw1.cart");
        let _cart = []
        try {
            _cart = JSON.parse(_cart_str)
        } catch (error) {

        }
        set(state => ({ cart: _cart }));
    },
    clearCart: () => {
        set(state => ({ cart: [] }));
        setCookie("pw1.cart", []);
    },
    addCart: (product_id) => {
        //load cart from cookies
        let _cart_str = getCookie("pw1.cart");
        let _cart = []
        try {
            _cart = JSON.parse(_cart_str)
        } catch (error) {

        }
        let insertNew = true;
        _cart = _cart.map((p, i) => {
            if (p.pid == product_id) {
                insertNew = false;
                return { ...p, q: p.q + 1 };
            } else {
                return p;
            }
        })
        if (insertNew === true) {
            _cart = [..._cart, { pid: product_id, q: 1 }]
        }
        set(state => ({ cart: _cart }));
        setCookie("pw1.cart", JSON.stringify(_cart.sort((a, b) => a - b)));
    }
}))