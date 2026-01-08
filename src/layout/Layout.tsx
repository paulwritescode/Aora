import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import ProjectRoutes from "@/routes/ProjectRoutes";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/CartContext";

function Layout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="aora-ui-theme">
      <CartProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Sidebar />
          <div className="ml-64">
            <Header />
            <main className="p-6">
              <ProjectRoutes />
            </main>
          </div>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}


export default Layout;
