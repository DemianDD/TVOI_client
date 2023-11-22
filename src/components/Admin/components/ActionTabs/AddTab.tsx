import React from 'react'
import { ProductContext } from '../../../../context/product-context';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import toastrService from '../../../../services/toastr.service';

const AddTab = ({inputFields}) => {
    const { handleInputChange, productFields, postProduct } = React.useContext(ProductContext);
    const [emptyFields, setEmptyFields] = React.useState<string[]>([]);

    const areTextFieldsEmpty = () => {
        const emptyFieldNames = inputFields
            .filter(inputField => inputField.type === 'text')
            .filter(inputField => !productFields[inputField.propertyName])
            .map(inputField => inputField.propertyName);
        setEmptyFields(emptyFieldNames);
        return emptyFieldNames.length > 0;
    };
    
    const handleAddProduct = () => {
        if (areTextFieldsEmpty()) {
            toastrService.callToastr('Please fill in all the text fields.');
        } else {
            postProduct();
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='m-2 text-lg text-[#7c7c7c]'>Add new product</div>
            {inputFields.map((inputField) => (
                <div className='m-1' key={inputField.propertyName} style={{ position: 'relative', width: '100%' }}>
                    {inputField.isArray ? productFields[inputField.propertyName].map((v, id) => <TextField key={id}
                            size="small"
                            style={{ width: '100%', margin: '5px 0' }}
                            variant="standard"
                            type={inputField.type}
                            label={inputField.placeholder}
                            value={productFields[inputField.propertyName][id]}
                            onChange={(e) => {
                                    var copy = [...productFields[inputField.propertyName]];
                                    copy[id] = e.target.value;
                                    handleInputChange(inputField.propertyName, copy);
                                }
                            }
                        />) :
                        <TextField
                            size="small"
                            style={{ width: '100%', margin: '5px 0' }}
                            variant="standard"
                            type={inputField.type}
                            label={inputField.placeholder}
                            value={productFields[inputField.propertyName]}
                            onChange={(e) =>
                                handleInputChange(inputField.propertyName, e.target.value)
                            }
                        />
                    }
                    {inputField.isArray && <Button onClick={() => {
                                    var copy = [...productFields[inputField.propertyName], ""]; // if only elements are string, TO DO
                                    handleInputChange(inputField.propertyName, copy);
                                }}>PLUS</Button> }
                    {emptyFields.includes(inputField.propertyName) && (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: -20,
                                left: 0,
                                color: 'yellow',
                                fontSize: '12px',
                            }}
                        >
                            Required field
                        </div>
                    )}
                </div>
            ))}
            <Button
                variant='contained'
                size='small'
                onClick={handleAddProduct}
                disabled={emptyFields.length > 0}
            >
                Add Product
            </Button>
        </div>
    );
};

export default AddTab;