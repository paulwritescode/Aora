import axios from 'axios';

const BASE_URL = 'http://makeup-api.herokuapp.com/api/v1';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Increased timeout to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for makeup API
export interface MakeupProduct {
  id: number;
  brand: string;
  name: string;
  price: string;
  price_sign: string | null;
  currency: string | null;
  image_link: string;
  product_link: string;
  website_link: string;
  description: string;
  rating: number | null;
  category: string | null;
  product_type: string;
  tag_list: string[];
  created_at: string;
  updated_at: string;
  product_api_url: string;
  api_featured_image: string;
  product_colors: ProductColor[];
}

export interface ProductColor {
  hex_value: string;
  colour_name: string;
}

// Makeup API functions
export const makeupAPI = {
  // Get all products
  getAll: async (): Promise<MakeupProduct[]> => {
    const response = await api.get('/products.json');
    return response.data;
  },

  // Get products by brand
  getByBrand: async (brand: string): Promise<MakeupProduct[]> => {
    const response = await api.get(`/products.json?brand=${brand}`);
    return response.data;
  },

  // Get products by product type
  getByProductType: async (productType: string): Promise<MakeupProduct[]> => {
    const response = await api.get(`/products.json?product_type=${productType}`);
    return response.data;
  },

  // Get products by category
  getByCategory: async (category: string): Promise<MakeupProduct[]> => {
    const response = await api.get(`/products.json?product_category=${category}`);
    return response.data;
  },

  // Get products with price range
  getByPriceRange: async (minPrice: number, maxPrice: number): Promise<MakeupProduct[]> => {
    const response = await api.get(`/products.json?price_greater_than=${minPrice}&price_less_than=${maxPrice}`);
    return response.data;
  },

  // Get products by rating
  getByRating: async (minRating: number): Promise<MakeupProduct[]> => {
    const response = await api.get(`/products.json?rating_greater_than=${minRating}`);
    return response.data;
  },
};

export default makeupAPI;