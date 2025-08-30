
import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const CatalogPage: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterClick = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredProducts = useMemo((): Product[] => {
    if (activeFilters.length === 0) {
      return MOCK_PRODUCTS;
    }
    return MOCK_PRODUCTS.filter(p => activeFilters.includes(p.category) || activeFilters.includes(p.subcategory));
  }, [activeFilters]);

  const allCategories = Object.entries(CATEGORIES).flatMap(([mainCat, subCats]) => [mainCat, ...subCats]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-4">Our Products</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8">Browse our selection of premium quality meat and dairy.</p>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {allCategories.map(filter => {
          const isActive = activeFilters.includes(filter);
          return (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors duration-200 ${
                isActive
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          );
        })}
        {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="px-4 py-2 text-sm font-medium rounded-full border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
            >
                Clear Filters
            </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <h3 className="text-2xl font-semibold">No Products Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
