import create from 'zustand';
import produce from "immer";
import { api } from '../api/backend';
import * as bootstrap from "bootstrap";

export const useStore = create(set => ({
    loading: true,
    setLoading: (isLoading = false) => set(
        produce((store) => {
            store.loading = isLoading;
        })
    ),

    user: {},

    token: "",
    setToken: "",

    logged: false,
    login: (token, user) => set(
        produce((store) => {
            store.logged = true;
            store.token = token;
            store.user = user;
            api.setHeader("Authorization", `Bearer ${token}`);
        })
    ),
    logout: () => set(
        produce((store) => {
            store.logged = false;
            store.token = null;
            store.user = {};
            api.deleteHeader("Authorization");
        })
    )
    ,


    // set(state => ({ logged: false, token: null, user: {} }))


    cart: {},
    clearCart: () => {
        set({ cart: {} })
    },
    setCart: (_cart) => {
        set({ cart: _cart })
    },
    removeProduct: (product_id) => set(
        produce((store) => {
            const { cart } = store;
            const propName = `${product_id}`;
            delete (cart[propName]);
        })
    ),
    addCart: (product_id, increase) => set(
        produce((store) => {
            const { cart } = store;
            const propName = `${product_id}`;
            const value = cart[propName] != null ? parseInt(cart[propName]) : 0;
            cart[propName] = value + increase;
        })
    ),
    setCartItem: (product_id, amount) => set(
        produce((store) => {
            const { cart } = store;
            const propName = `${product_id}`;
            const value = cart[propName] != null ? parseInt(cart[propName]) : 0;
            cart[propName] = amount;
        })
    ),
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


    modal: undefined,
    setModal: (modal) => set(
        produce((store) => {
            store.modal = modal;
        })
    ),
    openModal: (elId) => set(
        produce((store) => {
            var modal = new bootstrap.Modal(document.getElementById(elId), {});
            store.modal = modal;
            modal.show();
        })
    ),
    closeModal: () => set(
        produce((store) => {
            if (store.modal != undefined) {
                store.modal.hide();
            }
        })
    ),

    selection: undefined,
    setSelection: (selection) => set(
        produce((store) => {
            store.selection = selection;
        })
    ),


    content: async (name) => {
        const resp = await api.get(`/image/${name}`);
        return resp.data;
    },
}))