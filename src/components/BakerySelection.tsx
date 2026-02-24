import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import bagel from "@/assets/bagel.png";
import coconutDelight from "@/assets/coconut-delight.png";
import orangeCreamBun from "@/assets/orange-cream-bun.png";
import sourdough from "@/assets/sourdough.png";

const items = [
  { name: "Classic Bagel", image: bagel },
  { name: "Coconut Delight", image: coconutDelight },
  { name: "Orange Cream Bun", image: orangeCreamBun },
  { name: "Soft Sourdough", image: sourdough },
];

const BakerySelection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">
            Discover More
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Our Bakery Selection
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border cursor-pointer hover-lift"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-cover transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-foreground text-center">
                  {item.name}
                </h3>
              </div>
              {/* Hover glow border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BakerySelection;
