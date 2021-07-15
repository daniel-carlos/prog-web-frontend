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

function Persist(props) {
    const logged = useStore(s => s.logged);
    const token = useStore(s => s.token);
    const login = useStore(s => s.login);
    const logout = useStore(s => s.logout);
    const user_id = useStore(s => s.user_id);
    const isAdmin = useStore(s => s.isAdmin);

    useLayoutEffect(() => {
        //Login
        const _token = getCookie("pw_tkn");
        const _user_id = getCookie("pw_uid");
        const _isAdmin = getCookie("pw_adm");
        if (_token.length > 0) {
            login(_token, _user_id, _isAdmin);
        } else {
            logout();
        }
    }, []);

    useEffect(() => {
        const save = () => {
            if (logged) {
                setCookie("pw_tkn", token, 1);
                setCookie("pw_uid", user_id, 1);
                setCookie("pw_adm", isAdmin, 1);
            } else {
                setCookie("pw_tkn", "", -999);
                setCookie("pw_uid", "", -999);
                setCookie("pw_adm", "", -999);
            }
        }
        save();
    }, [logged, user_id, isAdmin]);

    return <>{props.children}</>;
}

export default Persist;