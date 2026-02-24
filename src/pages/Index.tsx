import { useState } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import BakerySelection from "@/components/BakerySelection";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import OrderDialog from "@/components/OrderDialog";
import { useCart } from "@/context/CartContext";

const Index = () => {
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <FloatingParticles />
      <Navbar onOrderClick={() => setIsOrderDialogOpen(true)} />
      <main>
        <HeroSection onOrderClick={() => setIsOrderDialogOpen(true)} />
        <FeaturedProducts />
        <BakerySelection />
        <CustomerReviews />
      </main>
      <Footer />
      
      <OrderDialog isOpen={isOrderDialogOpen} onClose={() => setIsOrderDialogOpen(false)} />
    </div>
  );
};

export default Index;
