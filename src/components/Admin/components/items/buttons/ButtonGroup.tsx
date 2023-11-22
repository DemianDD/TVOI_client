import React from "react";
import { ProductContext } from "../../../../../context/product-context";

const ButtonGroup = ({index}) => {

    const { deleteProduct } = React.useContext(ProductContext);

    return(
        <div className='flex items-center text-xs'>
            <button className="p-1 bg-blue-100 w-[50px] rounded-l-lg text-blue-600">Edit</button>
            <button className="p-1 bg-red-500 w-[50px] rounded-r-lg text-white" onClick={() => deleteProduct(index)}>
                Delete
            </button>
        </div>
    )
}

export default ButtonGroup;