import Carousel from "@/components/carousel/Carousel";
import BentoGridDemo from "@/components/ui/bento-grid-demo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Shirt, Star } from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 mb-12"
      >
        <h1 className="text-5xl font-bold text-foreground mb-4">
          Welcome to BuyMore
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover the perfect blend of fashion and beauty. From trendy clothing to premium makeup, find everything you need to express your style.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/popular">
              <Star className="w-4 h-4 mr-2" />
              Popular Products
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/clothes">
              <Shirt className="w-4 h-4 mr-2" />
              Fashion
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/makeup">
              <Sparkles className="w-4 h-4 mr-2" />
              Beauty
            </Link>
          </Button>
        </div>
      </motion.section>

      {/* Featured Products Carousel */}
      <section className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Featured Products
          </h2>
          <p className="text-muted-foreground">
            Handpicked favorites from our collection
          </p>
        </motion.div>
        
        <Carousel />
      </section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/popular" className="group">
            <div className="bg-gradient-to-br from-accent/20 to-accent/30 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105 border border-border">
              <Star className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold text-foreground mb-2">Popular</h3>
              <p className="text-muted-foreground">Most loved items</p>
            </div>
          </Link>
          
          <Link to="/clothes" className="group">
            <div className="bg-gradient-to-br from-secondary to-muted rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105 border border-border">
              <Shirt className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold text-foreground mb-2">Fashion</h3>
              <p className="text-muted-foreground">Trendy clothing & accessories</p>
            </div>
          </Link>
          
          <Link to="/makeup" className="group">
            <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105 border border-border">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold text-foreground mb-2">Beauty</h3>
              <p className="text-muted-foreground">Premium makeup & cosmetics</p>
            </div>
          </Link>
        </div>
      </motion.section>

      {/* Bento Grid Section */}
      <BentoGridDemo />

      {/* Bold Fashion Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-primary rounded-2xl p-12 text-center mt-12"
      >
        <h2 className="text-4xl font-bold text-primary-foreground mb-4">
          Express Your Style
        </h2>
        <p className="text-primary-foreground/80 mb-8 text-lg">
          From fashion-forward clothing to premium beauty products
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="secondary">
            <Link to="/popular">
              Shop Popular
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <Link to="/clothes">
              Browse Fashion
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default HomePage;
