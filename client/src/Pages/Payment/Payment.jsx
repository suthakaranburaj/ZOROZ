import React, { useState } from 'react';

import './Payment.scss';
import Loader from '../../Components/Loader/Loader';
import usePaymentStore from '../../store/usePayment.store';
import useCartStore from '../../store/useCart.store';

import { useNavigate, useParams } from 'react-router-dom';

function Payment() {
    const { initiatePayment, isLoading, error, confirmPayment ,currentPayment} = usePaymentStore();
    const { userCart } = useCartStore();
    const { orderId } = useParams();

    // State to manage selected payment method
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);

    // Form input states for confirming payment
    const [paymentId, setPaymentId] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    const navigate = useNavigate();

    const handlePayment = async () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        // Initiate payment and set the flag to true
        await initiatePayment({ orderId, amount: userCart?.totalPrice, paymentMethod });
        setIsPaymentInitiated(true);
    };

    const handleConfirmPayment = async () => {
        if (!transactionId) {
            alert("Please fill in all confirmation fields.");
            return;
        }

        // Call confirmPayment from the store
        await confirmPayment({ paymentId:currentPayment?._id, transactionId, paymentStatus:"success" });
        setIsPaymentInitiated(false); // Reset the payment form
        alert("Payment Done successfully !")
        navigate('/');
    };

    return (
        <>
            <div className='paymentContainer'>
                <p>Total Amount to Pay: {userCart?.totalPrice}</p>
                <p>Select Payment Method:</p>

                {/* Dropdown for payment method selection */}
                <select 
                    value={paymentMethod} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className='paymentMethodSelect'
                >
                    <option value="">Select Payment Method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="net_banking">Net Banking</option>
                </select>

                <button onClick={handlePayment}>Proceed</button>
            </div>

            {isLoading && <Loader />}
            {error && <p className="error">{error}</p>}

            {/* Confirmation form after payment initiation */}
            {isPaymentInitiated && (
                <div className='confirmationForm'>
                    <h3>Enter your transaction Id</h3>
                    <input 
                        type="text" 
                        placeholder="Transaction ID" 
                        value={transactionId} 
                        onChange={(e) => setTransactionId(e.target.value)}
                    />
                    <button onClick={handleConfirmPayment}>Confirm Payment</button>
                </div>
            )}
        </>
    );
}

export default Payment;
