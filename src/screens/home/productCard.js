import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useStore } from "../../context/context";

function ProductCard({p}) {
    const [thumb, setThumb] = useState("")
    const addCart = useStore(state => state.addCart);
    const cart = useStore(state => state.cart);
    const { content } = useStore(s => s);

    useEffect(()=>{
        async function loadThumb(){
            const r = await content(p.thumb)
            console.log(r);
            setThumb(r);
        }
        loadThumb();
    }, [])

    return (
        <div className="card my-2" style={{ height: 400, width: 250 }}>
            <Link to={`product/${p.id}`}>
                <img
                    style={{
                        maxHeight: 250,
                        objectFit: 'contain',
                    }}
                    className="card-img-top img-fluid" src={thumb} alt="Card image cap" />
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
    );
}

export default ProductCard;