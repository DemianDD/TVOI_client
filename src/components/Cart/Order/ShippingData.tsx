import React, { useContext, useState } from "react";
import '../Cart.css';
import './Order.css';
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router";
import { FadeIn } from "react-slide-fade-in";
import { PaymentMethod } from "./PaymentMethod";
import { ProceedOrder } from "../../../api/endpoints/order";
import toastrService from "../../../services/toastr.service";
import translationService, { translateText } from "../../../services/translation.service";
import { ReactComponent as BackIcon } from '../../../images/leftIcon.svg';
import { CartContext } from "../../../context/cart-context";
import { WindowContext } from "../../../context/window-context";
import { UserContext } from "../../../context/user-context";
import { getRoute } from "../../../services/routes.service";
import { Ad } from "../Ad";
import useWindowSize from "../../../hooks/UseWindowSize";

export const postIcons = [
  {
    name: translateText('nova post|A'),
    src: "https://play-lh.googleusercontent.com/mtyOm0Rp0PeG_BWE7M5j9gBWuU1Du34LLj-dLdSE1-006_BkFg32W3Cca00l2BBvNM0",
    alt: "Nova Post",
  },
  {
    name: translateText('ukr post|A'),
    src: "https://www.ukrposhta.ua/uploads/files/shares/pin_2.png",
    alt: "Ukr Post",
  },
  {
    name: translateText('meest|A'),
    src: "https://www.ukraqua.com/wp-content/uploads/2022/04/group_303_0.png",
    alt: "Meest",
  },
];

const ShippingData = () => {
  const {
    userData,
    setUserData,
    handleImageClick,
    handleInputChange,
    handlePaymentMethodChange,
    onCalcSymbolsOnlyChange,
    isActive,
    setIsActive,
  } = useContext(UserContext);

  const { cart, endedPrice } = useContext(CartContext);
  const { paymentWindow, setPaymentWindow } = useContext(WindowContext);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [buttonText, setButtonText] = useState(translateText('select|A'));
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const size = useWindowSize();
  const isMobile = size.width < 620;

  const {
    town,
    postOffice,
    paymentMethod,
    selectedImage,
    name,
    phone,
    email,
  } = userData;

  const isError = (field) => isFormSubmitted && !field;

  const handleOrderConfirmation = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 5000);

    if (!town || !postOffice || !paymentMethod || !name || !phone || !email) {
      setUserData((prevOrder) => ({
        ...prevOrder,
        selectedImage: prevOrder.selectedImage || null,
        town: prevOrder.town || "",
        postOffice: prevOrder.postOffice || "",
        paymentMethod: prevOrder.paymentMethod || "",
        name: prevOrder.name || "",
        phone: prevOrder.phone || "",
        email: prevOrder.email || "",
      }));

      setIsFormSubmitted(true);
      return;
    }

    try {
      await ProceedOrder({
        name: name,
        phone: phone,
        email: email,
        selectedImage: selectedImage,
        town: town,
        postOffice: postOffice,
        paymentMethod: paymentMethod,
        products: cart.data,
        summary: endedPrice,
      });

      toastrService.callToastr("Order placed successfully!");
      navigate(getRoute(`order_confirmation`));
    } catch (error) {
      setLoading(false);
      toastrService.callToastr("Error placing the order. Please try again");
    }
  };

  const handleButtonChange = (text) => {
    setButtonText(text);
  };

  const handlePayment = () => {
    setPaymentWindow(!paymentWindow);
    setIsActive(!isActive);
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 mt-[50px] bg-white">
      <FadeIn
        from="bottom"
        positionOffset={700}
        triggerOffset={200}
        delayInMilliseconds={-550}
        durationInMilliseconds={850}
      >
        <Helmet>
          <title>Введіть ваші дані для доставки | TVOI</title>
        </Helmet>
        <div className="p-3">
          <div className="w-full flex justify-center">
            <div className="step-style text-secondary flex items-center cursor-pointer" onClick={() => navigate(-1)}>
              <BackIcon className="w-[30px] pr-2"/>
              <div>{translateText('step|A')} 2/2</div>
            </div>
          </div>
          <div className="order-element">
            <label className="inputStyle">&nbsp;&nbsp;&nbsp;&nbsp;{translateText('post select|A')}:*</label>
            <div className="rowStyle justify-content-center p-3">
              {postIcons.map((icon) => (
                <div
                  key={icon.name}
                  className={`post-icon-container ${selectedImage === icon.name ? "selected" : ""}${isError(selectedImage) ? "error" : ""}`}
                  onClick={() => handleImageClick(icon.name)}
                >
                  <img className="post-icon-size" src={icon.src} alt={icon.alt} />
                  <span>{icon.name}</span>
                </div>
              ))}
            </div>
            <label className="inputStyle">&nbsp;&nbsp;&nbsp;&nbsp;{translateText('town select|A')}:*</label>
            <div className="rowStyle w-100">
              <div className="columnStyle m-2 component-fill">
                <input
                  type="text"
                  name="town"
                  className={`form-control ${isError(town) ? "error" : ""}`}
                  placeholder={translateText('ex town|A')}
                  value={town}
                  onChange={handleInputChange}
                />
              </div>
              <div className="columnStyle m-2 component-fill">
                <input
                  type="text"
                  name="postOffice"
                  className={`form-control ${isError(postOffice) ? "error" : ""}`}
                  placeholder={translateText('ex post|A')}
                  value={postOffice}
                  onKeyPress={onCalcSymbolsOnlyChange}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="order-element">
            <div className="inputStyle columnStyle mt-2 ">&nbsp;&nbsp;&nbsp;&nbsp;
              {translateText('payment|A')}:*
            </div>
            <button
              className={`showbutton border !border-[#81a1f3] ${isActive ? 'active' : ''} ${isError(paymentMethod) ? 'error' : ''}`}
              onClick={handlePayment}
            >
              {loading ? translateText('loading..|A') : buttonText}
              <span className="arrow"></span>
            </button>
            <span className="inputStyle">
              {translateText('questions|A')}? 
              <a href="https://www.instagram.com/love.tvoi/?igshid=YmMyMTA2M2Y%3D"> {translateText('write us|A')}</a>
            </span>
          </div>
        </div>
        <div className="confirm-footer">
          <div className="w-100">
            <button className="btnConfirmCartStyle success-action" onClick={handleOrderConfirmation} disabled={loading}>
              {loading ? translateText('loading..|A') : translationService.translate('ok|A')}
            </button>
          </div>
        </div>
        {paymentWindow && (
          <PaymentMethod 
            onCancel={handlePayment} 
            handleButtonChange={handleButtonChange} 
            handlePaymentMethodChange={handlePaymentMethodChange}
          />
        )}
      </FadeIn>
      {!isMobile && (
        <div className='ad-pos'>
          <Ad title='Ііі... останній крок і твоє замовлення уже відправляється до тебе. Не зупиняйся!' image='animals/cat_4.png'/>
        </div>
      )}
    </div>
  );
};

export default ShippingData;
