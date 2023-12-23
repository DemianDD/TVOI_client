import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getRoute } from "../../../services/routes.service";
import '../Cart.css'
import './Order.css'
import { ReactComponent as BillIcon } from '../../../images/bill.svg';
import { Bill } from "./Bill";
import { UserContext } from "../../../context/user-context";
import { Helmet } from "react-helmet";
import { CartContext } from "../../../context/cart-context";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { translateText } from "../../../services/translation.service";

const OrderSuccess = () => {

    const {userData} = useContext(UserContext);
    const {clearBasket } = useContext(CartContext);
    const [billWindow, setBillWindow] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        clearBasket();
        navigate(getRoute(``));
    }
    const billWindowOpen = () => {
        setBillWindow(true)
        disableBodyScroll(document.querySelector('.order-end-container')!);
    }
    const billWindowClose = () => {
        setBillWindow(false)
        enableBodyScroll(document.querySelector('.order-end-container')!);
    }

    return(
        <div className="grid md:grid-cols-4 grid-cols-1 mt-[50px]"> 
            <Helmet>
                <title>Ваше замовлення успішно підтверджено | TVOI</title>
            </Helmet>
            <div className="p-3 col-start-2 col-span-2">

                <div className="order-element align-items-center">
                    <img className="succes-icon" src="https://cdn-icons-png.flaticon.com/512/7518/7518748.png"/>
                    <h4>{translateText('order confirmed|A')}!</h4>
                </div>
                <div className="order-element align-items-center">
                    <div className="font-bold">{translateText('thank you|A')}, {userData.name}!</div>
                        <div className="text-xs my-3 lg:text-base flex flex-col items-center">
                            <div>{translateText('package getting ready|A')}...</div>
                            <div><img src="animalsChris/cat_box.png" className="lg:w-[200px] w-[150px] py-3"/></div>
                            <div className="text-center">{translateText('order info|A')}</div>
                        </div>
                    <button className="flex items-center justify-center border border-[#6a6a6a] rounded-xl lg:w-1/3 w-full text-xs text-[#6a6a6a]" onClick={billWindowOpen}>
                        <BillIcon/>
                        {translateText('view details|A')}
                    </button>
                </div>

                <div className="confirm-footer !left-1/2">
                  <div className="w-100">
                    <button className="btnConfirmCartStyle" onClick={handleClick}>{translateText('shop more|A')}</button>
                  </div>
                </div>
            </div>

            {billWindow && <Bill close={billWindowClose}/>}
        </div>
    )
};
export default OrderSuccess;