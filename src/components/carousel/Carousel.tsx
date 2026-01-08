import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProducts } from "@/hooks/Products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface Product {
  id: number;
  name: string;
  image_link: string;
  description: string;
  price: string;
  product_type: string;
  brand: string;
}

function Carousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((fetchedProducts) => {
      if (fetchedProducts) {
        // Get first 6 products for carousel
        setProducts(fetchedProducts.slice(0, 6));
      }
      setLoading(false);
    });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [products.length]);

  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-pink-200 border-t-pink-600 rounded-full"
        />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No products available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 dark:from-neutral-900 dark:to-purple-900/20">
      {/* Main carousel */}
      <div className="relative w-full h-full">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              x: index === currentIndex ? 0 : index < currentIndex ? -100 : 100,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-8 max-w-4xl mx-auto px-8">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl"
                >
                  {product.image_link ? (
                    <img
                      src={product.image_link}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-800/30 dark:to-purple-800/30 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">No Image</span>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="flex-1 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-block bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {product.product_type}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 max-w-md">
                    {product.description || "Premium quality product from Maybelline's exclusive collection."}
                  </p>
                  
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                    <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                      {product.price ? `$${parseFloat(product.price).toFixed(2)}` : "Price on request"}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span className="text-gray-600 dark:text-gray-400">{product.brand}</span>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full">
                    Shop Now
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="sm"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-neutral-800/80 dark:hover:bg-neutral-800 rounded-full p-2"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-neutral-800/80 dark:hover:bg-neutral-800 rounded-full p-2"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-pink-600 w-6"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
