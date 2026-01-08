import { motion } from "framer-motion";
import { Bell, User } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import ShoppingCartDrawer from "@/components/ui/shopping-cart-drawer";

function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-30 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left side - Navigation tabs */}
        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <button className="text-sm font-medium text-black dark:text-white">Dashboard</button>
            <button className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
              Website
            </button>
          </nav>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Drawer */}
          <ShoppingCartDrawer />

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Ryana</span>
            </div>
          </div>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </motion.header>
  );
}

export default Header;