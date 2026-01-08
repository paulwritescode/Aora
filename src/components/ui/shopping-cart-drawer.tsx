'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ShoppingCartDrawer() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const [promoCode, setPromoCode] = React.useState('');

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    alert(`Proceeding to checkout with ${getTotalItems()} items for $${total.toFixed(2)}`);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      alert('10% discount applied!');
    } else {
      alert('Invalid promo code');
    }
    setPromoCode('');
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({getTotalItems()} items)
          </DrawerTitle>
          <DrawerDescription>
            Review your items before checkout.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody className="max-h-[60vh] overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <DrawerClose asChild>
                <Button variant="outline">Continue Shopping</Button>
              </DrawerClose>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100"
                        }}
                      />
                    ) : (
                      <ShoppingCart className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950 mt-1"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Order Summary */}
              <div className="border-t pt-4 mt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="border-t pt-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Promo code (try: SAVE10)" 
                    className="flex-1"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={applyPromoCode}>
                    Apply
                  </Button>
                </div>
              </div>

              {/* Clear Cart */}
              <div className="border-t pt-4">
                <Button 
                  variant="outline" 
                  className="w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </DrawerBody>

        <DrawerFooter className="grid-cols-2">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </DrawerClose>
          <Button 
            className="w-full"
            disabled={items.length === 0}
            onClick={handleCheckout}
          >
            Checkout (${total.toFixed(2)})
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}