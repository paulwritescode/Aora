import { motion } from "framer-motion";
import { BellIcon, UserIcon } from "@/lib/icons";
import { ModeToggle } from "../mode-toggle";
import ShoppingCartDrawer from "@/components/ui/shopping-cart-drawer";

function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-30 bg-background px-6 py-4"
    >
      <div className="flex items-center justify-end">
        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Drawer */}
          <ShoppingCartDrawer />

          {/* Notifications */}
          <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
            <BellIcon className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <UserIcon className="w-4 h-4" />
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