import { navlinks } from "@/links/Links"; // Assuming this contains { name, href }
import Logo from "@/links/Logo";
import { ModeToggle } from "../mode-toggle";

function NavBar() {
  return (
    <div className="sticky top-0 flex items-center justify-between p-4 backdrop-blur-sm bg-white/30 dark:bg-neutral-950/70">
      <Logo size={80} />
      <nav className="flex items-center space-x-4">
        {navlinks.map((link) => (
          <div
            key={link.name}
            // to={link.href}
            className="text-dark hover:text-black dark:text-neutral-50 dark:hover:text-neutral-50"
          >
            {link.name}
          </div>
        ))}
      </nav>
      <ModeToggle />
    </div>
  );
}

export default NavBar;
