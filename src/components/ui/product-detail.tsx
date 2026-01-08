import React, { useState } from 'react';
import { HeartIcon, ShoppingCartIcon, StarIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon, TruckIcon, ShieldIcon, MinusIcon, PlusIcon } from '@/lib/icons';
import { UnifiedProduct } from '@/api/combined';
import { useCart } from '@/context/CartContext';

interface ProductDetailProps {
  product: UnifiedProduct;
  onBack?: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  // Generate multiple images for demo (in real app, this would come from API)
  const images = [
    product.image,
    product.image, // Duplicate for demo
    product.image,
    product.image
  ];

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
    }
  };

  // Generate stars for rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon 
          key={i} 
          className={`w-4 h-4 ${i <= Math.round(rating) ? 'text-accent fill-current' : 'text-muted-foreground'}`}
        />
      );
    }
    return stars;
  };

  // Product highlights based on source
  const highlights = product.source === 'makeup' 
    ? [
        'Cruelty-free and vegan',
        'Long-lasting formula',
        'Suitable for all skin types',
        'Easy application',
        'Professional quality'
      ]
    : [
        'Premium quality materials',
        'Comfortable fit',
        'Durable construction',
        'Versatile styling',
        'Easy care instructions'
      ];

  return (
    <div className="bg-background min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Products
          </button>
        )}

        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-1 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-foreground">Home</a></li>
            <li className="text-muted-foreground">/</li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground">{product.source === 'makeup' ? 'Beauty' : 'Fashion'}</a></li>
            <li className="text-muted-foreground">/</li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground">{product.category}</a></li>
            <li className="text-muted-foreground">/</li>
            <li className="text-foreground font-medium">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          {/* Product Gallery */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted mb-4">
              <img 
                src={images[currentImageIndex]} 
                alt={`${product.title} - View ${currentImageIndex + 1}`}
                className="object-cover h-full w-full"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop";
                }}
              />
              
              {/* Navigation buttons */}
              <button 
                onClick={prevImage} 
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-background rounded-full p-2 shadow-lg hover:bg-secondary transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 text-foreground" />
              </button>
              <button 
                onClick={nextImage} 
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-background rounded-full p-2 shadow-lg hover:bg-secondary transition-colors"
              >
                <ArrowRightIcon className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`aspect-square rounded-lg overflow-hidden ${
                    currentImageIndex === idx 
                      ? 'ring-2 ring-accent' 
                      : 'ring-1 ring-border'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${idx + 1}`} 
                    className="object-cover h-full w-full"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&h=150&fit=crop";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2 flex justify-between items-start">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                  {product.title}
                </h1>
                {product.brand && (
                  <p className="text-lg text-muted-foreground mb-2">
                    by {product.brand}
                  </p>
                )}
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating.toFixed(1)} (124 reviews)
                    </span>
                  </div>
                )}
              </div>
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full ${
                  isWishlisted 
                    ? 'text-destructive bg-destructive/10' 
                    : 'text-muted-foreground hover:text-destructive'
                }`}
              >
                <HeartIcon className="w-6 h-6" fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="mt-4 mb-6">
              <span className="text-2xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-accent">
                In stock
              </span>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-border">
              <nav className="flex space-x-8">
                {['description', 'details', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-accent text-accent'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab content */}
            <div className="mb-8">
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {product.description || 'This is a high-quality product that meets all your needs. Crafted with attention to detail and designed for both style and functionality.'}
                  </p>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Highlights
                  </h3>
                  <ul className="space-y-2">
                    {highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckIcon className="text-green-500 dark:text-green-400 mr-2 w-4 h-4" />
                        <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 'details' && (
                <div className="text-gray-700 dark:text-gray-300">
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Source:</strong> {product.source === 'makeup' ? 'Beauty & Cosmetics' : 'Fashion & Apparel'}</p>
                  {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
                  <p><strong>Product ID:</strong> {product.id}</p>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <TruckIcon className="text-gray-500 dark:text-gray-400 mr-3 w-5 h-5" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Free shipping</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">2-3 business days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ShieldIcon className="text-gray-500 dark:text-gray-400 mr-3 w-5 h-5" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">30-day returns</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Hassle-free returns</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mt-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    disabled={quantity <= 1}
                  >
                    <MinusIcon className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-12 text-center border-0 focus:ring-0 bg-transparent text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center gap-2"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  Add to cart
                </button>
              </div>
              <button
                className="mt-4 w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;