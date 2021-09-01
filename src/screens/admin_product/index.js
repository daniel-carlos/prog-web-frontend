import React, { useDebugValue, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/backend';
import { useStore } from '../../context/context';
import { Redirect } from "react-router-dom";

const uuidv4 = require("uuid/v4")

function EditProduct() {
    let { productId } = useParams();
    const [product, setProduct] = useState({ });
    const [categs, setCategs] = useState([]);
    const [blob, setBlob] = useState("");
    const [file, setFile] = useState(null);

    const { openModal, closeModal } = useStore(s => s);
    const [redirect, setRedirect] = useState(false);

    const [loadingSave, setLoadingSave] = useState(false);

    const { content } = useStore(s => s);

    const loadProduct = async () => {
        if (productId > 0) {
            const resp = await api.get(`/product/${productId}`);
            if (resp.ok) {
                if (resp.data['product'] === { }) {
                    setProduct({category_id: 3});
                } else {
                    setProduct(resp.data['product']);
                }
                return true;
            }else{
                return false;
            }
        }else{
            setProduct({category_id: 1});
        }
    }

    const loadCategories = async () => {
        const resp = await api.get("/categories");
        if (resp.ok) {
            await setCategs(resp.data.categories);
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        async function loadData() {
            if (await loadCategories()) {
                if(await loadProduct()){
                    console.log(product)
                }
            } else {
                alert("ERRO");
            }
        }
        loadData();
    }, [])

    useEffect(() => {
        async function initBlob() {
            const r = await content(product.thumb)
            setBlob(r);
        }
        initBlob()

    }, [product.id])

    const SaveProduct = async () => {
        setLoadingSave(true);

        let formData = new FormData();
        formData.append("image", file);

        const imgResp = await api.post(`/image/upload/${product.thumb}`, formData);

        if (imgResp.ok) {
            const imgName = imgResp.data.file_name;
            console.log("Created image", imgName);
            if (product.id > 0) {
                const resp = await api.post('/product/update', { product: product });
                if(resp.ok){
                    setRedirect(true);
                }else{
                    alert("Erro 02");
                }
            } else {
                const resp = await api.post('/product/create', { product: { ...product } });
                if(resp.ok){
                    setRedirect(true);
                }else{
                    alert("Erro 03");
                }
            }
        }else{
            alert("Erro 01")
        }
        setLoadingSave(false);
    }

    return (
        <div className="container mb-5">
            <h1>Edit Product</h1>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Título</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder=""
                    value={product.name}
                    onChange={({ target: { value } }) => {
                        setProduct({ ...product, name: value })
                    }}
                />
            </div>

            <div className="d-flex">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Preço</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="input-preco">{"R$"}</span>
                        <input type="number" className="form-control" placeholder="" aria-label="Preço" aria-describedby="input-preco"
                            value={product.price}
                            onChange={({ target: { value } }) => {
                                setProduct({ ...product, price: value })
                            }}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <select className="form-select" aria-label="Default select example"
                        // value={product.category_id}
                        onChange={({ target }) => {
                            console.log(target.value, categs.find(c => { return c.id == target.value }).name);
                            setProduct({
                                ...product,
                                category_id: target.value,
                                category_name: categs.find(c => { return c.id == target.value }).name
                            })

                        }}

                    >
                        {
                            categs.map((cat, i) => {
                                return (<option key={`cat-${i}`} value={cat.id}>{cat.name}</option>)
                            })
                        }
                    </select>
                </div>


            </div>

            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Descrição</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                    value={product.description}
                    onChange={({ target: { value } }) => {
                        setProduct({ ...product, description: value })
                    }}
                ></textarea>
            </div>


            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Imagem</label>
                <div className="">
                    <input type="file" accept=".png, .jpg"
                        onChange={({ target }) => {
                            console.log(target);
                            if (target.files && target.files[0]) {
                                const url = URL.createObjectURL(target.files[0]);
                                console.log(url);
                                setBlob(url);
                                setFile(target.files[0]);
                                const nameTemp = uuidv4();
                                setProduct({
                                    ...product,
                                    image: nameTemp,
                                    thumb: nameTemp,
                                })
                            }
                        }}
                    ></input>
                    {blob != null &&
                        <div>
                            <img width={300} height={300} style={{objectFit: 'contain'}} src={blob} />
                        </div>
                    }
                </div>
            </div>

            <div className="w-100 d-flex">
                <button className="btn btn-primary ms-auto"
                    onClick={() => {
                        SaveProduct();
                    }}
                    disabled={loadingSave}
                >
                    Salvar
                </button>
            </div>
            
        </div>
    );
}

export default EditProduct;