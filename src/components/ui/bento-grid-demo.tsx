import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BentoGrid from "./bento-grid"
import { getProducts } from "@/hooks/Products"
import { useCart } from "@/context/CartContext"

interface Product {
  id: number;
  name: string;
  price: string;
  image_link: string;
  brand: string;
  rating?: number;
  product_type: string;
  description?: string;
}

export default function BentoGridDemo() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data || [])
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`)
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price) || 0,
      image: product.image_link
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading products...</div>
      </div>
    )
  }

  return (
    <BentoGrid 
      products={products}
      onProductClick={handleProductClick}
      onAddToCart={handleAddToCart}
    />
  )
}