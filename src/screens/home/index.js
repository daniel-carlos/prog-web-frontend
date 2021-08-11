import React, { useEffect, useState, useDebugValue } from 'react';
import { api } from "../../api/backend";
import { Link } from "react-router-dom";

import { useStore } from "../../context/context";

function HomePage(props) {
    const [products, setProducts] = useState([]);
    const addCart = useStore(state => state.addCart);
    const cart = useStore(state => state.cart);

    useEffect(async () => {
        const resp = await api.get("/product/list?size=12");
        if (resp.ok) {
            setProducts(resp.data.products);
        };
    }, [])

    const ProductCard = ({ p }) => {
        return (
            <div className="card my-2" style={{ height: 400, width: 250 }}>
                <Link to={`product/${p.id}`}>
                    <img
                        style={{
                            maxHeight: 250,
                            objectFit: 'contain',
                        }}
                        className="card-img-top img-fluid" src={p.thumb} alt="Card image cap" />
                </Link>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.name}</h5>
                    <div className=" mt-auto">
                        <p className="flex-grow-1 fs-4 card-text">R$ {p.price}</p>
                    </div>
                    {
                        Object.keys(cart).includes(p.id.toString()) ?
                            <Link
                                to="/carrinho"
                                className="btn btn-success"
                            >No Carrinho</Link>
                            :
                            <Link
                                to="/"
                                onClick={() => {
                                    const c = addCart(p.id, 1, cart);
                                }}
                                className="btn btn-primary"
                            >Comprar</Link>

                    }

                </div>
            </div>
        )
    }
    return (
        <div className="pt-3 container">
            <h3>Destaques</h3>

            <section className="home-product-list">
                <div className="row">
                    {products.length > 1 ?
                        products.map((p, i) => {
                            return (
                                <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                    <ProductCard p={p} />
                                </div>
                            )
                        })
                        :
                        <div>Nada</div>
                    }
                </div>
            </section>
        </div>
    );
}

export default HomePage;