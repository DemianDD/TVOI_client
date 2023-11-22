import { useContext } from 'react';
import { ImageBehaviour, Images } from '../../productsView/productsComponent/Images';
import './Order.css'
import { CartContext } from '../../../context/cart-context';
import { UserContext } from '../../../context/user-context';
import { translateText } from '../../../services/translation.service';

interface IProps{
    close: () => void;
}

export const Bill = (props: IProps) => {

    const {userData} = useContext(UserContext);
    const {cart, endedPrice} = useContext(CartContext);

    const items = cart.data.map((item:IProductCart, id: number) => {
        return(
            <div className='bill-item ' key={id} >
                <div className='columnStyle'> 

                    <div className='bill-imgPosition position-relative'>
                        <Images images={item.images} behaviour={ImageBehaviour.Single} />
                        <span className='bill-quantity text-secondary'>x{item.count}</span>
                    </div>

                    <div className='bill-infoPosition text-secondary'> 
                        
                        <div>{item.color}</div>
                        {item.category !== 'earrings' ? <div>{item.size}</div> : <></>}
                    </div>
                </div>
            </div>
        )
    })

    return(
        <div className='bill-parent'>
            <div className='bill-container'>
                <div className=' text-secondary text-center'>
                    {translateText('your_order|A')}:
                </div>
                <div className='categoriesStylePos'>
                    {items}
                </div>

                <div className='bill-element text-secondary'>
                    <div>{userData.name}</div>
                    <div>{userData.phone}</div>
                    <div>{userData.town}</div>
                    <div>{translateText('post_name|A')}: {userData.selectedImage}</div>
                    <div>{translateText('postOffice_name|A')}: {userData.postOffice}</div>
                    <div>{translateText('paymentMethod_name|A')}: {userData.paymentMethod}</div>
                </div>

                <p/>

                <div className='text-secondary text-end p-3'>
                    {translateText('for total|A')}: <span className='text-lg'>{endedPrice}</span> UAH
                </div>

                <p/>

                <div className='d-flex justify-content-center'>
                    <button className="order-btn-1" onClick={props.close}>{translateText('close|A')}</button>
                </div>
            </div>
        </div>
    )
}