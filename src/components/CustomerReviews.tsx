import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sophia Laurent",
    text: "The brioche is absolutely divine — I've never tasted anything so delicate. Madhan is in a league of its own.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    text: "Every pastry is a work of art. The attention to detail and flavor combinations are truly remarkable.",
    rating: 5,
  },
  {
    name: "Amélie Dubois",
    text: "Walking into Madhan feels like entering a Parisian pâtisserie. The sourdough is perfection.",
    rating: 5,
  },
];

const CustomerReviews = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reviews" className="py-24" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Customer Reviews
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`glass-card rounded-2xl p-6 transition-all duration-500 ${
                  active === i ? "border-primary/40 glow-gold" : ""
                }`}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-secondary-foreground font-body text-sm leading-relaxed mb-4 italic">
                  "{review.text}"
                </p>
                <p className="text-primary font-display font-semibold text-sm">
                  {review.name}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  active === i ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
