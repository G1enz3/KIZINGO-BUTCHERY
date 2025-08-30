
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { useCart } from '../hooks/useCart';
import Button from './ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Default to adding 0.5kg when adding from card
    addToCart(product, 0.5);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">{product.subcategory}</div>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 truncate">
          <Link to={`/product/${product.id}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{formatCurrency(product.pricePerKg)} / kg</p>
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
