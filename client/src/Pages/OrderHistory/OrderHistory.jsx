import React, { useEffect } from 'react';
import useOrderStore from '../../store/useOrder.store';
import userAuthStore from '../../store/useAuth.store';
import './OrderHistory.scss';

function OrderHistory() {
    const { getOrdersHistory, userOrderHistory } = useOrderStore();
    const { user } = userAuthStore();

    useEffect(() => {
        const fetchData = async () => {
            await getOrdersHistory(user?._id);
        };
        fetchData();
    }, []);

    return (
        <div className="order-history">
            <h2>Order History</h2>
            {userOrderHistory && userOrderHistory.length > 0 ? (
                userOrderHistory.map((order) => (
                    <div key={order?._id} className="order-history__item">
                        <div className="order-history__header">
                            <p>Order ID: {order?._id}</p>
                            <p>Quantity: {order?.items.length}</p>
                        </div>
                        <div className="order-history__details">
                            <p><span className="label">Total Amount:</span> <span className="value">{order?.totalAmount}</span></p>
                            <p><span className="label">Delivery Status:</span> <span className="value">{order?.status}</span></p>
                            <p><span className="label">Payment Status:</span> <span className="value">{order?.paymentStatus}</span></p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}

export default OrderHistory;
