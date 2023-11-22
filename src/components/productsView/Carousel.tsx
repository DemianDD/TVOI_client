import React, { useRef } from 'react';
import { ReactComponent as RightIcon } from "../../images/rightIcon.svg";
import { ReactComponent as LeftIcon } from "../../images/leftIcon.svg";
import CardProducts from './CardProduct';
import { debounce } from 'lodash';

interface IProps {
  products: IProduct[];
}

export const CarouselGallery = (props: IProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const sliderLeft = debounce(() => {
    if (sliderRef.current) {
      const elementWidth = sliderRef.current?.lastElementChild?.clientWidth;
      if (elementWidth !== undefined) {
        sliderRef.current.scrollLeft -= elementWidth*2;
      }
    }
  }, 500, {
    leading: true,
    trailing: false
  });
  
  const sliderRight = debounce(() => {
    if (sliderRef.current) {
      const elementWidth = sliderRef.current?.lastElementChild?.clientWidth;
      if (elementWidth !== undefined) {
        sliderRef.current.scrollLeft += elementWidth*2;
      }
    }
  }, 500, {
    leading: true,
    trailing: false
  });

  return (
    <div>
      <div className='productViewCarouselParent'>
          <button onClick={sliderLeft} className='btnCarouselLeft'>
            <LeftIcon />
          </button>
          <button onClick={sliderRight} className='btnCarouselRight'>
            <RightIcon />
          </button>
        <div className='relative carousel'>
          <CardProducts products={props.products} style='carousel' ref={sliderRef} />
        </div>
      </div>
    </div>
  );
};
