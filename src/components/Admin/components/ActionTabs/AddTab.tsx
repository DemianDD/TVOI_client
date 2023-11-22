import React from 'react'
import { ProductContext } from '../../../../context/product-context';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { categoriesRender } from '../../../../route/productsCategoryRoutes';
import InputLabel from '@mui/material/InputLabel';

function renderTextField(inputField, id, value, onChange) {
    return (
        <TextField
            key={id}
            size="small"
            style={{ width: '100%', margin: '5px 0' }}
            variant="standard"
            type={inputField.type}
            label={inputField.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

const AddTab = ({inputFields}) => {
    const { handleInputChange, productFields, postProduct, category, handleSelectChange } = React.useContext(ProductContext);
    
    const handleAddProduct = () => {
        postProduct();
    };

    const renderInputField = (inputField) => {
        if (inputField.isArray) {
            return productFields[inputField.propertyName].map((value, id) =>
                renderTextField(inputField, id, value, newValue => {
                    let copy = [...productFields[inputField.propertyName]];
                    copy[id] = newValue;
                    handleInputChange(inputField.propertyName, copy);
                })
            );
        } else {
            return renderTextField(inputField, inputField.propertyName, productFields[inputField.propertyName], newValue =>
                handleInputChange(inputField.propertyName, newValue)
            );
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='m-2 text-lg text-[#7c7c7c]'>Add new product</div>
            <InputLabel id="category">Select Category</InputLabel>
            <Select
                style={{ width: '100%', margin: '5px 0' }}
                value={category}
                onChange={handleSelectChange}
            >
                {categoriesRender.map((option, index) => {
                    return(
                        <MenuItem key={index} value={option.path}>
                            {option.path}
                        </MenuItem>
                    )
                })}
            </Select>
            {inputFields.map(inputField => (
                <div className='m-1' key={inputField.propertyName} style={{ position: 'relative', width: '100%' }}>
                    {renderInputField(inputField)}
                    {inputField.isArray && 
                        <Button onClick={() => {
                            let copy = [...productFields[inputField.propertyName], ""];
                            handleInputChange(inputField.propertyName, copy);
                        }}>PLUS</Button>
                    }
                </div>
            ))}
            <Button
                variant='contained'
                size='small'
                onClick={handleAddProduct}
            >
                Add Product
            </Button>
        </div>
    );
};

export default AddTab;