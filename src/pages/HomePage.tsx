import Carousel from "@/components/carousel/Carousel";
import BentoGridDemo from "@/components/ui/bento-grid-demo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Featured Products Carousel */}
      <section className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
            Featured Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Handpicked favorites from our collection
          </p>
        </motion.div>
        
        <Carousel />
      </section>

      {/* Bento Grid Section */}
      <BentoGridDemo />

      {/* Bold Fashion Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 text-center"
      >
        <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
          Bring Bold Fashion
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Layers on Layers
        </p>
        <Button asChild className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
          <Link to="/products">
            Explore Collection
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

export default HomePage;
