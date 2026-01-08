import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import ShoppingCartDrawer from "@/components/ui/shopping-cart-drawer";

const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"
  },
  {
    id: 2,
    name: "Smartphone Case",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=200"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200"
  },
  {
    id: 4,
    name: "USB Cable",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200"
  },
  {
    id: 5,
    name: "Laptop Stand",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200"
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=200"
  }
];

function CartDemoPage() {
  const { addToCart, items, getTotalItems } = useCart();

  const handleAddToCart = (product: typeof sampleProducts[0]) => {
    addToCart({
      id: product.id.toString(),
      title: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shopping Cart Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Add items to your cart and test the shopping cart drawer functionality
          </p>
          
          {/* Cart Status */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 dark:text-gray-400">Items in Cart</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{getTotalItems()}</p>
            </div>
            <ShoppingCartDrawer />
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  ${product.price.toFixed(2)}
                </p>
                
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full"
                  disabled={items.some(item => item.id === product.id.toString())}
                >
                  {items.some(item => item.id === product.id.toString()) ? 'Added to Cart' : 'Add to Cart'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Cart Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Add/Remove Items</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Easily manage cart contents</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Live Totals</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Real-time price calculations</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎫</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Promo Codes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Try "SAVE10" for discount</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">On orders over $50</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CartDemoPage;