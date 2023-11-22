import { useNavigate } from 'react-router';
import { ReactComponent as EmptyCartIcon } from '../../images/emptyCart.svg';
import { getRoute } from '../../services/routes.service';
import { translateText } from '../../services/translation.service';

export const Empty = () => {
    const navigate = useNavigate();
    return(
        <div className="empty-cart-container">
            <div><EmptyCartIcon/></div>
            <div className="empty-cart-text">{translateText('empty cart|A')}</div>
            <button className="btn-add-cart" onClick={() => navigate(getRoute(`sales`))}>{translateText('go shopping|A')}</button>
        </div>
    )
}