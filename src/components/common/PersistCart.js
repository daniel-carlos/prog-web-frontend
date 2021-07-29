import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useStore } from "../../context/context";


const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


const loadCart = () => {
    const _scart = getCookie("pw_cart");
    if (_scart.length > 0) {
        return JSON.parse(_scart)
    } else {
        return {}
    }
}

const saveCart = (_cart) => {
    setCookie(JSON.stringify(_cart));
}


function PersistCart(props) {
    const state = useStore(s => s);

    useLayoutEffect(() => {
        const cart_str = getCookie("pw_cart");
        try {
            if (cart_str === {} || cart_str == null || cart_str == "") {
                state.setCart({});
            } else {
                state.setCart(JSON.parse(cart_str));
            }
        } catch (error) {
            state.clearCart();
        }

    }, []);

    useEffect(() => {
        if (state.cart == {}) {
            setCookie("pw_cart", "", -9999);
        } else {
            setCookie("pw_cart", JSON.stringify(state.cart), 1);
        }
    }, [state])


    return <></>;
}

export default PersistCart;