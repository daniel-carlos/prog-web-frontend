import create from 'zustand'
import { api } from '../api/backend';
import { getCookie, setCookie } from "./cookie";

export const useStore = create(set => ({
    user_id: "",
    isAdmin: "",
    token: "",
    setToken: "",
    logged: false,
    login: (token, user_id, isAdmin) => {
        set(state => ({ logged: true, token: token, user_id: user_id, isAdmin: isAdmin }))
    },
    logout: () => {
        set(state => ({ logged: false, token: null, user_id: null, isAdmin: null }))
    },


    cart: {},
    setCart: (_cart) => {
        set(state => ({ cart: _cart }));
    },
    clearCart: () => {
        set({ cart: {} })
    },
    addCart: (product_id, increase, _cart) => {
        const propName = `${product_id}`;
        const value = _cart[propName] != null ? parseInt(_cart[propName]) : 0;
        _cart[propName] = value + increase;
        return _cart;
    },
    setCartItem: (product_id, amount, _cart) => {
        const propName = `${product_id}`;
        const value = _cart[propName] != null ? parseInt(_cart[propName]) : 0;
        _cart[propName] = amount;
        return _cart;
    },
    cartCount: (_cart) => {
        let sum = 0;
        for (const key in _cart) {
            sum = sum + _cart[key];
        }
        return sum;
    }
}))