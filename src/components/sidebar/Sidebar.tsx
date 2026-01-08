import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Star,
  Search,
  ShoppingBag,
  Sparkles,
  Shirt
} from "lucide-react";
import Logo from "@/links/Logo";

const sidebarItems = [
  { name: "Popular Products", icon: Star, href: "/" },
  { name: "Fashion & Clothing", icon: Shirt, href: "/clothes" },
  { name: "Beauty & Makeup", icon: Sparkles, href: "/makeup" },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to a search results page or filter current page
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleViewAllProducts = () => {
    navigate('/');
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border z-40 flex flex-col"
    >
      {/* Logo and Brand */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Logo size={100} />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4">
        {/* Search */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 pl-10 text-sm border border-input rounded-lg bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          </form>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href === "/" && location.pathname === "/popular");
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quick actions
          </h3>
          <div className="space-y-2">
            <button
              onClick={handleViewAllProducts}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary w-full text-left transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              View All Products
            </button>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Featured Categories
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">Beauty Products</div>
                <div className="text-muted-foreground text-xs">Makeup & Skincare</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Shirt className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">Fashion</div>
                <div className="text-muted-foreground text-xs">Clothing & Accessories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Discover amazing products
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;