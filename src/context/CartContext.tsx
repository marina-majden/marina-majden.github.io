import React, { createContext, useContext, useState, useEffect } from "react";
import { TemplateItem } from "@/data/data";

export interface CartItem {
    product: TemplateItem;
    price: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: TemplateItem) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    cartTotal: number;
    isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper function to map a static price based on template ID
export const getTemplatePrice = (id: string): number => {
    const prices: Record<string, number> = {
        zen: 499,
        oasis: 399,
        rhythm: 449,
        sillage: 599,
        skysalon: 549,
        polar: 499,
        book: 349,
        neonvinyl: 479,
        tektonika: 649,
        mondrianesque: 429,
        bauhausic: 449,
    };
    return prices[id] || 399;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                const saved = window.localStorage.getItem("cart");
                return saved ? JSON.parse(saved) : [];
            }
        } catch {
            // fallback if storage disabled or unavailable
        }
        return [];
    });

    useEffect(() => {
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                window.localStorage.setItem("cart", JSON.stringify(cart));
            }
        } catch {
            // ignore write error
        }
    }, [cart]);

    const addToCart = (product: TemplateItem) => {
        if (cart.some((item) => item.product.id === product.id)) return;
        const price = getTemplatePrice(product.id);
        setCart((prev) => [...prev, { product, price }]);
    };

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => total + item.price, 0);

    const isInCart = (productId: string) =>
        cart.some((item) => item.product.id === productId);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                cartTotal,
                isInCart,
            }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
