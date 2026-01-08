import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { useMakeupProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ui/product-card';
import { useState, useMemo } from 'react';
import { ProductCardSkeleton } from '@/components/ui/skeleton';

function MakeupPage() {
  const { data: products = [], isLoading, error } = useMakeupProducts();
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  // Filter products using useMemo for performance
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by brand
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => 
        product.brand?.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    return filtered;
  }, [products, selectedBrand, priceRange]);

  const handleToggleWishlist = (productId: string, isWishlisted: boolean) => {
    console.log(`Product ${productId} ${isWishlisted ? 'added to' : 'removed from'} wishlist`);
  };

  // Get unique brands for filter
  const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground mb-3">Error</h2>
          <p className="text-muted-foreground">{error.message || 'Failed to load makeup products'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Beauty & Makeup
            </h1>
            <p className="text-muted-foreground">
              Discover premium beauty products from top brands
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filters:</span>
            </div>
            
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-3 py-1.5 border border-input rounded-md bg-background text-foreground text-sm focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3 py-1.5 border border-input rounded-md bg-background text-foreground text-sm focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Prices</option>
              <option value="0-10">$0 - $10</option>
              <option value="10-25">$10 - $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50">$50+</option>
            </select>

            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} products found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <ProductCard
                  product={product}
                  onToggleWishlist={handleToggleWishlist}
                />
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No products found matching your filters.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default MakeupPage;