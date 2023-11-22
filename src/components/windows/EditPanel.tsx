import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ProductContext } from '../../context/product-context';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import toastrService from '../../services/toastr.service';

interface IProps {
    onCancel: () => void;
}

const inputFields = [
    { type: 'text', propertyName: 'labelName', placeholder: 'Label Name' },
    { type: 'number', propertyName: 'price', placeholder: 'Price' },
    { type: 'number', propertyName: 'salePrice', placeholder: 'Sale Price' },
    { type: 'text', propertyName: 'category', placeholder: 'Category' },
    { type: 'text', propertyName: 'brand', placeholder: 'Brand' },
    { type: 'text', propertyName: 'collection', placeholder: 'Collection' },
    { type: 'text', propertyName: 'metal', placeholder: 'Metal' },
    { type: 'number', propertyName: 'weight', placeholder: 'Weight' },
    { type: 'number', propertyName: 'count', placeholder: 'Count' },
    { type: 'number', propertyName: 'popularity', placeholder: 'Popularity' },
    { type: 'number', propertyName: 'customPopularity', placeholder: 'Custom Popularity' },
    { type: 'text', propertyName: 'description', placeholder: 'Description' },
    { type: 'text', propertyName: 'packaging', placeholder: 'Packaging' },
    { type: 'text', propertyName: 'images', placeholder: 'Images', isArray: true },
    { type: 'text', propertyName: 'colors', placeholder: 'Colors', isArray: true },
    { type: 'text', propertyName: 'sizes', placeholder: 'Sizes', isArray: true },
    { type: 'text', propertyName: 'realPhotos', placeholder: 'Real Photos', isArray: true },
];

const AddWindow = () => {
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
    console.log(productFields)
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

const EditWindow = () => {
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

const DeleteWindow = () => {
    const {deleteAllProducts} = React.useContext(ProductContext);
    const [modalWindow, setModalWindow] = React.useState(false);
    const handleOpen = () => setModalWindow(true);
    const handleClose = () => setModalWindow(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#111111',
        boxShadow: 24,
        p: 4,
    };

    const ModalWindow = () => {
        return(
            <div>
                <Modal
                    open={modalWindow}
                >
                    <Box sx={style}>
                        <div className='text-white text-lg text-center pb-3'>
                            Are you sure you want to delete all products?
                        </div>
                        <div className='flex items-center justify-between gap-3'>
                            <Button variant="contained" color='error' onClick={deleteAllProducts}>Yes</Button>
                            <Button variant="outlined" color='primary' onClick={handleClose}>No</Button>
                        </div>  
                    </Box>
                </Modal>
            </div>
        )
    }
    
    return(
        <div className='flex flex-col items-center'>
            <div className='m-2 text-lg text-[#7c7c7c]'>Delete product by ID</div>
            <TextField 
                size="small"
                style={{width: '100%', marginTop: 5, marginBottom: 5, color: 'black'}}
                variant="outlined"
                placeholder='Enter Product Id'
            />
            <Button variant="outlined" color='error'>Delete</Button>
            <div className='m-2 text-lg text-[#7c7c7c]'>Or</div>
            <Button variant="contained" color='error' onClick={handleOpen}>Delete All Products</Button>
            {modalWindow && <ModalWindow/>}
        </div>
    )
}

const EditPanel = (props: IProps) => {
    const [value, setValue] = React.useState(1);
    return (
        <div className='panelStyle'>
            <div className='w-full border-b border-[#ccc]'>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction icon={<ArrowBackIosNewIcon color='primary' />} onClick={props.onCancel}/>
                    <BottomNavigationAction label="Add" icon={<AddBoxIcon />} />
                    <BottomNavigationAction label="Edit" icon={<EditIcon />} />
                    <BottomNavigationAction label="Delete" icon={<DeleteForeverIcon />} />
                </BottomNavigation>
            </div>
            <div className='w-full flex-1 overflow-auto'>
                {value === 1 && <AddWindow />}
                {value === 2 && <EditWindow />}
                {value === 3 && <DeleteWindow />}
            </div>
        </div>
    )
}

export default EditPanel