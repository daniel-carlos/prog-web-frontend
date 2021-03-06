import React, { useEffect, useState } from 'react';
import { useStore } from '../../context/context';
import { api } from '../../api/backend';
import DataTable from 'react-data-table-component';
import { searchProduct } from '../../components/common/searchControl';
import AddInventoryModal from './addInventoryModal.js';
import { Redirect, Link } from "react-router-dom";

function InventoryPageAdmin(props) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const [search, setSearch] = useState("");

    const { openModal, setSelection, selection, closeModal } = useStore(s => s);

    const refreshData = async () => {
        setLoading(true);
        const result = await api.get("product/list?size=1000&stock=0");
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
                    <div>{row.stock}</div>
                    :
                    <span className="text-danger">Indisponível</span>
            }</div>,
            grow: 1,
        },
        {
            name: 'Reservados',
            selector: row => row.reserved,
            sortable: true,
            right: true,
            cell: row => row.reserved,
            grow: 1,
        },
        {
            name: 'Entrega',
            selector: row => row.shipment,
            sortable: true,
            right: true,
            cell: row => row.shipment,
            grow: 1,
        },
        {
            name: 'Vendas',
            selector: row => row.total,
            sortable: true,
            right: true,
            cell: row => row.total,
            grow: 1,
        },
        {
            name: 'Ações',
            sortable: false,
            right: false,
            cell: product => (
                <div className="d-flex">
                    <Link to={`/productedit/${product.id}`}>
                        <i className="bi bi-pencil btn fs-3"></i>
                    </Link>
                    <i className="bi bi-box-seam btn fs-3"
                        onClick={() => {
                            setSelection(product);
                            openModal('addInventoryModal');
                        }}
                    ></i>
                </div>
            ),
            grow: 2,
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
            {/* {redirect > 0 && <Redirect to={`/productedit/${redirect}`} push={true}></Redirect>} */}
            <AddInventoryModal callback={modalCallback}></AddInventoryModal>
            <header className='d-flex'>
                <h2 className="flex-grow-1">Controle de Estoque</h2>
                {!loading ? <button
                    onClick={() => {
                        refreshData();
                    }}
                    className="btn btn-primary">
                    <span> Atualizar </span>
                </button>
                    :
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
                <Link className="btn btn-primary ms-3" to={`/productedit/0`}>
                    <span> Novo Produto </span>
                </Link>
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