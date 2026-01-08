import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Star, 
  ShoppingCart, 
  ArrowLeft, 
  Plus, 
  Minus,
  Share,
  Truck
} from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("black");

  const productId = parseInt(id || "1");
  const productPrice = productId * 25 + 50;

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = [
    { name: "black", value: "#000000" },
    { name: "white", value: "#FFFFFF" },
    { name: "gray", value: "#6B7280" },
  ];

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: `Premium Product ${id}`,
      price: productPrice,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
            <button className="absolute top-4 right-4 p-3 bg-white dark:bg-black rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <Heart className="w-5 h-5" />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-lg">Product Image {id}</span>
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((thumb) => (
              <div 
                key={thumb}
                className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:ring-2 hover:ring-black dark:hover:ring-white transition-all"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{thumb}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Product Title & Rating */}
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
              Premium Product {id}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                  />
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  4.8 (124 reviews)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-black dark:text-white">
                ${productPrice}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${productPrice + 30}
              </span>
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded">
                25% OFF
              </span>
            </div>
          </div>

          {/* Product Description */}
          <div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Experience premium quality with this carefully crafted product. 
              Made with attention to detail and designed for modern lifestyle. 
              Perfect for everyday use with exceptional durability and style.
            </p>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-semibold text-black dark:text-white mb-3">
              Color: <span className="capitalize">{selectedColor}</span>
            </h3>
            <div className="flex items-center gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? "border-black dark:border-white scale-110"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-sm font-semibold text-black dark:text-white mb-3">
              Size: {selectedSize}
            </h3>
            <div className="flex items-center gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                    selectedSize === size
                      ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-black dark:text-white mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="border-gray-300 dark:border-gray-600">
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <Truck className="w-4 h-4" />
              <span>Free shipping on orders over $50</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold text-black dark:text-white mb-8">
          You might also like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <Link
              key={item}
              to={`/product/${item + 10}`}
              className="group cursor-pointer"
            >
              <div className="relative bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 mb-3 aspect-square overflow-hidden">
                <button className="absolute top-3 right-3 p-2 bg-white dark:bg-black rounded-full shadow-sm hover:shadow-md transition-shadow">
                  <Heart className="w-4 h-4" />
                </button>
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">Product {item + 10}</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  Related Product {item + 10}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-black dark:text-white">${(item + 10) * 15}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-500">4.{item + 5}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default ProductDetailPage;