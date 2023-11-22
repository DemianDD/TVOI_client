import React, { useContext, useState } from "react";
import translationService, { translateText } from "../../../services/translation.service";
import '../Cart.css';
import { Helmet } from 'react-helmet';
import { ReactComponent as BackIcon } from '../../../images/leftIcon.svg';
import { useNavigate } from "react-router";
import { FadeIn } from "react-slide-fade-in";
import useWindowSize from "../../../hooks/UseWindowSize";
import { ReactComponent as UserIcon } from '../../../images/user.svg'
import { UserContext } from "../../../context/user-context";
import toastrService from "../../../services/toastr.service";
import { getRoute } from "../../../services/routes.service";
import { Ad } from "../Ad";

const UserData = () => {
  const { userData, handleInputChange, onCalcSymbolsOnlyChange, setUserData } = useContext(UserContext);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const size = useWindowSize();
  const isMobile = size.width < 620;
  
  const { name, phone, email } = userData;

  const validateForm = () => {
    if (!name || !phone || !email) {
      setUserData((prevOrder) => ({
        ...prevOrder,
        name: prevOrder.name || "",
        phone: prevOrder.phone || "",
        email: prevOrder.email || "",
      }));

      setIsFormSubmitted(true);
      toastrService.callToastr(translateText("please|A"));
      return false;
    }
    return true;
  };

  const handleNextStep = async () => {
    if (validateForm()) {
      toastrService.callToastr(translateText("data saved|A"));
      navigate(getRoute("shipping_info"));
    }
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
          <title>Введіть ваші персональні дані | TVOI</title>
        </Helmet>
        <div className="p-3">
          <div className="w-full flex justify-center">
            <div className="step-style text-secondary flex items-center cursor-pointer" onClick={() => navigate(-1)}>
              <BackIcon className="w-[30px] pr-2"/>
              <div>{translateText('step|A')} 1/2</div>
            </div>
          </div>
          <div className="order-element">
            <div className="rowStyle">
              <span><UserIcon/></span>
              <span className="component-fill">
                <label className="inputStyle">&nbsp;&nbsp;&nbsp;&nbsp;{translateText('name surname|A')}:*</label>
                <input
                  type="text"
                  name="name"
                  placeholder={translateText('ex|A')}
                  className={`form-control ${isFormSubmitted && !name ? "error" : ""}`}
                  value={name}
                  onChange={handleInputChange}
                />
              </span>
            </div>
            <label className="inputStyle">&nbsp;&nbsp;&nbsp;&nbsp;{translationService.translate("phone|A")}:*</label>
            <input
              type="text"
              name="phone"
              placeholder="+380"
              className={`form-control ${isFormSubmitted && !phone ? "error" : ""}`}
              value={phone}
              onKeyPress={onCalcSymbolsOnlyChange}
              onChange={handleInputChange}
            />
          </div>
          <div className="order-element">
            <label className="inputStyle">&nbsp;&nbsp;&nbsp;&nbsp;{translateText('email|A')}:*</label>
            <input
              type="text"
              name="email"
              placeholder="example@gmail.com"
              className={`form-control ${isFormSubmitted && !email ? "error" : ""}`}
              value={email}
              onChange={handleInputChange}
            />
            <span className="inputStyle mt-2">
              {translateText('questions|A')}? 
              <a href="https://www.instagram.com/love.tvoi/?igshid=YmMyMTA2M2Y%3D"> {translateText('write us|A')}</a>
            </span>
          </div>
          <div className="confirm-footer">
            <div className="w-100">
              <button className="btnConfirmCartStyle" onClick={handleNextStep}>
                {translateText('continue|A')}
              </button>
            </div>
          </div>
        </div>
      </FadeIn>
      {!isMobile && (
        <div className='ad-pos'>
          <Ad title='Хе-хе, а що тут у нас... Лиш дай знати цим лапкам, куди слід відносити посилки!' image='animals/cats_feet.png'/>
        </div>
      )}
    </div>
  );
};

export default UserData;
