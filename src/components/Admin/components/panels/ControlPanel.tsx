import React from 'react'
import ProductItem from '../items/ProductItem'
import { ProductContext } from '../../../../context/product-context'

const ControlPanel = () => {
  const {products} = React.useContext(ProductContext)

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='bg-white px-3 py-4 w-full text-center uppercase text-lg text-[#6a6a6a] border-b-2 border-[#ccc] fixed top-[50px]'>All products</div>
      <div className='overflow-auto mt-[80px]' style={{maxHeight: 'calc(100vh - 140px)'}}>
        <ProductItem items={products}/>
      </div>
    </div>
  )
}

export default ControlPanel