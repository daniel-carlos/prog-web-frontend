import create from 'zustand';
import produce from "immer";

export const useStore = create(set => ({
    user: {},

    token: "",
    setToken: "",

    logged: false,
    login: (token, user) => set(
        produce((store) => {
            store.logged = true;
            store.token = token;
            store.user = user;
        })
    ),
    logout: () => {
        set(state => ({ logged: false, token: null, user_id: null, isAdmin: null }))
    },




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
            delete(cart[propName]);
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
}))