import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';

const RenderTextField = (inputField, id, value, onChange, isPartOfArray, index, handleDelete) => {
    return (
        <div className='flex justify-between items-center gap-2'>
            <TextField
                key={id}
                size="small"
                style={{ width: '100%', margin: '5px 0' }}
                type={inputField.type}
                label={inputField.placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {isPartOfArray && (
                <Button 
                    color='error'
                    variant='contained'
                    onClick={() => handleDelete(inputField.propertyName, index)}
                    style={{width: '10%'}}
                >
                    <DeleteIcon/>
                </Button>
            )}
        </div>
    );
}

export default RenderTextField;