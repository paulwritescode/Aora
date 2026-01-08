import { useMemo } from 'react';
import { UnifiedProduct } from '@/api/combined';

export const useProductSearch = (products: UnifiedProduct[], searchQuery: string) => {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase().trim();
    
    return products.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.brand && product.brand.toLowerCase().includes(query))
    );
  }, [products, searchQuery]);
};