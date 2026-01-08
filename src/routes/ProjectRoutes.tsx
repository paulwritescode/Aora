import { Routes, Route } from "react-router-dom";
import ProductsPage from "@/pages/ProductsPage";
import HomePage from "@/pages/HomePage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import BentoGridPage from "@/pages/BentoGridPage";
import CartDemoPage from "@/pages/CartDemoPage";
import FakeStorePage from "@/pages/FakeStorePage";
import PopularPage from "@/pages/PopularPage";
import ClothesPage from "@/pages/ClothesPage";
import MakeupPage from "@/pages/MakeupPage";
import CheckoutPage from "@/pages/CheckoutPage";

function ProjectRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/popular" element={<PopularPage />} />
      <Route path="/clothes" element={<ClothesPage />} />
      <Route path="/makeup" element={<MakeupPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/bento" element={<BentoGridPage />} />
      <Route path="/cart-demo" element={<CartDemoPage />} />
      <Route path="/fakestore" element={<FakeStorePage />} />
    </Routes>
  );
}

export default ProjectRoutes;
