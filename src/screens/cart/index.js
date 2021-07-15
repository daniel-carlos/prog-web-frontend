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

    const totalPrice = () => {
        if (products.length === 0) return 0;
        
        let _sum = 0;
        
        cart.map((cp, i) => {
            const p = getProductFromList(cp.pid, products);
            const ammount = cp.q;
            _sum += p.price * ammount;
        });
        
        return _sum;
    }
    
    const totalCount = () => {
        if (products.length === 0) return 0;

        let _sum = 0;

        cart.map((cp, i) => {
            const ammount = cp.q;
            _sum += ammount;
        });

        return _sum;
    }

    return (
        <div className="container">
            <h1>Meu Carrinho</h1>

            {
                products.length > 0 ?
                <div>
                    {Object.keys(cart).map((cp, i) => {
                        const p = getProductFromList(cp.pid, products);
                        const ammount = cp.q;

                        return (
                            <div key={i}>
                                <div className="card mb-2">
                                    <div className="card-header d-flex justify-content-between">
                                        <div className="fs-4">
                                            {p.name}
                                        </div>
                                        <div>
                                            <div className="fs-4">{`${ammount}x`}</div>
                                        </div>
                                    </div>
                                    <div className="card-body d-flex">
                                        <img width={100} height={100} className="" src={p.thumb} alt="Card image cap" />
                                        <div className="ms-3">
                                            <h5 className="card-title text-success">{`R$${p.price}`}</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                :
                <div>Seu carrinho está vazio</div>
            }

            <div className="mt-3 d-flex justify-content-between">
                <button
                    className="btn btn-primary"
                    disabled={products.length === 0}
                    onClick={() => {
                        clearCart()
                    }}
                >Limpar Carrinho</button>
                <div className="fs-3 text-primary">
                    {"Total "}
                    <span className="fw-bold">{` R$${totalPrice().toFixed(2)} `}</span>
                    {` (${totalCount()} produtos)`}
                </div>
            </div>
        </div>
    );
}

export default CartPage;