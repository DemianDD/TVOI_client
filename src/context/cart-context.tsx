import React, { createContext, useState, ReactNode } from 'react';
import localstorageService from '../services/localstorage.service';

interface CartProviderProps {
    children: ReactNode;
}

interface CartContextProps {
    cart: { data: IProductCart[]; loadedFromStorage: boolean };
    handleClick: (item: IProductCart) => void;
    clearBasket: () => void;
    handleChange: (product: IProductCart, d:number) => void;
    removeItem: (fn: (items: IProductCart[]) => IProductCart[]) => void;
    totalProductPrice: number;
    endedSale: number;
    endedPrice: number;
    count: number;
}

export const CartContext = createContext<CartContextProps>({
    cart: { data: [], loadedFromStorage: false },
    handleClick: () => {},
    clearBasket: () => {},
    handleChange: () => {},
    removeItem: () => {},
    totalProductPrice: 0,
    endedPrice: 0,
    endedSale: 0,
    count: 0,
});

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<{data: IProductCart[], loadedFromStorage: boolean}>({data: [], loadedFromStorage: false});
    React.useEffect(() => {
        if (!cart.loadedFromStorage) {
            const localCart = localstorageService.getSaveProducts();
            setCart({ data: localCart, loadedFromStorage: true });
        }
    }, []);

    const isSalePrice = (item: IProduct) => item.salePrice > 0;

    const count = cart.data.reduce((total, c) => total + c.count, 0);
    const isMoreThanTwo = count > 2;

    const totalProductPrice = cart.data.reduce((total, item) => total + item.count * item.price, 0);
    const optimalSale = totalProductPrice * 0.05;

    const calculatePrice = (item: IProduct) => (isSalePrice(item) ? item.salePrice : item.price);

    const price = cart.data.reduce((total, item) => total + item.count * calculatePrice(item), 0);

    const totalProductSale = totalProductPrice - price;

    const endedSale = !isMoreThanTwo ? totalProductSale : totalProductSale + optimalSale;
    const endedPrice = !isMoreThanTwo ? price : price - optimalSale;

    const handleClick = (item: IProductCart) => {
        if (cart.data.some((cartItem) => cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size)) {
            setCart((prevCart) => {
                const newCart = prevCart.data.map((cartItem) =>
                    cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size
                        ? {
                            ...cartItem,
                            count: cartItem.count + 1
                        }
                        : cartItem
                    )
                localstorageService.setSaveProducts(newCart);
                return {data: newCart, loadedFromStorage: prevCart.loadedFromStorage};
            });
            return;
        }
        setCart((prevCart) => {
            const newCart = [
                ...prevCart.data,
                { ...item, count: 1 }
            ]
            localstorageService.setSaveProducts(newCart);
            return {data: newCart, loadedFromStorage: prevCart.loadedFromStorage};
        });
    };

    const clearBasket = () => {
        localstorageService.setSaveProducts([]);
        setCart({data: [], loadedFromStorage: true});
    }

    const handleChange = (product:IProductCart, d:number) => {
        setCart((cart) => {
            const newCart = cart.data.flatMap((cartItem) =>
                cartItem.id === product.id && cartItem.color === product.color && cartItem.size === product.size
                    ? cartItem.count + d < 1
                        ? []
                        : [
                            {
                                ...cartItem,
                                count: cartItem.count + d
                            }
                        ]
                : [cartItem]
            )
            localstorageService.setSaveProducts(newCart);
            return {data: newCart, loadedFromStorage: cart.loadedFromStorage};
        });
    };

    const removeItem = (fn: (items: IProductCart[]) => IProductCart[]) => {
        setCart((prevCart) => {
            const newCart = fn(prevCart.data);
            localstorageService.setSaveProducts(newCart);
            return { data: newCart, loadedFromStorage: prevCart.loadedFromStorage };
        });
    };

    return (
        <CartContext.Provider value={{ 
            cart,
            handleClick,
            clearBasket,
            handleChange,
            removeItem,
            totalProductPrice,
            endedPrice,
            endedSale,
            count,
        }}>
            {children}
        </CartContext.Provider>
    );
};