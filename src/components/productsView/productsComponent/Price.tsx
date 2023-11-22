import React from 'react'
import { formatPrice } from '../../helpers/formatters';

interface IProps {
    product: IProduct;
    font: string;
    currTypeBack?: string;
    currTypeFor?: string;
}

export const Price = (props: IProps) => {
    const isSalePrice = props.product.salePrice > 0;
    const formattedSalePrice = formatPrice(props.product.salePrice);
    const formattedPrice = formatPrice(props.product.price);

    return (
        <div className='d-flex align-items-center flex-row justify-end lg:justify-start'>
            {isSalePrice && <div className='productSalePrice text-sm mr-1'>{props.currTypeBack} 
                <span className={`priceSize text-${props.font}`}> {formattedSalePrice}</span>
                {props.currTypeFor}
            </div>}
            <div className={`productPrice text-xs ${isSalePrice ? "oldPrice" : ""}`}>
                {props.currTypeBack} 
                <span className={`${isSalePrice ? '' : `priceSize text-${props.font}` }`}> {formattedPrice}</span> 
                {props.currTypeFor}
            </div>
        </div>
    )
}