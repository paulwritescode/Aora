import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from '@/hooks/useProducts';
import ProductDetail from '@/components/ui/product-detail';
import { ProductDetailSkeleton } from '@/components/ui/skeleton';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct(id || '');

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error?.message || 'Product not found'}
          </h2>
          <button
            onClick={handleBack}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProductDetail 
      product={product} 
      onBack={handleBack}
    />
  );
}

export default ProductDetailPage;