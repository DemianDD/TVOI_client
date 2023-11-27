import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { getRoute } from '../../services/routes.service';
import { ImageBehaviour, Images } from './productsComponent/Images';
import { Price } from './productsComponent/Price';
import useWindowSize from '../../hooks/UseWindowSize';
import { forwardRef } from 'react';
import { translateText } from '../../services/translation.service';

interface IProps {
  products: IProduct[];
  style: string;
  id?: string;
}

const CardProducts = (props: IProps, ref: React.Ref<HTMLDivElement>) => {
  const navigate = useNavigate();
  let size = useWindowSize();
  const isMobile = size.width < 770;

  const viewProducts = Array.isArray(props.products)
    ? props.products.map((p, index) => {
        
        const isSale = p.salePrice > 0;
        var difference = Math.round((p.salePrice / p.price) * 100);
        var roundedDifference = Math.round(difference / 5) * 5;
        var percentage = 100 - roundedDifference;
      
        return(
          <div key={index} className='productCard'>
            <div className="productImagePos" onClick={() => navigate(getRoute(`product/${p.id}`))}>
              {isSale ? <div className='percentageIcon'><span className='percentageNumber'>-{percentage}%</span></div> : <></>}
              <Images images={p.images} behaviour={ImageBehaviour.Single} />
            </div>
            <div className='productLabel' key={index} onClick={() => navigate(getRoute(`product/${p.id}`))}>
              <Price product={p} font='xl' currTypeBack="грн."/>
              {isMobile ? <></> : <div className='productLabelOverflow'>{translateText(p.labelName)} {p.brand}</div>}
            </div>
          </div>
        )
        })
    : null;

  return(
    <div className={`${props.style}`} ref={ref}>
      {viewProducts} 
    </div>
  )
}

export default forwardRef(CardProducts);

