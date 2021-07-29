import React, { useState, useEffect, useDebugValue } from 'react';
import { api } from '../../api/backend';
import { useStore } from "../../context/context";
import { useModalStore } from "../../context/modalContext";
import { Link, Redirect } from "react-router-dom";

function CartPage(props) {
    const { cart, clearCart, setCartItem, removeProduct, user_id } = useStore(state => state);
    const [products, setProducts] = useState([]);
    const modalContext = useModalStore();
    const [redirectMyOrders, setRedirectMyOrders] = useState(false);

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
                        <div className="fs-4">
                            {`${amount}x`}
                            <button className="btn btn-secondary btn-sm ms-3"
                                onClick={() => {
                                    removeProduct(product.id);
                                }}
                            >
                                <i className="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body d-flex">
                    <img width={100} height={100} className="" src={product.thumb} alt="Card image cap" />
                    <div className="ms-3">
                        <h5 className="card-title text-success">{`R$${product.price}`}</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    <div className="ms-auto">
                        <div>
                            <label htmlFor={`input-${product.id}`}>Unidades</label>
                            <div className="d-flex">
                                <button className="btn btn-primary btn-sm" disabled={amount <= 1}
                                    onClick={() => {
                                        setCartItem(product.id, amount - 1);
                                    }}
                                >
                                    <i className="bi bi-dash"></i>
                                </button>
                                <span className="mx-3">{`${amount}`}</span>
                                <button className="btn btn-primary btn-sm"
                                    onClick={() => {
                                        setCartItem(product.id, amount + 1);
                                    }}
                                >
                                    <i className="bi bi-plus"></i>

                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    const ConfirmRemoveDialog = () => {
        return (
            <div id="removeCartItemDialog" className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
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

    const finishOrder = async () => {
        const resp = await api.post("order/create", {
            user_id: user_id,
            cart: cart
        });
        if(resp.ok){
            clearCart();
            setRedirectMyOrders(true);
        }
    }

    return (
        <div className="container">
            {redirectMyOrders && <Redirect to="meus-pedidos"/>}
                
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
                <div>
                    <button
                        className="btn btn-primary"
                        disabled={products.length === 0}
                        onClick={() => {
                            finishOrder();
                        }}
                    >
                        Finalizar Compra
                    </button>
                    <button
                        className="btn btn-danger ms-3"
                        disabled={products.length === 0}
                        onClick={() => {
                            clearCart()
                        }}
                    >Limpar Carrinho</button>
                </div>
                <div className="fs-3 text-primary">
                    {"Total "}
                    <span className="fw-bold">{` R$${totalPrice().toFixed(2)} `}</span>
                    {` (${totalCount()} produtos)`}
                </div>
            </div>
            <ConfirmRemoveDialog></ConfirmRemoveDialog>
        </div>
    );
}

export default CartPage;