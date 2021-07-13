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


    cart: {},
    setCart: (_cart) => {
        set(state => ({ cart: _cart }));
    },
    clearCart: () => {
        set({ cart: {} })
    },
    addCart: (product_id, amount, _cart) => {
        const propName = `${product_id}`;
        const value = _cart[propName] != null ? parseInt(_cart[propName]) : 0;
        _cart[propName] = value + amount;
        return _cart;
    },
    cartCount: (_cart) => {
        let sum = 0;
        for (const key in _cart){
            console.log(`${key}: ${_cart[key]}`);
        }
    }
}))