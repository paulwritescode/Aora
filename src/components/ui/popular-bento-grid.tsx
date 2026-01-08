import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, StarIcon } from '@/lib/icons';
import { UnifiedProduct } from '@/api/combined';
import { Link } from 'react-router-dom';

interface PopularBentoGridProps {
  products: UnifiedProduct[];
}

const PopularBentoGrid: React.FC<PopularBentoGridProps> = ({ products }) => {
  // Get featured products for different sections
  const featuredProduct = products[0];
  const winterProduct = products[1];
  const shoesProducts = products.filter(p => p.category.toLowerCase().includes('shoe') || p.category === "men's clothing").slice(0, 2);
  const clothingProduct = products.find(p => p.source === 'clothes' && p.category !== "men's clothing");
  const makeupProducts = products.filter(p => p.source === 'makeup').slice(0, 2);

  return (
    <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[600px] w-full">
      {/* Main Featured Product - Large Accent Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="col-span-6 row-span-3 bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
            <HeartIcon className="w-5 h-5 text-accent-foreground" />
          </button>
        </div>
        <div className="h-full flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-accent-foreground mb-2">GET UP TO 50% OFF</h2>
            <button className="bg-background text-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary transition-colors">
              Get Discount
            </button>
          </div>
          {featuredProduct && (
            <div className="absolute right-4 bottom-4 w-32 h-32">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.title}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop";
                }}
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Shoes Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="col-span-3 row-span-6 bg-muted rounded-2xl p-4 flex flex-col"
      >
        <div className="flex-1 space-y-4">
          {shoesProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="block">
              <div className="bg-card rounded-xl p-4 relative group hover:shadow-md transition-all border border-border">
                <div className="absolute top-2 right-2">
                  <button className="p-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <HeartIcon className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop";
                    }}
                  />
                </div>
                <h3 className="font-medium text-sm text-foreground mb-1 line-clamp-2">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-bold">${product.price.toFixed(0)}</span>
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-3 h-3 fill-accent text-accent" />
                      <span className="text-xs text-muted-foreground">{product.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Shoes Section Right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="col-span-3 row-span-3 bg-card border border-border rounded-2xl p-4 relative overflow-hidden"
      >
        {shoesProducts[1] && (
          <Link to={`/product/${shoesProducts[1].id}`} className="block h-full">
            <div className="absolute top-4 right-4 z-10">
              <button className="p-2 bg-secondary/80 rounded-full backdrop-blur-sm hover:bg-secondary transition-colors">
                <HeartIcon className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="h-full flex flex-col justify-between">
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={shoesProducts[1].image}
                  alt={shoesProducts[1].title}
                  className="max-w-full max-h-32 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop";
                  }}
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-1">Your Choice</p>
                <h3 className="font-bold text-foreground mb-2 line-clamp-2">
                  {shoesProducts[1].title}
                </h3>
                <span className="text-accent font-bold text-lg">
                  ${shoesProducts[1].price.toFixed(0)}
                </span>
              </div>
            </div>
          </Link>
        )}
      </motion.div>

      {/* Winter Weekend - Accent Secondary Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="col-span-6 row-span-3 bg-gradient-to-br from-secondary to-muted rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-background/20 rounded-full backdrop-blur-sm hover:bg-background/30 transition-colors">
            <HeartIcon className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <div className="h-full flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Winter's weekend</h2>
            <p className="text-muted-foreground mb-4">Keep it Casual</p>
          </div>
          {winterProduct && (
            <div className="w-40 h-40">
              <img
                src={winterProduct.image}
                alt={winterProduct.title}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop";
                }}
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Fashion Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="col-span-3 row-span-3 bg-card border border-border rounded-2xl overflow-hidden relative"
      >
        {clothingProduct && (
          <Link to={`/product/${clothingProduct.id}`} className="block h-full">
            <div className="absolute top-4 right-4 z-10">
              <button className="p-2 bg-secondary/80 rounded-full backdrop-blur-sm hover:bg-secondary transition-colors">
                <HeartIcon className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="h-full">
              <div className="h-2/3 bg-accent/10 flex items-center justify-center p-4">
                <img
                  src={clothingProduct.image}
                  alt={clothingProduct.title}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop";
                  }}
                />
              </div>
              <div className="h-1/3 p-4 bg-accent/20 flex items-center justify-center">
                <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors">
                  Add Order
                </button>
              </div>
            </div>
          </Link>
        )}
      </motion.div>

      {/* Favorites Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="col-span-3 row-span-2 bg-muted rounded-2xl p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-foreground">Favourites</h3>
          <div className="flex gap-2">
            <button className="p-1 bg-secondary rounded hover:bg-secondary/80 transition-colors">
              <span className="text-xs">←</span>
            </button>
            <button className="p-1 bg-secondary rounded hover:bg-secondary/80 transition-colors">
              <span className="text-xs">→</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {makeupProducts.slice(0, 2).map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="block">
              <div className="aspect-square bg-card rounded-lg overflow-hidden border border-border hover:shadow-sm transition-shadow">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop";
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
        <button className="w-full mt-2 text-accent text-sm font-medium hover:text-accent/80 transition-colors">
          See All
        </button>
      </motion.div>

      {/* Bold Fashion Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="col-span-6 row-span-1 bg-primary rounded-2xl p-4 flex items-center justify-between text-primary-foreground relative overflow-hidden"
      >
        <div>
          <h3 className="text-xl font-bold mb-1">Bring Bold Fashion</h3>
          <p className="text-primary-foreground/80 text-sm">Layers on Layers</p>
        </div>
        {clothingProduct && (
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-primary-foreground/20">
            <img
              src={clothingProduct.image}
              alt={clothingProduct.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&h=100&fit=crop";
              }}
            />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <button className="p-1.5 bg-primary-foreground/20 rounded-full backdrop-blur-sm hover:bg-primary-foreground/30 transition-colors">
            <HeartIcon className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PopularBentoGrid;