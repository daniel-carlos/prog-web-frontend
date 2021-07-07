import React, { useState, useEffect } from 'react';
import { api } from '../../api/backend';
import { useStore } from "../../context/context";

function CartPage(props) {
    const { cart, clearCart } = useStore(state => state);
    const [products, setProducts] = useState([]);

    useEffect(async () => {
        const resp = await api.post('/product/list', {
            ids: cart.map((cp, i) => cp.pid)
        });
        setProducts(resp.data.products);
    }, []);

    const getProductFromList = (id, plist) => {
        let obj = undefined;
        plist.forEach((p, i, a) => {
            if (id === p.id) {
                obj = p;
            }
        });
        return obj;
    }

    return (
        <div className="container">
            <h1>Meu Carrinho</h1>

            {
                products.length > 0 &&
                cart.map((cp, i) => {
                    const p = getProductFromList(cp.pid, products);
                    const ammount = cp.q;

                    return (
                        <div key={i}>
                            {`${p.name} (${ammount}x)`}
                        </div>
                    );
                })
            }

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