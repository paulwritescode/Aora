import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  Package, 
  User, 
  LogOut,
  Star,
  Plus,
  ShoppingBag,
  Grid3X3
} from "lucide-react";
import Logo from "@/links/Logo";

const sidebarItems = [
  { name: "Popular Products", icon: Star, href: "/" },
  { name: "FakeStore API", icon: ShoppingBag, href: "/fakestore" },
  { name: "Bento Grid", icon: Grid3X3, href: "/bento" },
  { name: "Cart Demo", icon: Package, href: "/cart-demo" },
  { name: "Explore New", icon: Plus, href: "/explore" },
  { name: "Clothing and Shoes", icon: Package, href: "/clothing" },
  { name: "Gifts and Living", icon: Home, href: "/gifts" },
  { name: "Inspiration", icon: Star, href: "/inspiration" },
];

const quickActions = [
  { name: "Request for product", icon: Plus },
  { name: "Add member", icon: User },
];

function Sidebar() {
  const location = useLocation();

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 z-40 flex flex-col"
    >
      {/* Logo and Brand */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Logo size={40} />
          <div>
            <h1 className="text-xl font-bold text-black dark:text-white">BuyMore</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-black dark:text-white">37</span>
              <span>Orders</span>
            </div>
            <div className="text-xs text-gray-500">Last 7 days</div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Quick actions
          </h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <button
                key={action.name}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left transition-colors"
              >
                <action.icon className="w-4 h-4" />
                {action.name}
              </button>
            ))}
          </div>
        </div>

        {/* Last Orders */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Last orders 37
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-black dark:text-white">DNC New...</div>
                <div className="text-gray-500 text-xs">View order</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-black dark:text-white">Outerwear...</div>
                <div className="text-gray-500 text-xs">View order</div>
              </div>
            </div>
          </div>
          <button className="text-sm text-gray-500 dark:text-gray-400 mt-3 hover:text-black dark:hover:text-white">
            See all
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left transition-colors">
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>
    </motion.div>
  );
}

export default Sidebar;