import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/backend';

function EditProduct(props) {
    let { productId } = useParams();
    const [product, setProduct] = useState({});
    const [thumb, setThumb] = useState("");


    const loadProduct = async () => {
        const resp = await api.get(`/product/${productId}`);
        if (resp.ok) {
            setProduct(resp.data['product']);
        }
    }

    useEffect(() => {
        loadProduct();
    }, [])

    return (
        <div className="container">
            <h1>Edit Product</h1>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Título</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder=""
                value={product.name}
                />
            </div>
            <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">Descrição</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </div>
    );
}

export default EditProduct;