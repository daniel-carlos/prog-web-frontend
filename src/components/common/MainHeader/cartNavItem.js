import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useStore } from "../../../context/context";

function CartNavItem(props) {
    const { cart } = useStore(s => s);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        let count = 0;
        Object.keys(cart).map((c, i) => {
            count += parseInt(cart[c]);
        });
        setCartCount(count);
    });

    return (
        <li className="nav-item">
            <Link className="nav-link" to="/carrinho">
                <i className="bi bi-cart-fill fs-4 position-relative">
                    {
                        cartCount > 0 &&
                        <span style={{ fontSize: "50%" }} className="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-danger">
                            {cartCount}
                        </span>
                    }
                </i>
            </Link>
        </li>
    );
}

export default CartNavItem;