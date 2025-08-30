
import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatCurrency } from '../lib/utils';
import Button from '../components/ui/Button';

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);


const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  
  if (!location.state?.total) {
    return <Navigate to="/" />;
  }

  const { total } = location.state;

  return (
    <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 p-8 md:p-12 rounded-lg shadow-xl">
      <CheckCircleIcon className="w-24 h-24 text-primary-500 mx-auto mb-6" />
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
        Thank you for your order. We've received your payment of:
      </p>
      <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-8">
        {formatCurrency(total)}
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Your order is now being processed. You will receive an SMS confirmation shortly with your order details and delivery information.
      </p>
      <Link to="/catalog">
        <Button size="lg">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
