import React, { createContext, ReactNode } from 'react';
import { fetchAllData } from '../data/fetch_data';
import { ALL_DATA } from '../data/all_data';
import { ALL } from 'dns';
import { debounce } from 'lodash';
import axios from 'axios';

interface ProductProviderProps {
    children: ReactNode;
}

interface ProductContextProps {
    products: IProduct[];
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
    search: (query: string) => void;
    resetSearch: () => void;
    searchedProducts: IProduct[];
    setSearchedProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    productFields: IEditProduct;
    handleInputChange: (propertyName: string, value: string | number | any[]) => void,
    updateProduct: (productId: string, newProductData: IEditProduct) => void,
    postProduct: () => void;
    deleteAllProducts: () => void;
}

export const ProductContext = createContext<ProductContextProps>({
    products: [],
    setProducts: () => {},
    search: () => {},
    resetSearch: () => {},
    searchedProducts: [],
    setSearchedProducts: () => {},
    inputValue: '',
    setInputValue: () => {},
    productFields: {
        count: 0,
        labelName: '',
        brand: '',
        metal: '',
        description: 'Базова прикраса, яка найкраще підійде на будь-який день',
        packaging: 'Коробочка для прикраси та фірмовий пакетик TVOI',
        price: 0,
        salePrice: 0,
        popularity: 5,
        customPopularity: 5,
        images: [""],
        colors: [""],
        sizes: [""],
        realPhotos: [""],
        collection: '',
        category: '',
        weight: 0
    },
    handleInputChange: () => {},
    updateProduct: () => {},
    postProduct: () => {},
    deleteAllProducts: () => {},
});

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [products, setProducts] = React.useState<IProduct[]>([]);
    const [triggerReload, setTriggerReload] = React.useState(false);
    const [searchedProducts, setSearchedProducts] = React.useState<IProduct[]>([]);
    const [inputValue, setInputValue] = React.useState('');
    const [productFields, setProductFields] = React.useState<IEditProduct>({
        count: 0,
        labelName: '',
        brand: '',
        metal: '',
        description: 'Базова прикраса, яка найкраще підійде на будь-який день',
        packaging: 'Коробочка для прикраси та фірмовий пакетик TVOI',
        price: 0,
        salePrice: 0,
        popularity: 5,
        customPopularity: 5,
        images: [""],
        colors: [""],
        sizes: [""],
        realPhotos: [""],
        collection: '',
        category: '',
        weight: 0
    });


    const handleInputChange = (propertyName: string, value: string | number | any[]) => {
        setProductFields({
            ...productFields,
            [propertyName]: value,
        });
    };

    const updateProduct = (productId: string, newProductData: IEditProduct) => {
        const updatedProducts = ALL_DATA.map((product) => {
          if (product.id === productId) {
            return { ...product, ...newProductData };
          }
          return product;
        });
        //setProducts(updatedProducts);
      
        const updatedOriginalData = ALL_DATA.map((product) => {
          if (product.id === productId) {
            return { ...product, ...newProductData };
          }
          return product;
        });
      
        localStorage.setItem('products', JSON.stringify(updatedOriginalData));
    };

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:10000/api/getAllProducts');
            const sortedData = response.data.sort((a, b) => {
                if (a.labelName && b.labelName) {
                    return a.labelName.localeCompare(b.labelName);
                }
                return 0;
            })
            setProducts(sortedData);
            setSearchedProducts(sortedData);
        } catch (error) {
            console.error('Error fetching products:', error);
            const sortedData = ALL_DATA.sort((a, b) => {
                if (a.labelName && b.labelName) {
                    return a.labelName.localeCompare(b.labelName);
                }
                return 0;
            });
            setProducts(sortedData);
            setSearchedProducts(sortedData);
        }
    }

    const postProduct = () => {
        axios.post('http://localhost:10000/api/postProduct', productFields)
        .then(response => {
            console.log(response.data);
            setTriggerReload(!triggerReload);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const deleteProduct = (id: number) => {
        axios.delete(`http://localhost:10000/api/deleteProduct/${id}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const deleteAllProducts = () => {
        axios.delete(`http://localhost:10000/api/deleteAllProducts`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    React.useEffect(() => {
        getProducts();     
    }, [triggerReload]);

    const search = React.useCallback(
        debounce((query) => {
            const filteredProducts = products.filter((product) => {
                return product.labelName?.toLowerCase().includes(query.toLowerCase());
            });
            setSearchedProducts(filteredProducts);
        }, 1000),
        [searchedProducts, setInputValue, setProducts]
    );

    const resetSearch = () => {
        setSearchedProducts(searchedProducts);
        setInputValue('');
    };

    return (
        <ProductContext.Provider value={{ 
            products,
            setProducts,
            search,
            resetSearch,
            searchedProducts,
            setSearchedProducts,
            inputValue,
            setInputValue,
            productFields,
            handleInputChange,
            updateProduct,
            postProduct,
            deleteAllProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
};