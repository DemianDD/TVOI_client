import React, { useEffect, useState } from 'react';
import './Slider.css';
import '../../styles/photos.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface IProps {
  photos: string[];
  isBorderRounded?: boolean;
}

function Slider(props: IProps) {
  const [photos, setPhotos] = useState<string[]>(props.photos);
  useEffect(() => {
    setPhotos([...props.photos]);
  }, [props.photos]);

  return (
    <Swiper
      modules={[Pagination, Scrollbar]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: false }}
    > 
      {photos.map((photo, index) => {
        return(
          <SwiperSlide key={index}>
            <img src={photo} className='w-full max-h-[430px] object-contain'/>
          </SwiperSlide>
        )
      })}
      
    </Swiper>
  );
}

export default Slider;