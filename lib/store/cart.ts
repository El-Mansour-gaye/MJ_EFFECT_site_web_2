import { create } from 'zustand';

// Define the types for the store's state and actions
interface CartItem {
  produit_id: string;
  quantite: number;
  nom: string;
  prix_fcfa: number;
}

interface ClientInfo {
  nom: string;
  telephone: string;
  email?: string; // Email is optional
}

type PaymentMethod = 'PayTech' | 'Presentiel' | null;

// Define the state structure
interface CartState {
  cart_content: CartItem[];
  client_info: ClientInfo;
  payment_method: PaymentMethod;
}

// Define the actions structure
interface CartActions {
  addToCart: (item: CartItem) => void;
  removeFromCart: (produit_id: string) => void;
  updateQuantity: (produit_id: string, quantite: number) => void;
  setClientInfo: (info: ClientInfo) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  clearCart: () => void;
}

// Define the initial state
const initialState: CartState = {
  cart_content: [],
  client_info: {
    nom: '',
    telephone: '',
    email: '',
  },
  payment_method: null,
};

// Create the Zustand store
export const useCartStore = create<CartState & CartActions>((set) => ({
  ...initialState,

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart_content.find(
        (cartItem) => cartItem.produit_id === item.produit_id
      );
      if (existingItem) {
        // If item exists, update its quantity
        return {
          cart_content: state.cart_content.map((cartItem) =>
            cartItem.produit_id === item.produit_id
              ? { ...cartItem, quantite: cartItem.quantite + item.quantite }
              : cartItem
          ),
        };
      } else {
        // If item doesn't exist, add it to the cart
        return { cart_content: [...state.cart_content, item] };
      }
    }),

  removeFromCart: (produit_id) =>
    set((state) => ({
      cart_content: state.cart_content.filter(
        (item) => item.produit_id !== produit_id
      ),
    })),

  updateQuantity: (produit_id, quantite) =>
    set((state) => ({
      cart_content: state.cart_content.map((item) =>
        item.produit_id === produit_id ? { ...item, quantite } : item
      ),
    })),

  setClientInfo: (info) => set({ client_info: info }),

  setPaymentMethod: (method) => set({ payment_method: method }),

  clearCart: () => set(initialState),
}));
