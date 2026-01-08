import { fakeStoreAPI, Product } from './fakestore';
import { makeupAPI, MakeupProduct } from './makeup';

// Unified product interface for our app
export interface UnifiedProduct {
  id: string; // Combined with source prefix
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  source: 'clothes' | 'makeup';
  originalId: number;
  brand?: string;
  rating?: number;
  inStock?: boolean;
}

// Convert FakeStore product to unified format
const convertFakeStoreProduct = (product: Product): UnifiedProduct => ({
  id: `clothes-${product.id}`,
  title: product.title,
  price: product.price,
  description: product.description,
  category: product.category,
  image: product.image,
  source: 'clothes',
  originalId: product.id,
  inStock: true,
});

// Convert Makeup product to unified format
const convertMakeupProduct = (product: MakeupProduct): UnifiedProduct => ({
  id: `makeup-${product.id}`,
  title: product.name,
  price: parseFloat(product.price) || 0,
  description: product.description,
  category: product.product_type || 'makeup',
  image: product.image_link,
  source: 'makeup',
  originalId: product.id,
  brand: product.brand,
  rating: product.rating || undefined,
  inStock: true,
});

export const combinedAPI = {
  // Get all products from both APIs
  getAllProducts: async (): Promise<UnifiedProduct[]> => {
    try {
      // Try to fetch both APIs with individual error handling
      const [clothesResult, makeupResult] = await Promise.allSettled([
        fakeStoreAPI.products.getAll(),
        makeupAPI.getAll(),
      ]);

      const unifiedClothes: UnifiedProduct[] = [];
      const unifiedMakeup: UnifiedProduct[] = [];

      // Handle clothes API result
      if (clothesResult.status === 'fulfilled') {
        unifiedClothes.push(...clothesResult.value.map(convertFakeStoreProduct));
      } else {
        console.warn('Clothes API failed:', clothesResult.reason);
      }

      // Handle makeup API result
      if (makeupResult.status === 'fulfilled') {
        const validMakeupProducts = makeupResult.value
          .filter(product => product.price && product.image_link && parseFloat(product.price) > 0)
          .slice(0, 50);
        unifiedMakeup.push(...validMakeupProducts.map(convertMakeupProduct));
      } else {
        console.warn('Makeup API failed:', makeupResult.reason);
      }

      return [...unifiedClothes, ...unifiedMakeup];
    } catch (error) {
      console.error('Error fetching combined products:', error);
      // Return empty array instead of throwing to prevent app crash
      return [];
    }
  },

  // Get popular products (mix of both with good ratings/reviews)
  getPopularProducts: async (): Promise<UnifiedProduct[]> => {
    try {
      const allProducts = await combinedAPI.getAllProducts();
      
      // Sort by price and rating to get "popular" items
      return allProducts
        .filter(product => product.price > 0)
        .sort((a, b) => {
          // Prioritize products with ratings, then by price
          if (a.rating && b.rating) {
            return b.rating - a.rating;
          }
          if (a.rating && !b.rating) return -1;
          if (!a.rating && b.rating) return 1;
          return b.price - a.price;
        })
        .slice(0, 20);
    } catch (error) {
      console.error('Error fetching popular products:', error);
      return [];
    }
  },

  // Get clothes products only
  getClothesProducts: async (): Promise<UnifiedProduct[]> => {
    try {
      const clothesProducts = await fakeStoreAPI.products.getAll();
      return clothesProducts.map(convertFakeStoreProduct);
    } catch (error) {
      console.error('Error fetching clothes products:', error);
      return [];
    }
  },

  // Get makeup products only
  getMakeupProducts: async (): Promise<UnifiedProduct[]> => {
    try {
      const makeupProducts = await makeupAPI.getAll();
      return makeupProducts
        .filter(product => product.price && product.image_link && parseFloat(product.price) > 0)
        .slice(0, 50)
        .map(convertMakeupProduct);
    } catch (error) {
      console.error('Error fetching makeup products:', error);
      return [];
    }
  },

  // Get product by unified ID
  getProductById: async (id: string): Promise<UnifiedProduct | null> => {
    try {
      const [source, originalId] = id.split('-');
      const numericId = parseInt(originalId);

      if (source === 'clothes') {
        const product = await fakeStoreAPI.products.getById(numericId);
        return convertFakeStoreProduct(product);
      } else if (source === 'makeup') {
        const allMakeup = await makeupAPI.getAll();
        const product = allMakeup.find(p => p.id === numericId);
        return product ? convertMakeupProduct(product) : null;
      }

      return null;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return null;
    }
  },
};

export default combinedAPI;