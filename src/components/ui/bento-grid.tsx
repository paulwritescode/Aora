import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Lock, Smartphone, Globe, Star, ShoppingCart, Heart } from "lucide-react"
import { Product } from "@/api/fakestore"

interface BentoGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

function TypeTester() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.5 : 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <motion.span
        className="font-serif text-6xl md:text-8xl text-white font-medium"
        animate={{ scale }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Aa
      </motion.span>
    </div>
  )
}

function SecurityBadge() {
  const [shields, setShields] = useState([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setShields(prev => {
        const nextIndex = prev.findIndex(s => !s.active)
        if (nextIndex === -1) {
          return prev.map(() => ({ id: Math.random(), active: false }))
        }
        return prev.map((s, i) => i === nextIndex ? { ...s, active: true } : s)
      })
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full gap-2">
      {shields.map((shield) => (
        <motion.div
          key={shield.id}
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            shield.active ? 'bg-white/20' : 'bg-white/5'
          }`}
          animate={{ scale: shield.active ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Lock className={`w-5 h-5 ${shield.active ? 'text-white' : 'text-gray-600'}`} />
        </motion.div>
      ))}
    </div>
  )
}

function GlobalNetwork() {
  const [pulses] = useState([0, 1, 2, 3, 4])

  return (
    <div className="flex items-center justify-center h-full relative">
      <Globe className="w-16 h-16 text-white/80 z-10" />
      {pulses.map((pulse) => (
        <motion.div
          key={pulse}
          className="absolute w-16 h-16 border-2 border-white/30 rounded-full"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: pulse * 0.8,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

function ProductCard({ product, onAddToCart }: { 
  product: Product; 
  onAddToCart?: (product: Product) => void;
}) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-1 relative overflow-hidden rounded-lg">
        <img 
          src={product.image || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400"} 
          alt={product.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
          </motion.button>
          {onAddToCart && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart(product)
              }}
              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
            </motion.button>
          )}
        </div>

        {/* Product info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
              />
            ))}
          </div>
          <h4 className="text-white font-medium text-sm line-clamp-1">{product.title}</h4>
          <p className="text-gray-300 text-xs">{product.category}</p>
          <p className="text-white font-bold text-sm">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default function BentoGrid({ products, onProductClick, onAddToCart }: BentoGridProps) {
  const featuredProducts = products.slice(0, 6)

  return (
    <section className="bg-zinc-950 px-6 py-24 min-h-screen flex items-center justify-center">
      <div className="max-w-7xl w-full mx-auto">
        <motion.p
          className="text-gray-400 text-sm uppercase tracking-widest mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Products
        </motion.p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
          {/* 1. Typography - Tall (2x2) */}
          <motion.div
            className="md:col-span-2 md:row-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(39, 39, 42, 1)" }}
          >
            <div className="flex-1">
              <TypeTester />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-xl text-white font-medium">Typography</h3>
              <p className="text-gray-400 text-sm mt-1">Beautiful, responsive type that scales perfectly.</p>
            </div>
          </motion.div>

          {/* 2. Featured Product 1 - Standard (2x1) */}
          {featuredProducts[0] && (
            <motion.div
              className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 0.98 }}
              onClick={() => onProductClick?.(featuredProducts[0])}
            >
              <ProductCard 
                product={featuredProducts[0]} 
                onAddToCart={onAddToCart}
              />
            </motion.div>
          )}

          {/* 3. Global Network - Tall (2x2) */}
          <motion.div
            className="md:col-span-2 md:row-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <GlobalNetwork />
              </div>
            </div>
            <div className="mt-auto relative z-20 bg-zinc-900/50 backdrop-blur-sm rounded-lg p-2">
              <h3 className="font-serif text-xl text-white flex items-center gap-2 font-medium">
                <Globe className="w-5 h-5" />
                Global Delivery
              </h3>
              <p className="text-gray-400 text-sm mt-1">Fast shipping worldwide with tracking.</p>
            </div>
          </motion.div>

          {/* 4. Featured Product 2 - Standard (2x1) */}
          {featuredProducts[1] && (
            <motion.div
              className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 0.98 }}
              onClick={() => onProductClick?.(featuredProducts[1])}
            >
              <ProductCard 
                product={featuredProducts[1]} 
                onAddToCart={onAddToCart}
              />
            </motion.div>
          )}

          {/* 5. Security - Wide (3x1) */}
          <motion.div
            className="md:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 0.98 }}
          >
            <div className="flex-1">
              <SecurityBadge />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-xl text-white flex items-center gap-2 font-medium">
                <Lock className="w-5 h-5" />
                Secure Payments
              </h3>
              <p className="text-gray-400 text-sm mt-1">Enterprise-grade encryption and data protection built-in.</p>
            </div>
          </motion.div>

          {/* 6. Mobile Responsive - Wide (3x1) */}
          <motion.div
            className="md:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 0.98 }}
          >
            <div className="flex-1 flex items-center justify-center">
              <Smartphone className="w-16 h-16 text-white" />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-xl text-white font-medium">Mobile Ready</h3>
              <p className="text-gray-400 text-sm mt-1">Optimized for all devices and screen sizes.</p>
            </div>
          </motion.div>

          {/* Additional Product Cards */}
          {featuredProducts.slice(2, 6).map((product, index) => (
            <motion.div
              key={product.id}
              className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 0.98 }}
              onClick={() => onProductClick?.(product)}
            >
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}