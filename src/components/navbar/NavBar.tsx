import { navlinks } from "@/links/Links";
import Logo from "@/links/Logo";
import { ModeToggle } from "../mode-toggle";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ShoppingCartDrawer from "@/components/ui/shopping-cart-drawer";

function NavBar() {
  const location = useLocation();

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 flex items-center justify-between p-4 backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border-b border-gray-200/20 dark:border-neutral-800/20"
    >
      <Link to="/">
        <Logo size={80} />
      </Link>
      
      <nav className="hidden md:flex items-center space-x-8">
        {navlinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={`relative text-sm font-medium transition-colors hover:text-pink-600 dark:hover:text-pink-400 ${
              location.pathname === link.href
                ? "text-pink-600 dark:text-pink-400"
                : "text-gray-700 dark:text-neutral-300"
            }`}
          >
            {link.name}
            {location.pathname === link.href && (
              <motion.div
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-600 dark:bg-pink-400"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </nav>
      
      <div className="flex items-center gap-4">
        <ShoppingCartDrawer />
        <ModeToggle />
      </div>
    </motion.div>
  );
}

export default NavBar;
