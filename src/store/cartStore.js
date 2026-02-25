import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addItem: (dish, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === dish.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === dish.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    }
                    return {
                        items: [...state.items, { ...dish, quantity }],
                    };
                });
            },

            removeItem: (dishId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== dishId),
                }));
            },

            updateQuantity: (dishId, quantity) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === dishId ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            getCartTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'gismat-cart', // name of the item in the storage (must be unique)
        }
    )
);
