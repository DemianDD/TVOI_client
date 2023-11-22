import { useState } from 'react';
import { FadeIn } from 'react-slide-fade-in';
import { ReactComponent as CloseIcon } from '../../../images/cancel.svg';
import OutsideAlerter from '../../helpers/Outside';
import '../Cart.css'
import './Order.css'
import { translateText } from '../../../services/translation.service';

interface IProps {
  onCancel: () => void;
  handleButtonChange: (text: string) => void;
  handlePaymentMethodChange: (text: string) => void;
}

export const PaymentMethod = (props: IProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);

    if (event.target.checked) {
      props.handleButtonChange(translateText('paymentMethod_post|A'));
      props.handlePaymentMethodChange(translateText('paymentMethod_post|A'));
    } else {
      props.handleButtonChange(translateText('select|A'));
      props.handlePaymentMethodChange("");
    }

    setTimeout(() => props.onCancel(), 100);
    
  };

  return (
    <div className="order-parent">
      <FadeIn
        from="bottom"
        positionOffset={400}
        triggerOffset={500}
        delayInMilliseconds={-550}
        durationInMilliseconds={850}
      >
        <OutsideAlerter onOutsideClick={props.onCancel}>
          <div className="paymentMethodeStyle">
            <div className="d-flex justify-content-center">
              <h6>{translateText('options|A')}</h6>
              <CloseIcon className="positionRight" onClick={props.onCancel} />
            </div>
            <div className="order-element">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  checked={isActive}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label">
                  {translateText('paymentMethod_post|A')}
                </label>
              </div>
            </div>
          </div>
        </OutsideAlerter>
      </FadeIn>
    </div>
  );
};