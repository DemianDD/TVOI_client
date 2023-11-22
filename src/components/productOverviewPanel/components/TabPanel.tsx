import * as React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ProductDelivery } from './ProductDelivery';
import { ProductGaranty } from './ProductGaranty';
import { useParams } from 'react-router-dom';
import { defaultProduct } from '../../../data/defaults';
import { ProductDescription } from './ProductDescription';
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';

interface IProps {
    products: IProduct[];
}

const TabPanel = (props: IProps) => {
    const [productsDesc, setProductsDesc] = React.useState<IProduct[]>([]);
    const [productItemDesc, setProductItemDesc] = React.useState<IProduct>(defaultProduct);
    const [selected, setSelected] = React.useState("Details");
    let {id} = useParams<any>();

    const prodDesc = props.products.find(e => e.id === id) ?? defaultProduct;
    React.useEffect(() => {
        const desc = props.products.filter(e => e.id === id) ?? defaultProduct;
        setProductItemDesc(prodDesc);
        setProductsDesc(desc);
    }, [id, prodDesc]);

    const tabs = [
        {
            title: 'Деталі',
            key: 'Details',
            icon: <SettingsIcon/>,
            body: <ProductDescription products={productsDesc}/>
        }, {
            title: 'Доставка',
            key: 'Shipping',
            icon: <LocalShippingIcon/>,
            body: <ProductDelivery/>
        }, {
            title: 'Гарантія',
            key: 'Warranty',
            icon: <DoneAllIcon/>,
            body: <ProductGaranty/>
        },
    ]
    return (
        <div className="flex w-full flex-col">
            <Tabs
                className='!p-0'
                variant='solid'
                aria-label="Options"         
                selectedKey={selected}
                onSelectionChange={(key: any) => setSelected(key)}
            >
                {tabs.map((tab) => {
                    return(
                        <Tab key={tab.key}  
                            title={
                            <div className='flex items-center text-[#7b7b7b] text-sm border-2 border-black rounded-xl py-0.5 px-2'>
                                {tab.icon}
                                <span>{tab.title}</span>
                            </div>
                        }>
                            <Card>
                                <CardBody>
                                    {tab.body}
                                </CardBody>
                            </Card>  
                        </Tab>
                    )
                })}
            </Tabs>
        </div>

    );
};

export default TabPanel;