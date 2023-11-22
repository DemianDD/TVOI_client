import React, { createContext, ReactNode } from 'react';

interface WindowProviderProps {
    children: ReactNode;
}

interface WindowContextProps {
    paymentWindow: boolean;
    setPaymentWindow: React.Dispatch<React.SetStateAction<boolean>>;
    billWindow: boolean;
    setBillWindow: React.Dispatch<React.SetStateAction<boolean>>;
    photoWindow: boolean;
    setPhotoWindow: React.Dispatch<React.SetStateAction<boolean>>;
    showSearchInHeader: boolean;
    headerRef: React.LegacyRef<HTMLElement> | undefined;
    mainContentRef: React.LegacyRef<HTMLElement> | undefined;
}

export const WindowContext = createContext<WindowContextProps>({
    paymentWindow: false,
    setPaymentWindow: () => {},
    billWindow: false,
    setBillWindow: () => {},
    photoWindow: false,
    setPhotoWindow: () => {},
    showSearchInHeader: false,
    headerRef: { current: null },
    mainContentRef: { current: null }
});

export const WindowProvider: React.FC<WindowProviderProps> = ({ children }) => {
    const [paymentWindow, setPaymentWindow] = React.useState(false);
    const [billWindow, setBillWindow] = React.useState(false);
    const [photoWindow, setPhotoWindow] = React.useState(false);

    const [showSearchInHeader, setShowSearchInHeader] = React.useState(false);

    const headerRef = React.useRef<HTMLDivElement>(null);
    const mainContentRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
        window.onscroll = () => {
            const headerTop = headerRef.current ? headerRef?.current?.getBoundingClientRect().top : 0;
            const mainContentTop = mainContentRef.current
                ? mainContentRef.current.getBoundingClientRect().top
                : 0;

            setShowSearchInHeader(mainContentTop - headerTop > 0);
        };
    }, []);

    return (
        <WindowContext.Provider value={{ 
            paymentWindow,
            setPaymentWindow,
            billWindow,
            setBillWindow,
            photoWindow,
            setPhotoWindow,
            showSearchInHeader,
            headerRef,
            mainContentRef
        }}>
            {children}
        </WindowContext.Provider>
    );
};