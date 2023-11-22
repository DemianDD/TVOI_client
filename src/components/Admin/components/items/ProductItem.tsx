import React from 'react'
import { ImageBehaviour, Images } from '../../../productsView/productsComponent/Images';
import { translateText } from '../../../../services/translation.service';
import ButtonGroup from './buttons/ButtonGroup';

interface IProps{
    items: IProduct[];
}

const ProductItem = (props: IProps) => {

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
            {props.items.map((item, index) => {
                return(
                    <div key={index} className='w-[200px]'>
                        <div className='h-[200px] bg-[#f2f2f2] border-b-2 border-[#ccc] rounded-t-xl relative'>
                            <Images images={item.images} behaviour={ImageBehaviour.Single}/>
                            <div className='absolute bottom-2 right-0'><ButtonGroup index={item.id}/></div>
                        </div>
                        <div className='bg-white px-2 py-1 text-xs flex flex-col border-2 border-[#ccc] rounded-lg'>
                            <span className='text-[#8b8b8b]'>#{item.id}</span>
                            <span>{translateText(item.labelName)} {item.brand}</span>
                            <span>{item.price} UAH</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductItem