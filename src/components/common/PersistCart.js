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

function PersistCart(props) {
    const store = useStore(s => s);

    useEffect(() => {
        function update() {
            const _cart = getCookie("pw_cart");
            if (_cart != "") {
                store.setCart(JSON.parse(_cart));
            }else{
                store.setCart({});
            }
        }
        update();
    }, []);

    useEffect(() => {
        function update() {
            console.log("2", store.cart);
            setCookie("pw_cart", JSON.stringify(store.cart), 1);
        }
        if (started) {
            update();
        } else {
            started = true;
        }
    }, [store]);

    return <></>;
}

export default PersistCart;