import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CreditCardIcon, TruckIcon, ShieldIcon, CheckIcon } from '@/lib/icons';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  const steps = [
    { id: 1, name: 'Shipping', icon: TruckIcon },
    { id: 2, name: 'Payment', icon: CreditCardIcon },
    { id: 3, name: 'Review', icon: CheckIcon },
  ];

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Add some items to your cart before checking out.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Order Complete!
          </h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full border border-border text-muted-foreground px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-6">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id 
                    ? 'text-accent' 
                    : 'text-muted-foreground'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id 
                      ? 'bg-accent' 
                      : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Shipping Information
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full bg-accent text-accent-foreground py-3 px-4 rounded-md hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Payment Information
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 border border-border text-muted-foreground py-3 px-4 rounded-md hover:bg-secondary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 bg-accent text-accent-foreground py-3 px-4 rounded-md hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Review Your Order
                  </h2>

                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Shipping Address</h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>

                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Payment Method</h3>
                    <p className="text-sm text-muted-foreground">
                      **** **** **** {formData.cardNumber.slice(-4)}<br />
                      {formData.nameOnCard}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 border border-border text-muted-foreground py-3 px-4 rounded-md hover:bg-secondary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 bg-accent text-accent-foreground py-3 px-4 rounded-md hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-ring transition-colors disabled:opacity-50"
                    >
                      {isProcessing ? 'Processing...' : `Place Order ($${total.toFixed(2)})`}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-lg shadow-sm p-6 h-fit border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-muted" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground text-sm">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping:</span>
                <span className="text-foreground">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax:</span>
                <span className="text-foreground">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span className="text-foreground">Total:</span>
                <span className="text-foreground">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldIcon className="w-4 h-4" />
              <span>Secure checkout with 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;