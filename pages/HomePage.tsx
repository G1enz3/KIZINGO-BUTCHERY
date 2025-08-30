
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-primary-700 text-white rounded-lg p-8 md:p-16 flex items-center overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1200/400')" }}></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Farm-Fresh Quality, Delivered.
          </h1>
          <p className="text-lg md:text-xl mb-8">
            The finest selection of meat and dairy products, sourced from the best local farms in Kenya and delivered right to your doorstep.
          </p>
          <Link to="/catalog">
            <Button size="lg" variant="secondary">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Link to="/catalog">
                <Button size="lg">View All Products</Button>
            </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
