import React, { useEffect, useState, useDebugValue } from 'react';
import { api } from "../../api/backend";
import ProductCard from "./productCard";


function HomePage(props) {
    const [products, setProducts] = useState([]);
    

    useEffect(async () => {
        const resp = await api.get("/product/list?size=12");
        if (resp.ok) {
            setProducts(resp.data.products);
        };
    }, [])

    return (
        <div className="pt-3 container">
            <h3>Destaques</h3>

            <section className="home-product-list">
                <div className="row">
                    {products.length > 0 ?
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