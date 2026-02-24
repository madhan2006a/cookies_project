import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import brioche from "@/assets/brioche.png";
import honeyDonut from "@/assets/honey-donut.png";
import cinnamonDonut from "@/assets/cinnamon-donut.png";
import { useCart } from "@/context/CartContext";

const products = [
  {
    id: "brioche",
    name: "Fresh Brioche",
    description: "Buttery, pillowy-soft French classic",
    price: "$6.50",
    image: brioche,
  },
  {
    id: "honey-donut",
    name: "Honey Glazed Donut",
    description: "Drizzled with pure wildflower honey",
    price: "$4.50",
    image: honeyDonut,
  },
  {
    id: "cinnamon-donut",
    name: "Cinnamon Sugar Donut",
    description: "Warm spice with a golden crunch",
    price: "$4.00",
    image: cinnamonDonut,
  },
];

const FeaturedProducts = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [addedMessage, setAddedMessage] = useState<string>("");

  const handleAddToCart = (product: typeof products[0]) => {
    const quantity = quantities[product.id] || 1;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    });
    setAddedMessage(`${product.name} added to cart!`);
    setQuantities({ ...quantities, [product.id]: 1 });
    setTimeout(() => setAddedMessage(""), 3000);
  };

  return (
    <section id="menu" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">
            Our Specialties
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Refined Favorites
          </h2>
        </motion.div>

        {addedMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-8 px-4 py-2 rounded-lg bg-primary/20 text-primary font-semibold"
          >
            {addedMessage}
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group bg-card rounded-2xl p-6 border border-border hover-lift hover-glow"
            >
              <div className="overflow-hidden rounded-xl mb-5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                {product.name}
              </h3>
              <p className="text-muted-foreground font-body text-sm mb-4">
                {product.description}
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-primary font-display text-xl font-bold">
                    {product.price}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 flex-1 bg-accent/50 rounded-lg p-1">
                    <button
                      onClick={() =>
                        setQuantities({
                          ...quantities,
                          [product.id]: Math.max(1, (quantities[product.id] || 1) - 1),
                        })
                      }
                      className="px-2 py-1 hover:bg-accent rounded text-foreground"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center font-semibold">
                      {quantities[product.id] || 1}
                    </span>
                    <button
                      onClick={() =>
                        setQuantities({
                          ...quantities,
                          [product.id]: (quantities[product.id] || 1) + 1,
                        })
                      }
                      className="px-2 py-1 hover:bg-accent rounded text-foreground"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-gradient-gold text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold font-body flex items-center gap-2 hover-glow transition-all duration-300 hover:scale-105"
                  >
                    <ShoppingCart size={14} />
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
