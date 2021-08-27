import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/backend';
import { useStore } from '../../context/context';
import { Redirect } from "react-router-dom";

function EditProduct(props) {
    let { productId } = useParams();
    const [product, setProduct] = useState({});
    const [categs, setCategs] = useState([]);
    const [currentCat, setCurrentCat] = useState(0);
    const [thumb, setThumb] = useState("");
    const [categList, setCategList] = useState([]);

    const { openModal, closeModal } = useStore(s => s);
    const [redirect, setRedirect] = useState(false);

    const loadProduct = async () => {
        if (productId > 0) {
            const resp = await api.get(`/product/${productId}`);
            if (resp.ok) {

                setProduct(resp.data['product']);
                setThumb(product.thumb);
            }
        }
    }

    const loadCategories = async () => {
        const resp = await api.get("/categories");
        if (resp.ok) {
            setCategs(resp.data.categories);
            setCurrentCat(categs[product.category_id]);
        }
    }

    useEffect(() => {
        loadCategories();
        loadProduct();
    }, [])

    useEffect(() => {
        setCurrentCat(categs[product.category_id]);
    }, [product])

    const UpdateProduct = async () => {
        if (product.id > 0) {
            const resp = await api.post('/product/update', { product: product });
        } else {
            const resp = await api.post('/product/create', { product: {...product, thumb: thumb, image: thumb} });
        }
        setRedirect(true);
    }

    const modal = (
        <div id="categoryModal" className="modal fade" tabindex="-1">
            {redirect && <Redirect to="/"></Redirect>}
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Preço</label>
                        <select
                            value={currentCat != undefined ? currentCat.id : 0}
                            onChange={({ target }) => {
                                console.log(target);
                                setCurrentCat(categs[target.value]);
                            }}
                            className="form-select" aria-label="Default select example"
                        >
                            <option value={0}>Escolha uma categoria</option>
                            {
                                Object.keys(categs).map((key, i) => {
                                    const cat = categs[key];
                                    return (
                                        <option key={`catkey-${key}`} value={`${cat.id}`}>{cat.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                            onClick={() => {
                                closeModal();
                            }}
                        >Close</button>
                        <button type="button" className="btn btn-primary"
                            onClick={() => {
                                console.log("Save", currentCat);
                                const cat = { category_name: currentCat.name, category_id: currentCat.id };
                                if (!categList.includes(cat)) {
                                    setCategList([...categList, cat]);
                                }
                                closeModal();
                            }}
                        >Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    )

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
                {/* <div className="mb-3">
                    <label htmlFor="exampleFormControlInput2" className="form-label">Categorias</label>
                    <button className="btn btn-primary"
                        onClick={() => {
                            openModal("categoryModal");
                        }}
                    >Categorias</button>
                </div> */}
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
                                setThumb(url);
                            }
                        }}
                    ></input>
                    {thumb != null &&
                        <div>
                            <img width={300} src={thumb} />
                        </div>
                    }
                </div>
            </div>

            <div className="w-100 d-flex">
                <button className="btn btn-primary ms-auto"
                    onClick={() => {
                        UpdateProduct();
                    }}
                >
                    Salvar
                </button>
            </div>
            {modal}
        </div>
    );
}

export default EditProduct;