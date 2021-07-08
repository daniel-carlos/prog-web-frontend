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
        set(state => ({ logged: true }))
    },
    logout: () => {
        setCookie("tw1.tkn", "", 0);
        set(state => ({ logged: false }))
    },
    cart: [],
    reloadCart: () => {
        //load cart from cookies
        let _cart_str = getCookie("pw1.cart");
        let _cart = []
        try {
            _cart = JSON.parse(_cart_str)
        } catch (error) {
            console.log("cookie cart");
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
            console.log("cookie cart");
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
        setCookie("pw1.cart", JSON.stringify(_cart.sort((a, b) => a - b)))
        console.log("Cart", getCookie("pw1.cart"))
    }
}))