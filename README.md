# Aora - Modern E-Commerce Platform

A comprehensive, modern e-commerce platform featuring beauty products, fashion items, and more. Built with React, TypeScript, and Tailwind CSS with a focus on user experience and accessibility.

## ✨ Features

### 🛍️ E-Commerce Functionality
- **Shopping Cart System** - Full cart management with add/remove items, quantity control
- **Product Categories** - Beauty/Makeup, Fashion/Clothes with dedicated pages
- **Product Search & Filtering** - Advanced filtering by brand, price, category
- **Product Detail Pages** - Comprehensive product views with image galleries
- **Checkout Process** - Multi-step checkout with shipping and payment forms
- **Wishlist Functionality** - Save favorite products for later

### 🎨 User Interface
- **Modern Bento Grid Layout** - Dynamic grid showcasing featured products
- **Interactive Product Carousel** - Smooth transitions and navigation
- **Theme System** - Complete dark/light mode with CSS variables
- **Skeleton Loading States** - Theme-aware loading placeholders
- **Responsive Design** - Mobile-first approach across all devices
- **Smooth Animations** - Powered by Framer Motion

### 🔧 Technical Features
- **Multiple API Integration** - FakeStore API and Makeup API
- **Type-Safe Development** - Full TypeScript implementation
- **Context Management** - React Context for cart and theme state
- **Custom Hooks** - Reusable hooks for products, search, and data fetching
- **Component Library** - Modular, reusable UI components

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with strict typing
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom theme
- **Framer Motion** - Animation library for smooth interactions

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library with consistent theming
- **Custom Components** - Skeleton loaders, product cards, navigation

### State Management & Routing
- **React Context** - Global state for cart and theme management
- **React Router** - Client-side routing with protected routes
- **Custom Hooks** - Reusable logic for API calls and state management

### APIs & Data
- **FakeStore API** - Fashion and general products
- **Makeup API** - Beauty and cosmetics products
- **Unified Product Interface** - Consistent data structure across APIs

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aora-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎨 Design System

### Theme Architecture
- **CSS Variables** - Complete theme system with light/dark mode support
- **Consistent Colors** - Semantic color tokens (background, foreground, muted, accent)
- **Typography Scale** - Harmonious font sizes and weights
- **Component Variants** - Consistent styling across all components

### Key Design Elements
- **Bento Grid Layout** - Modern asymmetric grid for featured content
- **Skeleton Loading** - Theme-aware loading states that match content structure
- **Micro Interactions** - Hover effects, transitions, and animations
- **Responsive Breakpoints** - Mobile-first design with tablet and desktop optimizations

## 📱 Pages & Features

### Core Pages
- **Home** - Hero section with featured carousel and statistics
- **Popular Products** - Bento grid layout showcasing trending items
- **Beauty/Makeup** - Dedicated beauty products with brand filtering
- **Fashion/Clothes** - Clothing and accessories with category filtering
- **Product Detail** - Comprehensive product view with image gallery
- **Checkout** - Multi-step checkout process with form validation

### Navigation & Layout
- **Responsive Header** - Theme toggle, cart, notifications, and user profile
- **Shopping Cart Drawer** - Slide-out cart with item management
- **Search Functionality** - Real-time product search across categories
- **Breadcrumb Navigation** - Clear navigation hierarchy

## 🛠️ Component Architecture

### Core Components
```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── skeleton.tsx       # Loading state components
│   │   ├── product-card.tsx   # Product display cards
│   │   ├── bento-grid.tsx     # Grid layout system
│   │   └── ...
│   ├── header/               # Navigation components
│   ├── carousel/             # Product carousel
│   └── ...
├── pages/                    # Route components
├── context/                  # React Context providers
├── hooks/                    # Custom React hooks
├── api/                      # API integration
└── lib/                      # Utilities and icons
```

### Key Features
- **Unified Product Interface** - Consistent data structure across different APIs
- **Theme-Aware Components** - All components support light/dark themes
- **Skeleton Loading System** - Realistic loading placeholders
- **Error Boundaries** - Graceful error handling throughout the app

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📊 Data Sources & APIs

### FakeStore API
- **Fashion Products** - Clothing, accessories, and general merchandise
- **Categories** - Electronics, jewelry, men's/women's clothing
- **Features** - Product ratings, descriptions, and pricing

### Makeup API
- **Beauty Products** - Cosmetics from various brands (Maybelline, CoverGirl, etc.)
- **Product Details** - Colors, types, categories, and brand information
- **High-Quality Images** - Professional product photography

### Data Integration
- **Unified Interface** - Single `UnifiedProduct` type for consistent handling
- **Error Handling** - Graceful fallbacks for API failures
- **Caching Strategy** - Efficient data fetching and state management

## 🎯 Recent Improvements

### Performance & UX
1. **Skeleton Loading System** - Replaced all hardcoded loading screens with theme-aware skeletons
2. **Theme Consistency** - Eliminated hardcoded colors throughout the application
3. **Icon System** - Centralized icon management with consistent naming
4. **Error Handling** - Fixed ReferenceError issues and improved error boundaries

### Code Quality
1. **TypeScript Strict Mode** - Enhanced type safety across all components
2. **Component Modularity** - Reusable, composable component architecture
3. **Custom Hooks** - Extracted reusable logic into custom hooks
4. **CSS Variables** - Complete migration to CSS custom properties for theming

### Accessibility
1. **Semantic HTML** - Proper heading hierarchy and landmark elements
2. **Keyboard Navigation** - Full keyboard accessibility support
3. **Screen Reader Support** - ARIA labels and descriptions
4. **Color Contrast** - WCAG compliant color combinations

## 🚀 Future Enhancements

- **User Authentication** - Login/signup functionality
- **Order History** - Track past purchases and order status
- **Product Reviews** - User-generated reviews and ratings
- **Advanced Filtering** - More sophisticated search and filter options
- **Payment Integration** - Real payment processing
- **Inventory Management** - Stock tracking and availability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for modern e-commerce experiences.