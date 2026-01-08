import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BentoGrid from "./bento-grid"
import { fakeStoreAPI, Product } from "@/api/fakestore"
import { useCart } from "@/context/CartContext"
import { SimpleLoadingSkeleton } from "./skeleton"

export default function BentoGridDemo() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fakeStoreAPI.products.getAll()
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
      id: product.id.toString(),
      title: product.title,
      price: product.price,
      image: product.image
    })
  }

  if (loading) {
    return <SimpleLoadingSkeleton message="Loading products..." />;
  }

  return (
    <BentoGrid 
      products={products}
      onProductClick={handleProductClick}
      onAddToCart={handleAddToCart}
    />
  )
}