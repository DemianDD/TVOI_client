import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { categoriesRender } from "../../../../../route/productsCategoryRoutes";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const AddManually = ({handleSelectChange, category, inputFields, renderInputField, productFields, handleInputChange, handleAddProduct}) => {
    return(
        <>
            <InputLabel id="category">Select Category</InputLabel>
            <Select
                size="small"
                style={{ width: '100%', margin: '5px 0px' }}
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
                        <>
                            <Button onClick={() => {
                                let copy = [...productFields[inputField.propertyName], ""];
                                handleInputChange(inputField.propertyName, copy);
                            }}><AddCircleIcon/></Button>
                        </>
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
        </>
    )
}

export default AddManually