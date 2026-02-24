import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, Send } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface OrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDialog: React.FC<OrderDialogProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = async () => {
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    // Generate order message
    const orderItems = cart
      .map((item) => `• ${item.name} x${item.quantity} - $${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}`)
      .join('%0A');

    const totalPrice = getTotalPrice().toFixed(2);

    const message = `Hello 👋 I would like to place an order!

*Customer Details:*
Name: ${customerName}
Phone: ${customerPhone}
Address: ${customerAddress}

*Order Items:*
${orderItems}

*Total: $${totalPrice}*

Please confirm my order. Thank you!`;

    // Your WhatsApp number (replace with actual)
    const whatsappNumber = '917695967955'; // Madhan's number
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappLink, '_blank');

    // Clear cart and close dialog
    clearCart();
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative glass-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background/80 backdrop-blur">
              <h2 className="font-display text-2xl font-bold text-foreground">Your Order</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-accent rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Cart Items */}
              {cart.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-semibold text-foreground">Items</h3>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        className="flex items-center gap-4 p-3 rounded-lg bg-accent/50"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-background rounded transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-background rounded transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-semibold text-primary w-20 text-right">
                          ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-red-500/20 rounded transition-colors text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-foreground">Total:</span>
                      <span className="text-2xl font-bold text-primary">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              )}

              {/* Customer Details Form */}
              {cart.length > 0 && (
                <div className="space-y-4 border-t border-border pt-6">
                  <h3 className="font-display text-lg font-semibold text-foreground">Delivery Details</h3>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Delivery Address *
                    </label>
                    <textarea
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Enter your delivery address"
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="sticky bottom-0 flex gap-3 p-6 border-t border-border bg-background/80 backdrop-blur">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-accent transition-colors font-semibold"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover-glow transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  <Send size={18} />
                  Send to WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderDialog;
