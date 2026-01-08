import React, { useState } from 'react';
import { useProducts, useCategories, useProductsByCategory } from '../hooks/Products';
import { Product } from '../api/fakestore';

const FakeStoreDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { products: allProducts, loading: allLoading, error: allError } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  const { products: categoryProducts, loading: categoryLoading } = useProductsByCategory(selectedCategory);

  const displayProducts = selectedCategory ? categoryProducts : allProducts;
  const isLoading = selectedCategory ? categoryLoading : allLoading;

  if (allError) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 text-lg font-semibold">Error loading products</div>
        <p className="text-gray-600 mt-2">{allError}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">FakeStore API Demo</h1>
        <p className="text-gray-600 mb-6">
          Browse products from the FakeStore API - a free fake API for testing and prototyping e-commerce applications.
        </p>

        {/* Category Filter */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={categoriesLoading}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading products...</span>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && displayProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      )}
    </div>
  );
};

// Product Card Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square bg-gray-100 relative">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
          </div>
        )}
        {!imageError ? (
          <img
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-contain p-4 ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>Image not available</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-xs mb-3 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition-colors duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FakeStoreDemo;