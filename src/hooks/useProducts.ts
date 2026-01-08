import { useQuery } from '@tanstack/react-query';
import { combinedAPI, UnifiedProduct } from '@/api/combined';

// Query keys
export const productKeys = {
  all: ['products'] as const,
  popular: () => [...productKeys.all, 'popular'] as const,
  clothes: () => [...productKeys.all, 'clothes'] as const,
  makeup: () => [...productKeys.all, 'makeup'] as const,
  byId: (id: string) => [...productKeys.all, 'detail', id] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
};

// Hook for popular products
export const usePopularProducts = () => {
  return useQuery({
    queryKey: productKeys.popular(),
    queryFn: async (): Promise<UnifiedProduct[]> => {
      try {
        return await combinedAPI.getPopularProducts();
      } catch (error) {
        console.error('Error fetching popular products:', error);
        // Return empty array on error to prevent app crash
        return [];
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for all products
export const useAllProducts = () => {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: async (): Promise<UnifiedProduct[]> => {
      try {
        return await combinedAPI.getAllProducts();
      } catch (error) {
        console.error('Error fetching all products:', error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};

// Hook for clothes products
export const useClothesProducts = () => {
  return useQuery({
    queryKey: productKeys.clothes(),
    queryFn: async (): Promise<UnifiedProduct[]> => {
      try {
        return await combinedAPI.getClothesProducts();
      } catch (error) {
        console.error('Error fetching clothes products:', error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};

// Hook for makeup products
export const useMakeupProducts = () => {
  return useQuery({
    queryKey: productKeys.makeup(),
    queryFn: async (): Promise<UnifiedProduct[]> => {
      try {
        return await combinedAPI.getMakeupProducts();
      } catch (error) {
        console.error('Error fetching makeup products:', error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};

// Hook for single product
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.byId(id),
    queryFn: async (): Promise<UnifiedProduct | null> => {
      try {
        return await combinedAPI.getProductById(id);
      } catch (error) {
        console.error('Error fetching product:', error);
        return null;
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes for individual products
  });
};