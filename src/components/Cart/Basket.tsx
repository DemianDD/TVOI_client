import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import {ReactComponent as DeleteIcon} from '../../images/delete.svg';
import { ImageBehaviour, Images } from '../productsView/productsComponent/Images';
import useWindowSize from '../../hooks/UseWindowSize';
import { Helmet } from 'react-helmet';
import { getRoute } from '../../services/routes.service';
import { CartContext } from '../../context/cart-context';
import { Price } from '../productsView/productsComponent/Price';
import MobileView from './view/MobileView';
import DesktopView from './view/DesktopView';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton/Skeleton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import toastrService from '../../services/toastr.service';
import { translateText } from '../../services/translation.service';

export const GetSale = () => {
    const { count } = useContext(CartContext);
    var getSale = 3;
    return(
        <>
            <div className='mx-3 md:!mx-0  px-3 py-4 bg-[#f2f2f2] rounded-xl lg:mb-2 text-center gilroy'>
                {count <= 2 ? <span className='text-orange-300 2xl:text-2xl lg:text-lg text-base'>
                    {translateText("add|A")} {getSale - count} {translateText("more products to|A")}!
                </span> : 
                <span className='text-[#31ba7f] 2xl:text-2xl lg:text-xl text-lg'>
                    {translateText("discount received|A")} <CheckCircleIcon fontSize='large'/>
                </span>}
            </div>
        </>
    )
}

export const SkeletonView = () => {
    return(
        <div className='p-3 bg-white lg:border-2 border-[#f2f2f2] rounded-xl lg:mb-2 text-center'>
            <div className='flex flex-row items-center'>
                <div className='mr-5 w-[40%]'>
                    <Skeleton animation="wave" variant="rounded" width='100%' height={150} />
                </div>
                <div className='flex flex-col w-full'>
                    <Skeleton animation="wave" height={60} width='70%'/>
                    <Skeleton animation="wave" width='30%'/>
                    <Skeleton animation="wave" width='30%'/>
                    <Skeleton animation="wave" width='50%'/>
                </div>
            </div>
        </div>
    )
}

const containerStyles = {
    className: 'mt-[50px] bg-white',
    style: { height: 'calc(100vh - 50px)' },
};

export default function Basket() {
    const { removeItem, cart, handleChange } = useContext(CartContext);

    var navigate = useNavigate();
    var size = useWindowSize();
    const isMobile = size.width < 770
    const isEmpty = cart.data.length == 0;
    
    const onConfirm = () => {
        if (cart.data.length > 0){
            navigate(getRoute(`user_info`))
        } else {
            toastrService.callToastr(translateText("add items|A"));
        }
    };

    const handleRemove = (product: IProductCart) => {
        removeItem((cart: IProductCart[]) => cart.filter(item => !(item.id === product.id && item.color === product.color && item.size === product.size)));
    };

    const viewProducts = cart.data.map((item:IProductCart, id: number) => {
        return(
            <div className='p-3 bg-white lg:border-2 border-[#f2f2f2] rounded-xl lg:mb-2' key={id}>
                <div className='flex items-center'> 

                    <div className='imgPosition relative' >
                        <div onClick={() => navigate(getRoute(`product/${item.id}`))}><Images images={item.images} behaviour={ImageBehaviour.Single} /></div>
                        <div className='absolute bottom-0 bg-white p-1 rounded-tr-xl'><Tooltip title={translateText("delete item|A")}><DeleteIcon className='removeIcon' onClick={() => handleRemove(item)}/></Tooltip></div>
                    </div>

                    <div className='infoPosition md:space-y-1'> 
                        <div className='md:text-lg lg:text-xl xl:text-2xl font-bold' onClick={() => navigate(getRoute(`product/${item.id}`))}>{item.labelName}</div>
                        <div className='txtCartDesc'>{translateText("color|A")}: {item.color}</div>
                        {item.category !== 'earrings' ? <div className='txtCartDesc'>{translateText("size|A")}: {item.size}</div> : <></>}
                        <Price product={item} font='lg' currTypeFor='UAH'/>
                    </div>
                    
                    <div className='cart-parent-component-end'>
                        <div className='flex flex-col items-center'>
                            <button className='btnCart border'onClick={() => handleChange(item, 1)}>+</button>
                            <div className='txtCartCount'>{item.count}</div>
                            <button className='btnCart border'onClick={() => handleChange(item, -1)}>-</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    })

    return (
        <div {...containerStyles}>
            <Helmet>
                <title>Корзина: оформляй замовлення швидко, зручно та безпечно | TVOI</title>
            </Helmet>
            {!isMobile ? (
                <DesktopView viewProducts={viewProducts} onConfirm={onConfirm} isEmpty={isEmpty} />
            ) : (
                <MobileView viewProducts={viewProducts} onConfirm={onConfirm} isEmpty={isEmpty} />
            )}
        </div>
    );
}