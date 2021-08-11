import React, { useState, useEffect } from 'react';
import { api } from "../../api/backend";
import { useStore } from '../../context/context';
import { orderStatus } from '../../context/config';
import moment from 'moment';

function MyOrders(props) {
    const [orders, setOrders] = useState([]);
    const { dateNow } = useStore(s => s);

    useEffect(() => {
        async function loadData() {
            const response = await api.post("order/list", {
                status: "open"
            });
            if (response.ok) {
                const data = response.data;
                setOrders(data.orders);
            }
        };
        loadData();
    }, []);

    const OrderItem = ({ order }) => {
        const date = moment(order.created_date).format("DD/MM/YYYY"); 
        
        return (
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="mx-1">
                            <div className="fw-bold">Pedido</div>
                            <div>{`#${order.order_id}`}</div>
                        </div>
                        <div className="mx-1">
                            <div className="fw-bold">Status</div>
                            <div style={{color: orderStatus[order.status].color}}>{`${orderStatus[order.status].title}`}</div>
                        </div>
                        <div className="mx-1">
                            <div className="fw-bold">Data</div>
                            <div>{`${date}`}</div>
                        </div>
                        <div className="mx-1">
                            <div className="fw-bold">Produtos</div>
                            <div>{order.products.reduce((a, b) => ({amount: a.amount + b.amount})).amount}</div>
                        </div>
                        <div className="mx-1">
                            <div className="fw-bold">Total</div>
                            <div>{`R$${order.products.reduce((a, b) => ({price: a.price + b.price})).price.toFixed(2)}`}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <h2 className="fs-2">Meus Pedidos</h2>
            {
                orders.map((order, i) => {
                    return (
                        <OrderItem key={i} order={order} />
                    )
                })
            }
        </div>
    );
}

export default MyOrders;