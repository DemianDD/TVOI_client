import React from 'react'
import { ProductContext } from '../../../../context/product-context';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const DeleteTab = () => {
    const [query, setQuery] = React.useState(0);
    const {deleteAllProducts, deleteProduct} = React.useContext(ProductContext);
    const [modalWindow, setModalWindow] = React.useState(false);
    const handleOpen = () => setModalWindow(true);
    const handleClose = () => setModalWindow(false);

    const HandleYes = () => {
        deleteAllProducts();
        handleClose();
    }

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
                            <Button variant="contained" color='error' onClick={HandleYes}>Yes</Button>
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
                type='number'
                size="small"
                style={{width: '100%', marginTop: 5, marginBottom: 5, color: 'black'}}
                variant="outlined"
                placeholder='Enter Product Id'
                onChange={(e) => setQuery(Number(e.target.value))}
            />
            <Button variant="outlined" color='error' onClick={() => deleteProduct(query)}>Delete</Button>
            <div className='m-2 text-lg text-[#7c7c7c]'>Or</div>
            <Button variant="contained" color='error' onClick={handleOpen}>Delete All Products</Button>
            {modalWindow && <ModalWindow/>}
        </div>
    )
}

export default DeleteTab;