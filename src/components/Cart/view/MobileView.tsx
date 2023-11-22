import React, { useContext } from 'react';
import {ReactComponent as CartIcon} from '../../../images/basket.svg';
import {ReactComponent as BackIcon} from '../../../images/leftIcon.svg';
import { Empty } from '../Empty';
import '../Cart.css'
import { CartContext } from '../../../context/cart-context';
import { useNavigate } from 'react-router-dom';
import { GetSale } from '../Basket';
import { translateText } from '../../../services/translation.service';

interface IMobileView{
    viewProducts: JSX.Element[];
    isEmpty: boolean;
    onConfirm: () => void;
}

const MobileView = (props: IMobileView) => {
    const { totalProductPrice, endedPrice, endedSale, count } = useContext(CartContext);
    var navigate = useNavigate();
    return(
        <div>
            <div className='flex items-center pl-3 py-1 bg-white'>
                <span className='w-[25px] cursor-pointer' onClick={() => navigate(-1)}><BackIcon /></span>
                <span><CartIcon/></span>
                <span><h5 className='font-bold text-main'>{translateText('my items|A')}: &#40;{count}&#41;</h5></span>
            </div>

            {!props.isEmpty ? <div className="cart-list">
                {props.viewProducts}
                <GetSale/>
            </div>
                :
            <div className='flex flex-col justify-center' style={{height: 'calc(100vh - 248px)'}}>
                <Empty/>
            </div>}

            {!props.isEmpty ? <div className="fixed bottom-0 flex flex-col md:w-1/2 w-full p-3 bg-white">

                <div className='columnStyle p-2 w-100'>

                    <div className='rowStyle'>
                        <div className='component-fill w-100'><h6 className='text-main'>{translateText('subtotal|A')}:</h6></div>
                        <div><h6 className='text-main'>{totalProductPrice} UAH</h6></div>
                    </div>

                    <div className='rowStyle '>
                        <div className='component-fill w-100 text-secondary'><small >{translateText('sale|A')}:</small></div>
                        <small className='text-secondary'>-{endedSale} UAH</small>
                    </div>

                </div>

                <div className="columnStyle w-100 p-2">
                    <div className="rowStyle ">
                        <div className='component-fill w-100'><h5 className='font-bold text-main'>{translateText('for total|A')}:</h5></div>
                        <div><h5 className='font-bold text-main'>{endedPrice} UAH </h5></div>
                    </div>
                </div>

                <div>
                    <button 
                    className="btnConfirmCartStyle success-action"
                    onClick={props.onConfirm}>
                        {translateText('confirm|A')}
                    </button>
                </div> 

            </div> : <></> }
        </div>
    )
}

export default MobileView;