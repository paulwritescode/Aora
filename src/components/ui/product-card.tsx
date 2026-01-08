import React, { useState } from 'react';
import { HeartIcon, ShoppingCartIcon, StarIcon } from '@/lib/icons';
import { Link } from 'react-router-dom';
import { UnifiedProduct } from '@/api/combined';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: UnifiedProduct;
  onToggleWishlist?: (productId: string, isWishlisted: boolean) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onToggleWishlist 
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    onToggleWishlist?.(product.id, !isWishlisted);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };

  // Theme-aware colors
  const cardClasses = 'bg-card text-card-foreground border-border';
  const textSecondary = 'text-muted-foreground';
  const textMuted = 'text-muted-foreground';
  const buttonPrimary = 'bg-accent hover:bg-accent/90 text-accent-foreground';
  const wishlistButton = 'bg-card hover:bg-secondary border border-border';

  // Calculate discount percentage if there's a sale
  const originalPrice = product.price * 1.2; // Simulate original price
  const hasDiscount = product.source === 'clothes' && Math.random() > 0.7; // Random discount for demo

  return (
    <div className={`w-full rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group transform hover:scale-[1.02] ${cardClasses}`}>
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop";
            }}
          />
          
          {/* Sale Badge */}
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-medium">
              -20%
            </div>
          )}

          {/* Source Badge */}
          <div className="absolute bottom-2 left-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-md ${
              product.source === 'clothes' 
                ? 'bg-accent/20 text-accent-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}>
              {product.source === 'clothes' ? 'Fashion' : 'Beauty'}
            </span>
          </div>

          {/* Stock Badge */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm">
              <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-md font-medium text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Wishlist Button - Outside the Link */}
      <button
        onClick={handleWishlistClick}
        className={`absolute top-2 right-2 p-2 rounded-md transition-all duration-200 z-10 ${wishlistButton} ${
          isWishlisted ? 'text-destructive' : textMuted
        } hover:scale-110 shadow-sm backdrop-blur-sm`}
      >
        <HeartIcon size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
      </button>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          {/* Category */}
          <p className={`text-xs uppercase tracking-wide font-medium mb-1 ${textMuted}`}>
            {product.category}
          </p>

          {/* Brand */}
          {product.brand && (
            <p className={`text-xs font-medium mb-1 ${textSecondary}`}>
              {product.brand}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-sm mb-2 leading-tight line-clamp-2">
            {product.title}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-3">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i}
                    size={12}
                    className={`${
                      i < Math.floor(product.rating!) 
                        ? 'text-accent fill-current' 
                        : textMuted
                    }`}
                  />
                ))}
              </div>
              <span className={`text-xs font-medium ${textSecondary}`}>
                {product.rating.toFixed(1)}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline space-x-2">
              {hasDiscount ? (
                <>
                  <span className="text-lg font-bold text-destructive">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className={`text-sm line-through ${textMuted}`}>
                    ${originalPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            {product.inStock && (
              <span className="text-xs font-medium bg-accent/20 text-accent-foreground px-2 py-1 rounded-md">
                ✓ In Stock
              </span>
            )}
          </div>
        </Link>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2.5 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center space-x-2 text-sm ${
            product.inStock
              ? `${buttonPrimary} hover:shadow-sm active:scale-95 transform`
              : `bg-muted text-muted-foreground cursor-not-allowed`
          }`}
        >
          <ShoppingCartIcon size={16} />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;