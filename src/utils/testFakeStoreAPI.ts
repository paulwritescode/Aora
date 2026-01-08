import { fakeStoreAPI } from '../api/fakestore';

// Test function to verify API integration
export async function testFakeStoreAPI() {
  console.log('🧪 Testing FakeStore API Integration...');
  
  try {
    // Test 1: Get all products
    console.log('📦 Fetching all products...');
    const products = await fakeStoreAPI.products.getAll();
    console.log(`✅ Successfully fetched ${products.length} products`);
    
    // Test 2: Get categories
    console.log('🏷️ Fetching categories...');
    const categories = await fakeStoreAPI.products.getCategories();
    console.log(`✅ Successfully fetched ${categories.length} categories:`, categories);
    
    // Test 3: Get single product
    if (products.length > 0) {
      console.log('🔍 Fetching single product...');
      const singleProduct = await fakeStoreAPI.products.getById(products[0].id);
      console.log(`✅ Successfully fetched product: ${singleProduct.title}`);
    }
    
    // Test 4: Get products by category
    if (categories.length > 0) {
      console.log(`📂 Fetching products from category: ${categories[0]}...`);
      const categoryProducts = await fakeStoreAPI.products.getByCategory(categories[0]);
      console.log(`✅ Successfully fetched ${categoryProducts.length} products from ${categories[0]}`);
    }
    
    console.log('🎉 All API tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ API test failed:', error);
    return false;
  }
}

// Auto-run test in development
if (import.meta.env.DEV) {
  // Uncomment the line below to run tests automatically
  // testFakeStoreAPI();
}