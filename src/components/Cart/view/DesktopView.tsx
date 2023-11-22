import React, { useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Empty } from '../Empty';
import '../Cart.css'
import { CartContext } from '../../../context/cart-context';
import { useNavigate } from 'react-router-dom';
import { GetSale } from '../Basket';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
import { postIcons } from '../Order/ShippingData';
import { translateText } from '../../../services/translation.service';

interface DesktopView{
    viewProducts: JSX.Element[];
    isEmpty: boolean;
    onConfirm: () => void;
}

const DesktopView = (props: DesktopView) => {
    const { totalProductPrice, endedPrice, endedSale, count} = useContext(CartContext);
    var navigate = useNavigate();
    return(
        <>
            <div className='w-full flex items-center bg-[#111111] h-[55px] px-5 border-t border-[#212121]'>
                <span className='text-white text-xl gilroy flex items-center'><ShoppingCartIcon className='mr-2' /> {translateText('items in cart|A')}: {count}</span>
            </div>
            
            <div className='grid grid-cols-2 px-[75px]'>
                <div className="desktop-cart-list_scroll">
                    <div className='py-3 bg-white border-2 border-[#f2f2f2] rounded-xl mb-2 text-center'>
                        <span className='2xl:text-xl text-lg text-[#b3b3b3] font-bold'>{translateText('my items|A')}:</span>
                    </div>
                    {props.isEmpty ? <Empty/> : props.viewProducts}
                    <GetSale/>
                </div>
                <div className='py-3 pl-5 flex flex-col text-black'>
                    <div>
                        <div className='space-y-2'>
                            <div className='p-3 bg-white border-2 border-[#f2f2f2] rounded-xl text-center'>
                                <span className='2xl:text-xl text-lg text-[#b3b3b3] font-bold'>{translateText('summary|A')}:</span>
                            </div>
                            <div className='p-3 border-2 border-[#f2f2f2] rounded-xl'>
                                <div className='flex text-xl'>
                                    <div className='component-fill w-100'>{translateText('subtotal|A')}:</div>
                                    <div>{totalProductPrice} UAH</div>
                                </div>
                                <div className='flex text-lg text-[#aaaaaa]'>
                                    <div className='component-fill w-100'><small >{translateText('sale|A')}:</small></div>
                                    <small className=''>-{endedSale} UAH</small>
                                </div>
                                <div className='flex text-lg text-[#aaaaaa]'>
                                    <div className='component-fill w-100'><small >{translateText('shipping|A')}:</small></div>
                                    <small className='flex items-center'>
                                        0 UAH 
                                        <Tooltip title={translateText('ship_info|A')} placement="bottom-start">
                                            <InfoOutlinedIcon color='primary' fontSize="small" sx={{cursor: 'pointer'}}/>
                                        </Tooltip> 
                                    </small>
                                </div>
                                <div className="flex text-2xl mt-3 py-4 font-bold border-t-2 border-[#f2f2f2]">
                                    <div className='component-fill w-100'>{translateText('for total|A')}:</div>
                                    <div>{endedPrice} UAH</div>
                                </div>
                            </div>
                            <div className='bg-[#f2f2f2] p-3 rounded-xl text-center mb-4'>
                                <span className='2xl:text-xl text-lg text-[#aaaaaa] font-bold'>{translateText('post prefer|A')}:</span>
                                <div className='flex justify-between my-2 px-5'>
                                    {postIcons.map((post, index) => {
                                        return(
                                            <div key={index} className='flex items-center p-2'>
                                                <img src={post.src} alt={post.alt} className='h-[40px] w-[40px] rounded-full mr-1'/>
                                                <span className='2xl:text-xl text-base text-[#aaaaaa]'>{post.name}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-col space-y-2'>
                        <button className='success-action h-[70px] rounded-full text-white 2xl:text-2xl text-lg' onClick={props.onConfirm}>
                            {translateText('confirm|A')}
                        </button>
                        <button className='border-2 border-[#f2f2f2] h-[55px] rounded-full text-black 2xl:text-xl text-base' onClick={() => navigate(-1)}>
                            {translateText('cancel|A')}
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DesktopView;