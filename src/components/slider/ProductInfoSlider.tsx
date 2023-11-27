import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export interface IProps {
  images: (string | { url: string })[];
}

const ProductInfoSlider = (props: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getImageUrl = (image: string | { url: string }) => {
    return typeof image === 'string' ? image : image.url;
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % props.images.length;
    setCurrentIndex(newIndex);
  };

  const previousSlide = () => {
    const newIndex = (currentIndex - 1 + props.images.length) % props.images.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="flex items-center flex-col relative">
      <div className="slider-container">
        {props.images.map((image, index) => (
          <div
            key={index}
            className={`slider-slide ${currentIndex === index ? "active" : ""}`}
            style={{
              transform: `translateX(-${100 * currentIndex}%)`,
              width: '350px !important'
            }}
          >
            <LazyLoadImage
              src={getImageUrl(image)}
              alt={`Image ${index + 1}`}
              className="slider-image"
            />
          </div>
        ))}
      </div>

      {props.images.length > 1 ? <div className="absolute bottom-5 flex items-center mt-[30px] gap-4 p-3">
        <button
          className="p-2 bg-[#fff] text-[#ccc] rounded-full shadow-[#ccc] shadow-sm"
          onClick={previousSlide}
        >
          <img src="/icons/left.svg" className="w-[20px]" />
        </button>
        <button
          className="p-2 bg-[#fff] text-[#ccc] rounded-full shadow-[#ccc] shadow-sm"
          onClick={nextSlide}
        >
          <img src="/icons/right.svg" className="w-[20px]" />
        </button>
      </div> : <></>}
    </div>
  );
};

export default ProductInfoSlider;
