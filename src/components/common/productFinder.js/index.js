import React, { useEffect, useState } from 'react';
import { api } from "../../../api/backend";
import DataTable from 'react-data-table-component';

function ProductFinder(props) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

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
    ];

    const fetchData = async () => {
        setLoading(true);
        const response = await api.get("product/list?size=100");
        if (response.ok) {
            setProducts(response.data.products);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div id="productFinderModal" className="modal" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Selecione um Produto</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            products.length > 0 &&
                            <DataTable
                                title="Produtos"
                                columns={columns}
                                data={products}
                                pagination
                                paginationPerPage={15}
                                selectableRows
                                selectableRowsSingle
                            />
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary">Escolher</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductFinder;