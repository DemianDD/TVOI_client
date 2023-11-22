export const createCollection = (products: IProduct[], brand?: string, metal?: string): IProduct[] => {
    return [...products].filter((p) => {
        return p.metal === metal || p.brand === brand;
    }).sort(() => Math.random() - 0.5);
};
