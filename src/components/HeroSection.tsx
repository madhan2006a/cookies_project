import { motion } from "framer-motion";
import heroBread from "@/assets/hero-bread.png";
import { Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface HeroSectionProps {
  onOrderClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOrderClick }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Golden glow behind image */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">
              Celebrate Soft Love
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
          >
            <span className="text-foreground">FREE</span>
            <br />
            <span className="text-gradient-gold">LUXURY</span>
            <br />
            <span className="text-foreground">BAKERY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground font-body text-lg max-w-md mb-8 leading-relaxed"
          >
            Handcrafted breads and premium baked goods, made with the finest
            ingredients and centuries-old techniques.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 flex-wrap"
          >
            <button 
              onClick={onOrderClick}
              className="bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-full font-semibold font-body hover-glow transition-all duration-300 hover:scale-105">
              Order Now
            </button>
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-primary/40 text-primary px-8 py-3.5 rounded-full font-semibold font-body hover:border-primary hover:bg-primary/5 transition-all duration-300">
              Explore Menu
            </button>
          </motion.div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="relative flex justify-center z-10"
        >
          <div className="relative">
            <motion.img
              src={heroBread}
              alt="Premium artisan bread"
              className="w-[350px] md:w-[450px] lg:w-[500px] rounded-full glow-gold"
              animate={{ scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating crumbs */}
            {[
              { top: "10%", left: "5%", delay: 0 },
              { top: "70%", left: "90%", delay: 2 },
              { top: "20%", left: "85%", delay: 4 },
              { top: "80%", left: "10%", delay: 1 },
            ].map((crumb, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/60"
                style={{ top: crumb.top, left: crumb.left }}
                animate={{ y: [-10, 10, -10], rotate: [0, 360] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: crumb.delay,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Decorative stars */}
            {[
              { top: "5%", right: "15%", size: 12 },
              { top: "60%", right: "5%", size: 8 },
              { bottom: "15%", left: "0%", size: 10 },
            ].map((star, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute text-primary"
                style={{ ...star }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
              >
                <Sparkles size={star.size} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
