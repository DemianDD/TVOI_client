import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CarouselGallery } from "../components/productsView/Carousel";
import { FooterPanel } from "../components/FooterPanel";
import { translateText } from "../services/translation.service";
import { getRoute } from "../services/routes.service";
import { Helmet } from "react-helmet";
import CardProducts from "../components/productsView/CardProduct";
import Categories from "../components/productsView/Categories";
import { ProductContext } from "../context/product-context";
import useWindowSize from "../hooks/UseWindowSize";
import Tips from "../components/Tips";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import SearchField from "../components/SearchField";
import BlackFriday from "../components/eventboards/BlackFriday";

const WALLPAPER_DEFAULT = 'https://live.staticflickr.com/65535/52644560059_1f10d3f810_h.jpg';
const WALLPAPER_BLACKFRIDAY = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_Wallpaper.jpg/2560px-Black_Wallpaper.jpg';

const Home = () => {
  const { products } = useContext(ProductContext);
  const [popularProducts, setPopularProducts] = React.useState<IProduct[]>([]);
  const [offeredProduct, setOfferedProduct] = React.useState<IProduct[]>([]);
  const [saleProducts, setSaleProducts] = React.useState<IProduct[]>([]);

  var navigate = useNavigate();
  var size = useWindowSize();
  const isMobile = size.width < 620;

  useEffect(() => {
    const popularItems = [...products].sort((a, b) => a.popularity - b.popularity);
    const offeredItems = [...products].sort(() => Math.random() - 0.5);
    const saleItems = [...products].sort(() => Math.random() - 0.5).filter((p) => p.salePrice > 0).filter((p) => p.category !== 'watches');
    setOfferedProduct(offeredItems.splice(0, 51));
    setPopularProducts(popularItems.splice(0, 10));
    setSaleProducts(saleItems);
  }, [products]);

  return (
    <div className="page-container">
      <Helmet>
        <title>
          TVOI | Home - Срібні брендові прикраси за низькими цінами купити у Львові у Києві
        </title>
      </Helmet>
      <div className="simItemPos">
        {!isMobile ? (
          <div className="position-relative d-flex justify-content-center align-items-center">
            <img
              className="home-banner"
              src={WALLPAPER_DEFAULT}
            />
            <span className="home-banner-text">
              <SearchField />
            </span>
            
          </div>
        ) : (
          <div className="p-3">
            <Tips />
          </div>
        )}

        <div className="bg-gradient-to-b from-white via-red-300 md:from-[#313131] md:via-white py-3 px-2 md:px-3 relative">
          <div className="gilroy uppercase text-white text-base md:text-xl pb-2 pl-4">
            <i className="bg-[#111111] px-3.5 py-0.5 rounded-xl">Вибір покупців</i>
          </div>
          <CarouselGallery products={saleProducts} />
        </div>

        <div className="simItemStyleSpecial">
          {translateText("category|A")}
        </div>
        <Categories />

        <div className="relative">
          {!isMobile ? (
            <LazyLoadImage
              src="animalsChris/cat_sleep.png"
              className="absolute w-[250px] z-10 right-5 top-0 drop-shadow-lg shadow-[#ccc]"
            />
          ) : (
            <></>
          )}
          <div className="simItemStyleSpecial">
            {translateText("often bought|A")}
          </div>
          <CarouselGallery products={popularProducts} />
        </div>
      </div>

      <div
        className="simItemStyleSpecial"
        onClick={() => navigate(getRoute(`sales`))}
      >
        {translateText("more to love|A")}
      </div>
      <CardProducts products={offeredProduct} style="productView" />
      <FooterPanel />
    </div>
  );
};

export default Home;
