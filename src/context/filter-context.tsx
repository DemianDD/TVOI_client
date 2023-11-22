import React, { createContext, ReactNode, SetStateAction } from 'react';

interface FilterProviderProps {
  children: ReactNode;
}

interface FilterContextProps {
  sortByPriceAscending: (sortedProducts: IProduct[]) => IProduct[];
  sortByPriceDescending: (sortedProducts: IProduct[]) => IProduct[];
  sortByPopularity: (sortedProducts: IProduct[]) => IProduct[];
  sortByRandom: (sortedProducts: IProduct[]) => IProduct[];
}

export const FilterContext = createContext<FilterContextProps>({
  sortByPriceAscending: () => [],
  sortByPriceDescending: () => [],
  sortByPopularity: () => [],
  sortByRandom: () => [],
});

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const sortByPriceAscending = (sortedProducts: IProduct[]): IProduct[] => {
        return [...sortedProducts].sort((a, b) => {
            if (a.salePrice > 0 && b.salePrice > 0) {
                return a.salePrice - b.salePrice;
            } else if (a.salePrice > 0) {
                return a.salePrice - b.price;
            } else if (b.salePrice > 0) {
                return a.price - b.salePrice;
            } else {
                return a.price - b.price;
            }
        });
    };
      
    const sortByPriceDescending = (sortedProducts: IProduct[]): IProduct[] => {
        return [...sortedProducts].sort((a, b) => {
            if (a.salePrice > 0 && b.salePrice > 0) {
                return b.salePrice - a.salePrice;
            } else if (a.salePrice > 0) {
                return b.price - a.salePrice;
            } else if (b.salePrice > 0) {
                return b.salePrice - a.price;
            } else {
                return b.price - a.price;
            }
        });
    };

    const sortByPopularity = (sortedProducts: IProduct[]): IProduct[] => {
        return [...sortedProducts].sort((a, b) => a.popularity - b.popularity);
    };

    const sortByRandom = (sortedProducts: IProduct[]): IProduct[] => {
        const shuffledProducts = [...sortedProducts];
        
        for (let i = shuffledProducts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]];
        }
    
        return shuffledProducts;
    };

  return (
    <FilterContext.Provider
      value={{
        sortByPriceAscending,
        sortByPriceDescending,
        sortByPopularity,
        sortByRandom,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};