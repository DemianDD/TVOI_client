import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { defaultProduct } from "../data/defaults";
import toastrService from "../services/toastr.service";
import translationService, { translateText } from "../services/translation.service";
import { SizeInfoWindow } from "../components/windows/SizeInfoWindow";
import { getRoute } from "../services/routes.service";
import { Helmet } from "react-helmet";
import CardProducts from "../components/productsView/CardProduct";
import { Toolbar } from "../components/productOverviewPanel/components/Toolbar";
import useWindowSize from "../hooks/UseWindowSize";
import Slider from "../components/slider/Slider";
import { ReactComponent as AddCartIcon } from "../images/addcart.svg";
import { ReactComponent as BuyIcon } from "../images/buy.svg";
import { ReactComponent as RealPhotoIcon } from "../images/real_photo.svg";
import { CartContext } from "../context/cart-context";
import { ColorSelector } from "../components/productsView/productsComponent/ColorSelector";
import { SizeSelector } from "../components/productsView/productsComponent/SizeSelector";
import { ProductContext } from "../context/product-context";
import { Photos } from "../components/productsView/productsComponent/RealPhotos";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { Price } from "../components/productsView/productsComponent/Price";
import Description from "../components/productsView/productsComponent/Description";
import Tips from "../components/Tips";
import ProductInfoSlider from "../components/slider/ProductInfoSlider";
import { UserContext } from "../context/user-context";
import EditPanel from "../components/Admin/SidePanel";
import TabPanel from "../components/productOverviewPanel/components/TabPanel";

const Product = () => {
  let { id } = useParams<any>();
  const { handleClick, clearBasket } = useContext(CartContext);
  const { products } = useContext(ProductContext);
  const { authorized } = useContext(UserContext);
  const [photoWindow, setPhotoWindow] = useState(false);
  const [productItem, setProductItem] = useState<IProduct>(defaultProduct);
  const [offeredProduct, setOfferedProduct] = useState<IProduct[]>([]);
  const [sizeInfoWindow, setSizeInfoWindow] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  var navigate = useNavigate();
  var size = useWindowSize();
  var prod = products.find((Element) => Element.id?.toString() === id) ?? defaultProduct;
  const isMobile = size.width < 770;
  const isSale = productItem.salePrice > 0;
  var difference = Math.round((productItem.salePrice / productItem.price) * 100);
  var roundedDifference = Math.round(difference / 5) * 5;
  var percentage = 100 - roundedDifference;

  const onBuyNow = () => {
    if (
      !selectedColor ||
      selectedColor.length === 0 ||
      !selectedSize ||
      selectedSize.length === 0
    ) {
      toastrService.callToastr(translationService.translate("error order|A"));
    } else {
      clearBasket();
      handleClick({
        ...productItem,
        count: 1,
        color: selectedColor!,
        size: selectedSize!,
      });
      navigate(getRoute(`user_info`));
    }
  };

  const handleInfoSizeWindowCancel = () => {
    setSizeInfoWindow(false);
    enableBodyScroll(document.querySelector(".productInfoView")!);
  };
  const onSizeInfo = () => {
    setSizeInfoWindow(true);
    disableBodyScroll(document.querySelector(".productInfoView")!);
  };
  const handleSelectedColor = (value: string) => {
    setSelectedColor(value);
  };
  const handleSelectedSize = (value: string) => {
    setSelectedSize(value);
  };
  const openPhotoWindow = () => {
    setPhotoWindow(true);
    disableBodyScroll(document.querySelector(".productInfoView")!);
  };
  const closePhotoWindow = () => {
    setPhotoWindow(false);
    enableBodyScroll(document.querySelector(".productInfoView")!);
  };
  const addToCart = () => {
    if (
      !selectedColor ||
      selectedColor.length === 0 ||
      (productItem.category !== "watches" &&
        productItem.category !== "earrings" &&
        productItem.category !== "charms" &&
        (!selectedSize || selectedSize.length === 0))
    ) {
      setIsFormSubmitted(true);
      setTimeout(() => setIsFormSubmitted(false), 2500);
      toastrService.callToastr(translationService.translate("error order|A"));
    } else {
      handleClick({
        ...productItem,
        count: 1,
        color: selectedColor!,
        size: selectedSize!,
      });
      toastrService.callToastr(translationService.translate("added to cart|A"));
    }
  };

  useEffect(() => {
    setProductItem(prod);
    if (!prod.sizes || prod.sizes.length === 0) {
      handleSelectedSize("One Size");
    }
    const offeredItems = [...products]
      .sort((a, b) => {
        if (a.category === prod.category && b.category !== prod.category) {
          return -1;
        } else if (
          a.category !== prod.category &&
          b.category === prod.category
        ) {
          return 1;
        }
        if (a.metal === prod.metal && b.metal !== prod.metal) {
          return -1;
        } else if (a.metal !== prod.metal && b.metal === prod.metal) {
          return 1;
        }
        return Math.random() - 0.5;
      })
      .filter((a) => a.category === prod.category || a.metal === prod.metal);
    setOfferedProduct(offeredItems.splice(0, 99));
  }, [id, products]);

  return (
    <div className='page-container' style={{"marginBottom" : "75px"}}>
        <Helmet>
          <title>
            {productItem.labelName +
              ":" +
              " " +
              "купити" +
              " " +
              productItem.brand +
              " " +
              "|" +
              " " +
              "TVOI"}
          </title>
        </Helmet>
        <div className="productInfoView">
          <div className="infoViewCard">
            {!isMobile ? <div className="prLblName">{productItem.labelName}</div> : <></>}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-x-5">
              <div className="bg-images relative">
                {isMobile ? (
                  <Slider
                    photos={productItem.images}
                    isBorderRounded={false}
                  />
                ) : (
                  <ProductInfoSlider images={productItem.images}/>
                )}
                
              </div>
              <div className="columnStyle">
                <div className="prColumnPos">
                {isMobile ? 
                  <div className="flex items-center w-full py-2 gap-2 border-b border-[#f2f2f2] ">
                    <div className="text-black text-start text-sm flex-1 p-2 bg-[#fff] rounded-xl">{productItem.labelName}</div>
                    {isMobile? <div className="bg-blue-50 text-blue-500 text-sm p-2 rounded-xl text-center" onClick={onSizeInfo}>
                      {translationService.translate("choose size|A")}?
                    </div> : <></>} 
                  </div>
                : <></>}
                  <div className="my-3 space-y-5">
                    <div className="size-color-margin">
                      <div className="infoText">{translateText(('choose color|A'))}:*</div>
                      <div
                        className={`rowStyle justify-content-center ${
                          isFormSubmitted && !selectedColor ? "error" : ""
                        }`}
                      >
                        <ColorSelector
                          colors={productItem.colors}
                          onColorSelect={handleSelectedColor}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="infoText">{translateText(('size choose|A'))}:*</div>
                      <div
                        className={`rowStyle justify-content-center mb-3 ${
                          isFormSubmitted && !selectedSize ? "error" : ""
                        }`}
                      >
                        <SizeSelector
                          sizes={productItem.sizes}
                          onSizeSelect={handleSelectedSize}
                        />
                      </div>
                      {!isMobile? <div className="infoText text-primary" onClick={onSizeInfo}>
                        {translationService.translate("choose size|A")}?
                      </div> : <></>}
                    </div>
                  </div>

                  <div className="priceViewProduct flex items-center justify-between">
                    <Price product={productItem} font="xl" currTypeBack="грн." />
                    {isSale ? <div className='bg-[#111111] py-1 px-3 rounded-2xl'><span className='text-white text-base font-bold'>-{percentage}%</span></div> : <></>}
                  </div>
                </div>
                {productItem.realPhotos.length > 0 ? (
                  <div className="px-[10px] md:px-0 w-full">
                    <button className="real-photo-btn bg-blue-50 text-blue-400" onClick={openPhotoWindow}>
                      <RealPhotoIcon className="w-[35px] md:w-auto"/> {translateText(('real photos|A'))}
                    </button>
                  </div>
                  ) : (
                  <></>
                )}

                <div className="btnInfoPgStylePos">
                  <button className="btnInfoPg btn-add-cart" onClick={addToCart}>
                    <AddCartIcon className="mr-1" />{" "}
                    {translationService.translate("add to cart|A")}
                  </button>
                </div>
              </div>
              {isMobile ? (
                <div className="h-full px-[10px] py-1">
                  <Toolbar products={products} />
                </div>
              ) : (
                <></>
              )}
              <div className="flex items-center justify-center px-4"><Tips/></div>
            </div>

            
          </div>
          {!isMobile ? <Description products={products} /> : <></>}
          
        </div>
        <div className="simItemStyleSpecial">
          {translationService.translate("you may also like|A")}
        </div>
        <CardProducts products={offeredProduct} style='productView'/>
        {sizeInfoWindow && (
          <SizeInfoWindow onCancel={handleInfoSizeWindowCancel} isOpen={sizeInfoWindow} />
        )}
        {photoWindow && (
          <Photos photos={productItem.realPhotos} close={closePhotoWindow} />
        )}
    </div>
  );
};

export default Product;
