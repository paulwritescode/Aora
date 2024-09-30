import ProductCard from "@/components/card/ProductCard";
import Carousel from "@/components/carousel/Carousel";
import { getProducts } from "@/hooks/Products";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  image_link: string;
  description: string;
  price: number;
  // Add other fields as needed, e.g. price, description, etc.
}

function ProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null); // Type for products

  useEffect(() => {
    getProducts().then((products) => {
      if (products) {
        setProducts(products); // Set products in state
        console.log(products);
      } else {
        console.log("Failed to fetch products.");
      }
    });
  }, []);

  return (
    <>
      {products ? (
        <div>
          <h3 className="bg-purple-200">Fetched Products</h3>
          <Carousel />
          <ul className="grid grid-cols-3 h-[100%] gap-2">
            {products.map((product) => (
              <div className="" key={product.id}>
                <ProductCard
                  title={product.name}
                  description={product.image_link}
                  content={product.description}
                  footer={product.price}
                />
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading products...</p>
      )}
    </>
  );
}

export default ProductsPage;
