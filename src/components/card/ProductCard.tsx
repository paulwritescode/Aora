import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  productType: string;
  brand: string;
  viewMode?: "grid" | "list";
}

function ProductCard({ 
  id,
  title, 
  description, 
  imageUrl, 
  price, 
  productType, 
  brand,
  viewMode = "grid" 
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

  const formatPrice = (priceStr: string) => {
    const numPrice = parseFloat(priceStr);
    return isNaN(numPrice) ? "Price on request" : `$${numPrice.toFixed(2)}`;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const numPrice = parseFloat(price);
    if (!isNaN(numPrice)) {
      addToCart({
        id,
        name: title,
        price: numPrice,
      });
    }
  };

  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <div className="flex flex-col md:flex-row">
            <Link to={`/product/${id}`} className="md:w-48 h-48 md:h-auto relative overflow-hidden">
              {!imageError && imageUrl ? (
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  src={imageUrl}
                  alt={title}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </Link>
            
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Badge variant="secondary" className="mb-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600">
                    {productType}
                  </Badge>
                  <Link to={`/product/${id}`}>
                    <CardTitle className="text-xl mb-2 line-clamp-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      {title}
                    </CardTitle>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{brand}</p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className="shrink-0"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </Button>
              </div>
              
              <CardDescription className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-400">
                {description || "Premium quality product from our exclusive collection."}
              </CardDescription>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-black dark:text-white">
                    {formatPrice(price)}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black group">
        <div className="relative overflow-hidden">
          <Link to={`/product/${id}`}>
            {!imageError && imageUrl ? (
              <img
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                src={imageUrl}
                alt={title}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
          </Link>
          
          <div className="absolute top-3 left-3">
            <Badge className="bg-black dark:bg-white text-white dark:text-black border-0">
              {productType}
            </Badge>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-3 right-3 bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black border border-gray-200 dark:border-gray-700"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
          </Button>
        </div>
        
        <CardHeader className="pb-2">
          <Link to={`/product/${id}`}>
            <CardTitle className="text-lg line-clamp-2 text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
              {title}
            </CardTitle>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">{brand}</p>
        </CardHeader>
        
        <CardContent className="pt-0 pb-2">
          <CardDescription className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {description || "Premium quality product from our exclusive collection."}
          </CardDescription>
          
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-1">(4.8)</span>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 flex items-center justify-between">
          <span className="text-xl font-bold text-black dark:text-white">
            {formatPrice(price)}
          </span>
          
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ProductCard;