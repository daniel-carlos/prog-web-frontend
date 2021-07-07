import React from 'react';
import { useStore } from "../../context/context";

function CartPage(props) {
    const { cart, clearCart } = useStore(state => state);

    return (
        <div>
            <h1>Cart</h1>
            <button
                onClick={() => {
                    clearCart()
                }}
            >Limpar Carrinho</button>
            <div>
                {"Total "}
                {cart.length}
            </div>
        </div>
    );
}

export default CartPage;