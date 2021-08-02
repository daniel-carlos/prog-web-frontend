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

var started = false;

function Persist(props) {
    const store = useStore(s => s);

    useLayoutEffect(() => {
        function update() {
            // Login
            const _user = getCookie("pw_user");
            const _token = getCookie("pw_token");
            if (_token !== "" && _token != null && _token != "null" && _user !== "") {
                store.login(JSON.parse(_token), JSON.parse(_user));
            }else{
                store.logout();
                store.setCart({});
            }

            // Carrinho
            const _cart = getCookie("pw_cart");
            if (_cart != "") {
                store.setCart(JSON.parse(_cart));
            }else{
                store.setCart({});
            }
            store.setLoading(false);
        }
        update();
    }, []);

    useLayoutEffect(() => {
        function update() {
            console.log("2", store.cart);
            setCookie("pw_cart", JSON.stringify(store.cart), 1);
            setCookie("pw_user", JSON.stringify(store.user), 1);
            setCookie("pw_token", JSON.stringify(store.token), 1);
        }
        if (started) {
            update();
        } else {
            started = true;
        }
    }, [store]);

    return <>{props.children}</>;
}

export default Persist;