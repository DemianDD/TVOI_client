import React from 'react'
import { ProductContext } from '../../../context/product-context';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button/Button';

const EditTab = ({inputFields}) => {
    const {handleInputChange, productFields, updateProduct} = React.useContext(ProductContext);
    const { id } = useParams<{ id: string | undefined }>();

    const handleSave = () => {
      if (id !== undefined) {
        updateProduct(id, productFields);
      } else {
        console.error('Product ID is undefined.');
      }
    };
    return(
        <div className='flex flex-col items-center'>
            <div className='m-2 text-lg text-[#7c7c7c]'>Edit product</div>
            {inputFields && inputFields.map((inputField: any) => {
                return (
                    <TextField 
                        size="small"
                        style={{width: '100%', marginTop: 5, marginBottom: 5, color: 'black'}}
                        variant="outlined"
                        key={inputField.id}
                        id={id}
                        type={inputField.type}
                        label={inputField.placeholder}
                        value={productFields[inputField.propertyName] || ''}
                        onChange={(e) =>
                            handleInputChange(inputField.propertyName, e.target.value)
                        }
                    />
                );
            })}
            <Button variant="contained" onClick={handleSave}>Save</Button>
        </div>
    )
}

export default EditTab;