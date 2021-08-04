import React, { useEffect, useState } from 'react';
import { api } from '../../api/backend';
import { orderStatus } from '../../context/config';


import DataTable from 'react-data-table-component';
import moment from 'moment';


function AdminPedidosPage(props) {
    const [loading, setLoading] = useState(true);

    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filters, setFilters] = useState(["open", "confirmed"])

    const columns = [
        {
            name: 'Código',
            selector: row => row.order_id,
            sortable: true,
            compact: true,
        },
        {
            name: 'Usuário',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Data',
            selector: row => {
                return moment(row.created_date).format("DD/MM/YYYY")
            },
            sortable: true,
            right: true,
        },
        {
            name: 'Status',
            selector: row => {
                return (
                    <div style={{ color: orderStatus[row.status].color }}>
                        {row.status}
                    </div>
                )
            },
            defaultSortField: row => row.status,
            sortable: true,
            right: true,
        },
        {
            name: 'Quantidade',
            selector: row => {
                return row.amount
            },
            sortable: true,
            right: true,
        },
        {
            name: 'Valor',
            selector: row => {
                return row.toal_price
            },
            sortable: true,
            right: true,
        },
        {
            name: '',
            selector: row => {
                return (
                    <div className="d-flex justify-content-between">
                        <i type="button" className="b bi-house-fill mx-2"
                            onClick={() => {
                                deliverOrder(row);
                            }}
                            ></i>
                        <i type="button" className="bi bi-check-lg mx-2"
                            onClick={() => {
                                confirmOrder(row);
                            }}
                        ></i>
                        <i type="button" className="bi bi-x-lg mx-2"
                            onClick={() => {
                                cancelOrder(row, "canceled")
                            }}
                        ></i>
                    </div>
                )
            },
            sortable: false,
            right: true,
        },
    ];



    async function load() {
        const response = await api.post("/order/list", {
            status: 'open'
        });
        if (response.ok) {
            setOrders(response.data.orders.map(
                (order) => (
                    {
                        ...order,
                        amount: order.products.reduce((a, b) => ({ amount: a.amount + b.amount })).amount,
                        toal_price: order.products.reduce((a, b) => ({ price: a.price + b.price })).price,
                    }
                )
            ));
        }
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        setFilteredOrders(orders.filter((o) => filters.includes(o.status)));
    }, [orders]);

    const changeOrderStatus = (order, newStatus) => {
        setOrders(orders.map((o, i) => {
            console.log(order)
            if (order.order_id == o.order_id) {
                return { ...o, status: newStatus }
            } else {
                return { ...o };
            }
        }))
    }

    const confirmOrder = async (order) => {
        setLoading(true);
        const resp = await api.post("/order/confirm", {
            id: order.order_id
        })
        load();
        setLoading(false);
    }

    const deliverOrder = async (order) => {
        setLoading(true);
        const resp = await api.post("/order/deliver", {
            id: order.order_id
        })
        load();
        setLoading(false);
    }
    
    const cancelOrder = async (order) => {
        setLoading(true);
        const resp = await api.post("/order/cancel", {
            id: order.order_id
        })
        load();
        setLoading(false);
    }

    return (
        <div className="container">
            <h1>Gerenciar os pedidos</h1>

            {loading ?
                <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                :
                <DataTable
                    title={<div>Pedidos dos Clientes</div>}
                    columns={columns}
                    data={filteredOrders}
                />
            }
        </div>
    );
}

export default AdminPedidosPage;