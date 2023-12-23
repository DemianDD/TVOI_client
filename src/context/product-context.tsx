import React, { createContext, ReactNode } from 'react';
import { fetchAllData } from '../data/fetch_data';
import { ALL_DATA } from '../data/all_data';
import { ALL } from 'dns';
import { debounce } from 'lodash';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

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
    category: string;
    handleInputChange: (propertyName: string, value: string | number | any[]) => void,
    handleSelectChange: (event: SelectChangeEvent) => void;
    postProduct: () => void;
    deleteAllProducts: () => void;
    deleteProduct: (id: number) => void;
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
        weight: 0
    },
    category: '',
    handleSelectChange: () => {},
    handleInputChange: () => {},
    postProduct: () => {},
    deleteAllProducts: () => {},
    deleteProduct: () => {},
});

const categoryLabelMap = {
    "bracelets": { label: "bracelet_name|A", sizes: [16, 17, 18] },
    "necklaces": { label: "necklace_name|A", sizes: ['40-45cm'] },
    "earrings": { label: "earring_name|A", sizes: ['єдиний розмір'] },
    "rings": { label: "ring_name|A", sizes: [54, 56, 58] },
    "charms": { label: "charm_name|A", sizes: ['єдиний розмір'] },
    "watches": { label: "watch_name|A", sizes: ['єдиний розмір'] },
    "accessories": { label: "accesorrie_name|A", sizes: ['єдиний розмір'] },
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [products, setProducts] = React.useState<IProduct[]>([]);
    const [triggerReload, setTriggerReload] = React.useState(false);
    const [searchedProducts, setSearchedProducts] = React.useState<IProduct[]>([]);
    const [inputValue, setInputValue] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [productFields, setProductFields] = React.useState<IEditProduct>({
        count: 0,
        labelName: '',
        brand: '',
        metal: 'silver925|A',
        description: 'basic_desc|A',
        packaging: 'basic_packaging|A',
        price: 0,
        salePrice: 0,
        popularity: 5,
        customPopularity: 5,
        images: [""],
        colors: ["silver|A", "gold|A", "rosegold|A"],
        sizes: [""],
        realPhotos: [""],
        collection: '',
        weight: 0
    });


    const handleInputChange = (propertyName: string, value: string | number | any[]) => {
        setProductFields({
            ...productFields,
            [propertyName]: value,
        });
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
    
        const categoryData = categoryLabelMap[selectedCategory];
        const newLabelName = categoryData ? categoryData.label : '';
        const newSizes = categoryData ? categoryData.sizes : ['']; // Default to an empty array if no category is found
    
        setProductFields(prevFields => ({
            ...prevFields,
            labelName: newLabelName,
            sizes: newSizes,
        }));
    };

    const getProducts = async () => {
        try {
            //dont forget to remove "s" and the end
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
        const productData = {
            ...productFields,
            category: category
        };

        axios.post('http://localhost:10000/api/postProduct', productData)
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
            setTriggerReload(!triggerReload);
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
            category,
            handleSelectChange,
            handleInputChange,
            postProduct,
            deleteAllProducts,
            deleteProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
};