import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useStore } from "../../../context/context";
import icon from "../../../assets/icons/jumping-dog.png";
import UnloggedNavItem from './unloggedNavItem';
import LoggedNavItem from './loggedNavItem';
import CartNavItem from './cartNavItem';
import AdminDashboardNavItem from './adminDashboardNavItem';
import OrdersNavItem from './ordersNavItem';

function MainHeader(props) {
    const { logged, logout, login, cart, user } = useStore(state => ({ logged: state.logged, login: state.login, logout: state.logout, cart: state.cart, user: state.user }));
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        let count = 0;
        Object.keys(cart).map((c, i) => {
            count += parseInt(cart[c]);
        });
        setCartCount(count);
    });

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <div className="d-flex">
                        <img width={50} src={icon} />
                        <div className="my-auto ms-2 d-none d-sm-block">
                            Sansão Sincerão
                        </div>
                    </div>
                </Link>

                <div className="navbar" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <CartNavItem></CartNavItem>
                        <AdminDashboardNavItem></AdminDashboardNavItem>
                        <OrdersNavItem></OrdersNavItem>
                        {logged === true ?
                            <LoggedNavItem></LoggedNavItem>
                            :
                            <UnloggedNavItem></UnloggedNavItem>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default MainHeader;