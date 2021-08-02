import React, { useState, useEffect } from 'react';
import { api } from "../../api/backend";
import { useStore } from '../../context/context';

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
                console.log("Orders", data);
            }
        };
        loadData();
    }, []);

    return (
        <div className="container">
            <span className="fs-2 text-danger">TODO: Histórico de pedidos</span>
        </div>
    );
}

export default MyOrders;