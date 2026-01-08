import { motion } from 'framer-motion';
import { usePopularProducts } from '@/hooks/useProducts';
import { useProductSearch } from '@/hooks/useSearch';
import PopularBentoGrid from '@/components/ui/popular-bento-grid';
import ProductCard from '@/components/ui/product-card';
import { useSearchParams } from 'react-router-dom';
import { ProductGridSkeleton } from '@/components/ui/skeleton';

function PopularPage() {
  const { data: products = [], isLoading, error } = usePopularProducts();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const filteredProducts = useProductSearch(products, searchQuery);

  const handleToggleWishlist = (productId: string, isWishlisted: boolean) => {
    console.log(`Product ${productId} ${isWishlisted ? 'added to' : 'removed from'} wishlist`);
  };

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">We're having trouble loading the popular products.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'Explore'}
                </h1>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `Found ${filteredProducts.length} products matching your search`
                    : 'Discover trending products and exclusive deals'
                  }
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
                  <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium">
                    All
                  </button>
                  <button className="px-4 py-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                    Men
                  </button>
                  <button className="px-4 py-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                    Women
                  </button>
                </div>
                <button className="bg-card p-2 rounded-lg border border-border hover:bg-secondary transition-colors">
                  <span className="text-muted-foreground">Filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bento Grid - Only show when not searching */}
          {!searchQuery && filteredProducts.length > 0 && (
            <div className="mb-12">
              <PopularBentoGrid products={filteredProducts} />
            </div>
          )}

          {/* Products Grid - Show when searching or as additional products */}
          {(searchQuery || filteredProducts.length > 8) && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {searchQuery ? 'Search Results' : 'More Popular Items'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(searchQuery ? filteredProducts : filteredProducts.slice(8)).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ProductCard
                      product={product}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {searchQuery ? 'No products found' : 'No products available'}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? 'Try adjusting your search terms or browse our popular categories.'
                  : 'Check back later for new arrivals and popular items.'
                }
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default PopularPage;