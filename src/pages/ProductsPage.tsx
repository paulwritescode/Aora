import ProductCard from "@/components/card/ProductCard";
import { getProducts } from "@/hooks/Products";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  image_link: string;
  description: string;
  price: string;
  product_type: string;
  brand: string;
  category?: string;
}

function ProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    getProducts().then((products) => {
      if (products) {
        setProducts(products);
      }
      setLoading(false);
    });
  }, []);

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.product_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-black dark:border-t-white rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
          All Products
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Discover our complete collection of premium products
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-gray-300 dark:border-gray-600"
          >
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`rounded-none ${viewMode === "grid" ? "bg-black dark:bg-white text-white dark:text-black" : ""}`}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={`rounded-none ${viewMode === "list" ? "bg-black dark:bg-white text-white dark:text-black" : ""}`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Products Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredProducts?.length || 0} of {products?.length || 0} products
        </p>
      </motion.div>

      {/* Products Grid */}
      {filteredProducts && filteredProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <ProductCard
                id={product.id}
                title={product.name}
                description={product.description}
                imageUrl={product.image_link}
                price={product.price}
                productType={product.product_type}
                brand={product.brand}
                viewMode={viewMode}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {searchTerm ? "No products found matching your search." : "No products available."}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default ProductsPage;
