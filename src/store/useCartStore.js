import { create } from 'zustand';
import { storage } from '../utils/storage';

export const useCartStore = create((set, get) => ({
  cart: storage.getString("cart") ? JSON.parse(storage.getString("cart")) : [],
  coupon: null,

  persist: () => {
    storage.set("cart", JSON.stringify(get().cart));
    if (get().coupon) storage.set("coupon", get().coupon);
  },

  addToCart: (product, qty = 1) => {
      console.log("addToCart called");

    const cart = get().cart;
    const exists = cart.find((item) => item.productId === product.productId);

    let updatedCart;
    if (exists) {
      updatedCart = cart.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: qty }];
    }
      console.log("updatedCart",updatedCart);

    set({ cart: updatedCart });
    storage.set("cart", JSON.stringify(updatedCart));
  },

  updateQuantity: (productId, qty) => {
    let updatedCart = get().cart.map((item) =>
      item.productId === productId ? { ...item, quantity: qty } : item
    );

    updatedCart = updatedCart.filter((item) => item.quantity > 0);

    set({ cart: updatedCart });
    storage.set("cart", JSON.stringify(updatedCart));
  },

  removeFromCart: (productId) => {
      console.log("removeFromCart called",productId);

    const updatedCart = get().cart.filter((item) => item.productId !== productId);
      console.log("updatedCart",updatedCart);

    set({ cart: updatedCart });
    storage.set("cart", JSON.stringify(updatedCart));
  },

  clearCart: () => {
    set({ cart: [] });
    storage.set("cart", JSON.stringify([]));
  },

  applyCoupon: (code) => {
    const validCodes = {
      SAVE10: 10,
      SAVE20: 20,
    };

    if (validCodes[code]) {
      set({ coupon: { code, discountPercent: validCodes[code] } });
      storage.set("coupon", JSON.stringify({ code, discountPercent: validCodes[code] }));
      return { success: true, discount: validCodes[code] };
    }
    return { success: false };
  },

  removeCoupon: () => {
    set({ coupon: null });
    storage.delete("coupon");
  },

  subtotal: () => {
    return get()
      .cart
      .reduce((sum, item) => sum + item.price.value * item.quantity, 0);
  },

  discountAmount: () => {
    const coupon = get().coupon;
    if (!coupon) return 0;

    const percent = coupon.discountPercent;
    return (get().subtotal() * percent) / 100;
  },

  taxAmount: () => {
    const TAX_RATE = 0.18; // 18%
    return get().subtotal() * TAX_RATE;
  },

  total: () => {
    return (
      get().subtotal() -
      get().discountAmount() +
      get().taxAmount()
    );
  },
}));
