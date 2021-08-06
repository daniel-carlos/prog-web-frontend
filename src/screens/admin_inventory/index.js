import React, { useEffect, useState } from 'react';
import { useStore } from '../../context/context';
import { api } from '../../api/backend';
import DataTable from 'react-data-table-component';
import { searchProduct } from '../../components/common/searchControl';
import AddInventoryModal from './addInventoryModal.js';

function InventoryPageAdmin(props) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const { openModal, setSelection, selection, closeModal } = useStore(s => s);

    const refreshData = async () => {
        setLoading(true);
        const result = await api.get("product/list?size=1000");
        if (result.ok) {
            setProducts(result.data.products);
        }
        setLoading(false);
    }

    const filter = () => {
        if (search.length > 0) {
            setFilteredProducts(products.filter((p) => {
                return searchProduct(p, search);
            }))
        } else {
            setFilteredProducts(products);
        }
    }

    useEffect(() => {
        refreshData();
    }, [])

    useEffect(() => {
        filter();
    }, [search, products])

    const columns = [
        {
            name: 'Código',
            selector: row => row.id,
            sortable: true,
            compact: true,
            cell: row => <div>{`#${row.id}`}</div>,
            grow: 0,
        },
        {
            name: 'Título',
            selector: row => row.name,
            sortable: true,
            compact: true,
            grow: 2,
        },
        {
            name: 'Preço',
            selector: row => row.price,
            sortable: true,
            right: true,
            cell: row => <div>{`R$ ${row.price}`}</div>,
            grow: 1,
        },
        {
            name: 'Estoque',
            selector: row => row.stock,
            sortable: true,
            right: true,
            cell: row => <div>{
                row.stock > 0 ?
                    `${row.stock}`
                    :
                    <span className="text-danger">Indisponível</span>
            }</div>,
            grow: 1,
        },
        {
            name: '',
            sortable: true,
            right: true,
            cell: product => <div className="">
                <i className="bi bi-box-seam btn fs-3"
                    onClick={() => {
                        setSelection(product);
                        openModal('addInventoryModal');
                    }}
                ></i>
            </div>,
            grow: 1,
        },
    ];

    const addToInventory = async (product, amount) => {
        const result = await api.post("product/add-inventory", {
            product: product.id,
            amount: amount
        })
        if (result.ok) {
            refreshData();
        } else {
            alert("Um problema ocorreu");
        }
    }

    const modalCallback = (amount) => {
        addToInventory(selection, amount);
        closeModal();
    }

    return (
        <div className="container mt-2">
            <AddInventoryModal callback={modalCallback}></AddInventoryModal>
            <header className='d-flex justify-content-between'>
                <h2>Controle de Estoque</h2>
                {!loading ? <button
                    onClick={() => {
                        refreshData();
                    }}
                    className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i>
                    <span> Atualizar </span>
                </button>
                    :
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
            </header>

            <main className="mt-4">

                <DataTable
                    title={
                        <div className="row">
                            <div className="col">
                                Produtos
                            </div>
                            <div className="input-group mb-3 col">
                                <input type="text" className="form-control" placeholder="Pesquisar..." aria-label="Pesquisar" aria-describedby="search-product-add-inventory"
                                    value={search}
                                    onChange={({ target: { value } }) => {
                                        setSearch(value);
                                    }}
                                />
                                <span className="input-group-text  btn btn-primary" id="search-product-add-inventory">
                                    <i className="bi bi-search"></i>
                                </span>
                            </div>
                        </div>
                    }
                    columns={columns}
                    data={filteredProducts}
                    pagination
                    paginationPerPage={10}
                />

            </main>
        </div>
    );
}

export default InventoryPageAdmin;