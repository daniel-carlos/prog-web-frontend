import React, { useState, useEffect, useDebugValue } from 'react';
import { api } from '../../api/backend';
import { useStore } from "../../context/context";

function CartPage(props) {
    const { cart, clearCart, addCart } = useStore(state => state);
    const [products, setProducts] = useState([]);

    useEffect(async () => {
        if (Object.keys(cart).length > 0) {
            const resp = await api.post('/product/list', {
                ids: Object.keys(cart).map((cp, i) => cp)
            });
            setProducts(resp.data.products);
        }
    }, [cart]);

    const ItemCard = ({ product }) => {
        const amount = cart[product.id];

        return (
            <div className="card mb-2">
                <div className="card-header d-flex justify-content-between">
                    <div className="fs-4">
                        {product.name}
                    </div>
                    <div>
                        <div className="fs-4">{`${amount}x`}</div>
                    </div>
                </div>
                <div className="card-body d-flex">
                    <img width={100} height={100} className="" src={product.thumb} alt="Card image cap" />
                    <div className="ms-3">
                        <h5 className="card-title text-success">{`R$${product.price}`}</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <div className="ms-auto">
                        <form>
                            <div className="form-group">
                                <label for={`input-${product.id}`}>Quantidade</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id={`input-${product.id}`}
                                    aria-describedby="Quantidade"
                                    placeholder={1}
                                    min={0}
                                    value={amount}
                                    onChange={({target: {value}}) => {
                                        console.log(value);
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    const totalPrice = () => {
        let sum = 0;
        products.forEach((p) => {
            sum += p.price * cart[p.id];
        });
        return sum;
    }

    const totalCount = () => {
        let count = 0;
        products.forEach((p) => {
            count += cart[p.id];
        });
        return count;
    }

    return (
        <div className="container">
            <h1>Meu Carrinho</h1>

            {
                products.length > 0 ?
                    <div>
                        {products.map((p, i) => {
                            return (
                                <div key={i}>
                                    <ItemCard product={p}></ItemCard>
                                </div>
                            );
                        })}
                    </div>
                    :
                    <div>Seu carrinho está vazio</div>
            }

            <div className="mt-3 mb-5 d-flex justify-content-between">
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