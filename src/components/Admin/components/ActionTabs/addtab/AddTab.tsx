import React from 'react'
import { ProductContext } from '../../../../../context/product-context';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import AddManually from './AddManually';
import RenderTextField from '../../fields/RenderTextField';
import AddJson from './AddJson';

const AddTab = ({inputFields}) => {
    const [value, setValue] = React.useState(0);
    const { handleInputChange, productFields, postProduct, category, handleSelectChange } = React.useContext(ProductContext);
    
    const handleAddProduct = () => {
        postProduct();
    };

    const handleDeleteField = (fieldName, index) => {
        let copy = [...productFields[fieldName]];
        copy.splice(index, 1); 
        handleInputChange(fieldName, copy);
    }

    const renderInputField = (inputField) => {
        if (inputField.isArray) {
            return productFields[inputField.propertyName].map((value, id) =>
                RenderTextField(
                    inputField, 
                    id, 
                    value, 
                    newValue => {
                        let copy = [...productFields[inputField.propertyName]];
                        copy[id] = newValue;
                        handleInputChange(inputField.propertyName, copy);
                    },
                    true, // isPartOfArray
                    id, // index
                    handleDeleteField // handleDelete
                )
            );
        } else {
            return RenderTextField(
                inputField, 
                inputField.propertyName, 
                productFields[inputField.propertyName], 
                newValue => handleInputChange(inputField.propertyName, newValue),
                false,
                0,
                () => {}
            );
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='m-2 text-lg text-[#7c7c7c] w-full'>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Add Manually" icon={<BorderColorIcon />} />
                    <BottomNavigationAction label="Add Json" icon={< ContentPasteGoIcon/>} />
                </BottomNavigation>
            
            </div>
            <div className='w-full'>
                {value === 0 && <AddManually
                    handleAddProduct={handleAddProduct}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    productFields={productFields}
                    inputFields={inputFields}
                    category={category}
                    renderInputField={renderInputField}
                />}
                {value === 1 && <AddJson/>}
            </div>
            
        </div>
    );
};

export default AddTab;