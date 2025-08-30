
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../lib/utils';
import Button from '../components/ui/Button';

const CheckoutPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 0 ? 300 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!/^(?:\+?254)?(7\d{8})$/.test(phone)) {
        setError('Please enter a valid Safaricom number (e.g., 0712345678 or +254712345678)');
        return;
    }
    
    setIsProcessing(true);
    // Simulate M-Pesa STK Push
    setTimeout(() => {
        setIsProcessing(false);
        clearCart();
        navigate('/confirmation', { state: { total: grandTotal } });
    }, 3000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button onClick={() => navigate('/catalog')}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 border-b pb-3 dark:border-gray-700">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.quantityKg.toFixed(2)} kg @ {formatCurrency(item.product.pricePerKg)}/kg</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="font-semibold">{formatCurrency(item.product.pricePerKg * item.quantityKg)}</p>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-700">&times;</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t dark:border-gray-700 space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery Fee</span><span>{formatCurrency(deliveryFee)}</span></div>
            <div className="flex justify-between text-xl font-bold mt-2"><span>Total</span><span>{formatCurrency(grandTotal)}</span></div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">M-Pesa Payment</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Enter your M-Pesa number to receive a payment prompt (STK Push).</p>
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Safaricom Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="0712345678"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
              {isProcessing ? 'Processing Payment...' : `Pay ${formatCurrency(grandTotal)}`}
            </Button>
            {isProcessing && <p className="text-center mt-4 text-sm text-gray-500">Please check your phone to complete the payment.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
