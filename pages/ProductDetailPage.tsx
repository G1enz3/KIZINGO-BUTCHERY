
import React, { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { formatCurrency } from '../lib/utils';
import { useCart } from '../hooks/useCart';
import Button from '../components/ui/Button';
import RecipeGenerator from '../components/RecipeGenerator';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(0.5);
  const { addToCart } = useCart();

  const product = useMemo(() => MOCK_PRODUCTS.find(p => p.id === productId), [productId]);

  if (!product) {
    return <Navigate to="/catalog" />;
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(0.1, prev + amount));
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
    }
  };
  
  const formattedQuantity = quantity.toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Product Image */}
        <div>
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
            <span className="text-primary-600 dark:text-primary-400 font-semibold">{product.category} &gt; {product.subcategory}</span>
            <h1 className="text-4xl md:text-5xl font-bold my-2">{product.name}</h1>
            <p className="text-3xl font-light text-gray-800 dark:text-gray-200 mb-4">{formatCurrency(product.pricePerKg)} / kg</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{product.description}</p>
            
            {/* Quantity Selector and Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                <button onClick={() => handleQuantityChange(-0.1)} className="px-4 py-2 text-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-md">-</button>
                <input
                type="text"
                readOnly
                value={`${formattedQuantity} kg`}
                className="w-24 text-center font-semibold text-lg bg-transparent border-none focus:ring-0"
                />
                <button onClick={() => handleQuantityChange(0.1)} className="px-4 py-2 text-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-md">+</button>
            </div>
            <Button onClick={handleAddToCart} size="lg" className="flex-grow">
                Add to Cart ({formatCurrency(product.pricePerKg * quantity)})
            </Button>
            </div>
        </div>
        </div>
        <RecipeGenerator productName={product.name} />
    </div>
  );
};

export default ProductDetailPage;
