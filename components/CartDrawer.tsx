'use client';

import React from 'react';
import Link from 'next/link';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    cartTotal,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateCartQty,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!cartDrawerOpen) return null;

  const freeShippingThreshold = 3000;
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  return (
    <div className="drawer-backdrop" onClick={() => setCartDrawerOpen(false)}>
      <aside
        className="w-full max-w-[420px] h-full bg-white flex flex-col shadow-2xl animate-slide-left ml-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={22} className="text-[#0D8385]" />
            <h3 className="font-bold text-lg text-gray-900 font-display">
              Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setCartDrawerOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Goal Meter */}
        <div className="bg-[#e6f6f6] px-5 py-3 border-b border-[#c8ebeb]">
          {remainingForFreeShipping > 0 ? (
            <p className="text-xs font-semibold text-[#086365] mb-1.5">
              Add <span className="font-bold text-[#E54768]">₨ {remainingForFreeShipping.toLocaleString()}</span> more for <strong className="underline">FREE DELIVERY</strong> across Pakistan! 🚚
            </p>
          ) : (
            <p className="text-xs font-bold text-[#086365] mb-1.5 flex items-center gap-1">
              🎉 Congratulations! Your order qualifies for <strong>FREE DELIVERY</strong>!
            </p>
          )}
          <div className="w-full bg-white/80 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#0D8385] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        {cart.length === 0 ? (
          <div className="empty-cart-state flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-[#e6f6f6] flex items-center justify-center mb-4 text-[#0D8385]">
              <ShoppingBag size={38} />
            </div>
            <h4 className="font-bold text-gray-800 text-lg mb-1">Your bag is empty</h4>
            <p className="text-xs text-gray-500 max-w-[240px] mb-6">
              Looks like you haven&apos;t added any lovely outfits or accessories yet.
            </p>
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="start-shopping-btn"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="py-4 first:pt-0 last:pb-0 flex gap-3.5">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-lg object-cover bg-gray-50 flex-shrink-0 border border-gray-100"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <span className="inline-block text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1">
                      Size: {item.size}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="qty-counter">
                      <button
                        onClick={() => updateCartQty(item.product.id, item.size, -1)}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.product.id, item.size, 1)}
                        className="qty-btn"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <span className="font-bold text-sm text-[#E54768]">
                      ₨ {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer border-t border-gray-100 bg-[#FAFAFA] p-5">
            <div className="drawer-subtotal-row flex justify-between items-center text-base font-bold text-gray-900 mb-1">
              <span>Subtotal:</span>
              <span className="text-[#0D8385] text-lg font-extrabold">₨ {cartTotal.toLocaleString()}</span>
            </div>
            <p className="drawer-tax-notice text-[11.5px] text-gray-500 mb-4">
              Tax charges will be applicable on Cash on Delivery. Standard delivery in 2-4 working days.
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  alert(`Thank you for ordering with webnibo! Total: ₨ ${cartTotal.toLocaleString()}. Order received!`);
                  clearCart();
                  setCartDrawerOpen(false);
                }}
                className="drawer-checkout-btn flex items-center justify-center gap-2"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight size={17} />
              </button>

              <a
                href={`https://wa.me/15552345678?text=${encodeURIComponent(
                  `Hello webnibo! I would like to place an order for:\n` +
                    cart
                      .map((i) => `• ${i.product.name} (Size: ${i.size}, Qty: ${i.quantity}) - ₨ ${i.product.price * i.quantity}`)
                      .join('\n') +
                    `\nTotal: ₨ ${cartTotal.toLocaleString()}\nPlease confirm my order.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1ebc59] text-white text-xs font-bold py-2.5 rounded text-center transition-colors flex items-center justify-center gap-1.5"
              >
                Order via WhatsApp (Quick Checkout)
              </a>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
