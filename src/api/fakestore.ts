import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types based on the OpenAPI schema
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartProduct {
  id: number;
  quantity?: number;
}

export interface Cart {
  id: number;
  userId: number;
  products: CartProduct[];
  date?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  name?: {
    firstname: string;
    lastname: string;
  };
  address?: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

// Products API
export const productsAPI = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  // Get single product by ID
  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get products by category
  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  // Add new product
  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await api.post('/products', product);
    return response.data;
  },

  // Update product
  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },

  // Delete product
  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
// Carts API
export const cartsAPI = {
  // Get all carts
  getAll: async (): Promise<Cart[]> => {
    const response = await api.get('/carts');
    return response.data;
  },

  // Get single cart by ID
  getById: async (id: number): Promise<Cart> => {
    const response = await api.get(`/carts/${id}`);
    return response.data;
  },

  // Get carts by user ID
  getByUserId: async (userId: number): Promise<Cart[]> => {
    const response = await api.get(`/carts/user/${userId}`);
    return response.data;
  },

  // Get carts in date range
  getByDateRange: async (startDate: string, endDate: string): Promise<Cart[]> => {
    const response = await api.get(`/carts?startdate=${startDate}&enddate=${endDate}`);
    return response.data;
  },

  // Add new cart
  create: async (cart: Omit<Cart, 'id'>): Promise<Cart> => {
    const response = await api.post('/carts', cart);
    return response.data;
  },

  // Update cart
  update: async (id: number, cart: Partial<Cart>): Promise<Cart> => {
    const response = await api.put(`/carts/${id}`, cart);
    return response.data;
  },

  // Delete cart
  delete: async (id: number): Promise<void> => {
    await api.delete(`/carts/${id}`);
  },
};

// Users API
export const usersAPI = {
  // Get all users
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  // Get single user by ID
  getById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Add new user
  create: async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await api.post('/users', user);
    return response.data;
  },

  // Update user
  update: async (id: number, user: Partial<User>): Promise<User> => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },

  // Delete user
  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// Auth API
export const authAPI = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

// Export the main API object
export const fakeStoreAPI = {
  products: productsAPI,
  carts: cartsAPI,
  users: usersAPI,
  auth: authAPI,
};

export default fakeStoreAPI;