import React, { useEffect, useState } from 'react';
import { api } from '../../api/backend';

function AdminPedidosPage(props) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function load() {
            const response = await api.post("/order/list", {
                status: 'open'
            });
            if (response.ok) {
                setOrders(response.data.orders);
            }
        }
        load();
    }, []);

    useEffect(() => {
        if (orders.length > 0) {
           
        }
    }, [orders]);

    return (
        <div className="container">
            <h1>Gerenciar os pedidos</h1>

            <table id="datatable" className="display">
                <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Row 1 Data 1</td>
                        <td>Row 1 Data 2</td>
                    </tr>
                    <tr>
                        <td>Row 2 Data 1</td>
                        <td>Row 2 Data 2</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AdminPedidosPage;