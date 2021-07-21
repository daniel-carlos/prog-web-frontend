import create from 'zustand';
import produce from "immer";

import { api } from '../api/backend';
import { getCookie, setCookie } from "./cookie";

export const useStore = create(set => ({
    user_id: "",
    isAdmin: "",
    token: "",
    setToken: "",
    logged: false,
    login: (token, user_id, isAdmin) => set(
        produce((store) => {
            store.logged = true;
            store.token = token;
            store.user_id = user_id;
            store.isAdmin = isAdmin;
        })
    ),

    // {
    //     set(state => ({ logged: true, token: token, user_id: user_id, isAdmin: isAdmin }));

    // },
    logout: () => {
        set(state => ({ logged: false, token: null, user_id: null, isAdmin: null }))
    },


    cart: {},
    clearCart: () => {
        set({ cart: {} })
    },
    addCart: (product_id, increase) => set(
        produce((store) => {
            const { cart } = store;
            const propName = `${product_id}`;
            const value = cart[propName] != null ? parseInt(cart[propName]) : 0;
            cart[propName] = value + increase;
        })
    ),
    setCartItem: (product_id, amount, _cart) => {
        const propName = `${product_id}`;
        const value = _cart[propName] != null ? parseInt(_cart[propName]) : 0;
        _cart[propName] = amount;
        return _cart;
    },
    cartCount: () => set(
        produce((store) => {
            const { cart } = store;
            let sum = 0;
            for (const key in cart) {
                sum = sum + cart[key];
            }
            return sum;
        })
    ),
}))