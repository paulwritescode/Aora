import { useState, useEffect } from 'react';
import { fakeStoreAPI, Product } from '../api/fakestore';

// Hook for fetching all products
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await fakeStoreAPI.products.getAll();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}

// Hook for fetching a single product
export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await fakeStoreAPI.products.getById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
}

// Hook for fetching products by category
export function useProductsByCategory(category: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await fakeStoreAPI.products.getByCategory(category);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  return { products, loading, error };
}

// Hook for fetching categories
export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await fakeStoreAPI.products.getCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

// Legacy function for backward compatibility
export async function getProducts() {
  try {
    return await fakeStoreAPI.products.getAll();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
