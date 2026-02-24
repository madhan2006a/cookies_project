import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="relative pt-16 pb-8">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="font-display text-2xl font-bold text-gradient-gold mb-4">
              Madhan
            </h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              Premium artisan bakery crafting luxury baked goods with passion
              and tradition.
            </p>
          </div>

          <div>
            <h4 className="font-display text-foreground font-semibold mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {["Home", "Menu", "About", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-muted-foreground font-body text-sm hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-foreground font-semibold mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-2 text-muted-foreground font-body text-sm">
              <span>madhanprivate2006@gmail.com</span>
              <span>+91 7695967955</span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-foreground font-semibold mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-muted-foreground font-body text-xs">
            © 2024 Madhan Bakery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
