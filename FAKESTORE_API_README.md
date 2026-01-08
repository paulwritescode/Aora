# FakeStore API Integration

This project now includes a complete integration with the FakeStore API - a free fake API for testing and prototyping e-commerce applications.

## 🚀 Features

- **Complete API Coverage**: All FakeStore API endpoints are implemented
- **TypeScript Support**: Fully typed interfaces for all API responses
- **React Hooks**: Custom hooks for easy data fetching
- **Error Handling**: Comprehensive error handling and loading states
- **Category Filtering**: Filter products by category
- **Responsive UI**: Beautiful, responsive product grid

## 📁 File Structure

```
src/
├── api/
│   └── fakestore.ts          # Main API client with all endpoints
├── hooks/
│   └── Products.ts           # React hooks for data fetching
├── components/
│   └── FakeStoreDemo.tsx     # Demo component showcasing the API
└── pages/
    └── FakeStorePage.tsx     # Page component for the demo
```

## 🔧 API Client (`src/api/fakestore.ts`)

### Available APIs

#### Products API
- `productsAPI.getAll()` - Get all products
- `productsAPI.getById(id)` - Get single product
- `productsAPI.getByCategory(category)` - Get products by category
- `productsAPI.getCategories()` - Get all categories
- `productsAPI.create(product)` - Add new product
- `productsAPI.update(id, product)` - Update product
- `productsAPI.delete(id)` - Delete product

#### Carts API
- `cartsAPI.getAll()` - Get all carts
- `cartsAPI.getById(id)` - Get single cart
- `cartsAPI.getByUserId(userId)` - Get carts by user
- `cartsAPI.getByDateRange(start, end)` - Get carts in date range
- `cartsAPI.create(cart)` - Add new cart
- `cartsAPI.update(id, cart)` - Update cart
- `cartsAPI.delete(id)` - Delete cart

#### Users API
- `usersAPI.getAll()` - Get all users
- `usersAPI.getById(id)` - Get single user
- `usersAPI.create(user)` - Add new user
- `usersAPI.update(id, user)` - Update user
- `usersAPI.delete(id)` - Delete user

#### Auth API
- `authAPI.login(credentials)` - Login user

## 🎣 React Hooks (`src/hooks/Products.ts`)

### Available Hooks

```typescript
// Get all products
const { products, loading, error } = useProducts();

// Get single product
const { product, loading, error } = useProduct(productId);

// Get products by category
const { products, loading, error } = useProductsByCategory('electronics');

// Get all categories
const { categories, loading, error } = useCategories();
```

## 🎨 Demo Component

The `FakeStoreDemo` component showcases:
- Product grid with responsive design
- Category filtering
- Loading states and error handling
- Product cards with images, descriptions, and prices
- Add to cart functionality (UI only)

## 🌐 Navigation

The FakeStore demo is accessible via:
- **URL**: `/fakestore`
- **Sidebar**: "FakeStore API" menu item

## 📊 Data Types

### Product
```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
```

### Cart
```typescript
interface Cart {
  id: number;
  userId: number;
  products: CartProduct[];
  date?: string;
}
```

### User
```typescript
interface User {
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
```

## 🔗 API Endpoints

Base URL: `https://fakestoreapi.com`

### Products
- `GET /products` - All products
- `GET /products/{id}` - Single product
- `GET /products/categories` - All categories
- `GET /products/category/{category}` - Products by category
- `POST /products` - Add product
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Carts
- `GET /carts` - All carts
- `GET /carts/{id}` - Single cart
- `GET /carts/user/{userId}` - User's carts
- `POST /carts` - Add cart
- `PUT /carts/{id}` - Update cart
- `DELETE /carts/{id}` - Delete cart

### Users
- `GET /users` - All users
- `GET /users/{id}` - Single user
- `POST /users` - Add user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Auth
- `POST /auth/login` - Login

## 🚀 Usage Examples

### Basic Product Fetching
```typescript
import { useProducts } from '../hooks/Products';

function ProductList() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
```

### Direct API Usage
```typescript
import { fakeStoreAPI } from '../api/fakestore';

// Get all products
const products = await fakeStoreAPI.products.getAll();

// Get electronics category
const electronics = await fakeStoreAPI.products.getByCategory('electronics');

// Login user
const response = await fakeStoreAPI.auth.login({
  username: 'johnd',
  password: 'm38rmF$'
});
```

## 🎯 Next Steps

1. **Cart Integration**: Connect the "Add to Cart" buttons to your cart context
2. **User Authentication**: Implement login/logout functionality
3. **Product Details**: Create detailed product pages
4. **Search & Filters**: Add search and advanced filtering
5. **Pagination**: Implement pagination for large product lists

## 📝 Notes

- The FakeStore API is read-only for most operations (POST/PUT/DELETE return fake responses)
- All API calls include proper error handling and TypeScript types
- The demo component is fully responsive and follows your app's design system
- Images may load slowly as they come from external sources