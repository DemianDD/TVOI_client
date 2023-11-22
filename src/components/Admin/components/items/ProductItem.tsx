import React from 'react'
import { ImageBehaviour, Images } from '../../../productsView/productsComponent/Images';

interface IProps{
    items: IProduct[];
}

const ProductItem = (props: IProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
        {props.items.map((item, index) => {
            return(
                <div key={index} className='w-[200px] bg-white rounded-xl border-2 border-[#ccc]'>
                    <div className='h-[200px] bg-[#f2f2f2] border-b-2 border-[#ccc] rounded-t-xl'>
                        <Images images={item.images} behaviour={ImageBehaviour.Single}/>
                    </div>
                    <div className='px-2 py-1 text-xs'>{item.labelName}</div>
                    <div className='px-2 py-1 text-xs'>
                        {item.price} UAH
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default ProductItem