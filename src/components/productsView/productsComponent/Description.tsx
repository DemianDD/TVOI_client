import React, { useEffect, useState } from 'react'
import { ProductDescription } from '../../productOverviewPanel/components/ProductDescription'
import { ProductDelivery } from '../../productOverviewPanel/components/ProductDelivery'
import { ProductGaranty } from '../../productOverviewPanel/components/ProductGaranty'
import { defaultProduct } from '../../../data/defaults';
import { useParams } from 'react-router-dom';
import translationService from '../../../services/translation.service';
import '../../Cart/Cart.css'

interface IProps{
    products: IProduct[];
}

const blocks = [
    {
        title: translationService.translate("details|A"),
        component: ProductDescription,
        style: "",
        img: 'icons/desc.svg'
    },
    {
        title: translationService.translate("delv|A"),
        component: ProductDelivery,
        style: "border-x px-3 border-[#f2f2f2]",
        img: 'icons/delivery.svg'
    },
    {
        title: translationService.translate("warranty|A"),
        component: ProductGaranty,
        style: "",
        img: 'icons/warranty.svg'
    },
]

const Description = (props: IProps) => {
    const [productsDesc, setProductsDesc] = useState<IProduct[]>([]);
    const [open, setOpen] = useState(false);

    let {id} = useParams<any>();
    const prodDesc = props.products.find(e => e.id?.toString() === id) ?? defaultProduct;
    useEffect(() => {
        const desc = props.products.filter(e => e.id?.toString() === id) ?? defaultProduct;
        setProductsDesc(desc);
    }, [id, prodDesc]);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div className={`bg-white w-full relative ${open ? 'move-down' : 'move-up'} `}>
          <div className={`max-h-full py-3 mx-[50px] grid grid-cols-3 gap-x-5 transition-max-h border-t border-[#f2f2f2]`}>
              {blocks.map((b, id) => {
                  const Component = b.component;
                  return(
                      <div key={id} className={b.style}>
                          <div className='text-xl text-bold text-blue-200 flex items-center'><img src={b.img} className='mr-1'/> {b.title}</div>
                          <Component products={productsDesc}/>
                      </div>
                  )
              })}
          </div>
          <div className={`bg-white absolute bottom-0 w-full flex justify-center`}>
            <button className={`showbutton ${open ? 'active' : ''} !w-auto`} onClick={handleClick}><span className="arrow"></span></button>
          </div>
      </div>
    )
}

export default Description