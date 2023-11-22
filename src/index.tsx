import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/cart-context';
import { UserProvider } from './context/user-context';
import { WindowProvider } from './context/window-context';
import { FilterProvider } from './context/filter-context';
import { ProductProvider } from './context/product-context';
import { Provider } from 'react-redux';
import {NextUIProvider} from "@nextui-org/react";
import './scss/style.scss'
import store from './context/store/store';

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

createRoot(document.getElementById('root')!).render(
    <NextUIProvider>
        <Provider store={store}>
            <ProductProvider>
                <FilterProvider>
                    <WindowProvider>
                        <UserProvider>
                            <CartProvider>
                                <App />
                            </CartProvider>
                        </UserProvider>
                    </WindowProvider>
                </FilterProvider>
            </ProductProvider> 
        </Provider> 
    </NextUIProvider>
);
