import React from 'react'
import TextField from '@mui/material/TextField';
import { UserContext } from '../context/user-context';
import { ProductContext } from '../context/product-context';
import { Button } from '@mui/material';
import EditPanel from '../components/windows/EditPanel';
import { disableBodyScroll } from "body-scroll-lock";

const Admin = () => {
    const {authorized, setAuthorized} = React.useContext(UserContext);
    const {postProduct, deleteAllProducts} = React.useContext(ProductContext);
    const [key, setKey] = React.useState('');
    const [editPanel, setEditPanel] = React.useState(false);
    var secretKey = process.env.REACT_APP_SC_KEY;

    const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKey(event.target.value);
    };

    const handleEditPanel = () => {
        setEditPanel(!editPanel);
    }

    const handleAuthorization = (e: any) => {
        e.preventDefault();
        if (key === secretKey) {
            setAuthorized(true);
            localStorage.setItem('authorized', 'true');
        } else {
            setAuthorized(false);
        }
    };

    React.useEffect(() => {
        if (localStorage.getItem('authorized') === 'true') {
            setAuthorized(true);
        }
    }, []);

    return (
        <div className='page-container'>
            <div className='w-full flex justify-center items-center' style={{height: 'calc(100vh - 65px)'}}>
                <div className='flex flex-col w-full items-center'>
                    {!authorized ? <form onSubmit={handleAuthorization}>
                        <TextField 
                            id="key" 
                            label="Enter key" 
                            variant="outlined" 
                            type='password'
                            value={key}
                            onChange={handleKeyChange}
                        />
                    </form> 
                    : 
                    <div className='flex flex-col items-center space-y-5'>
                        <div className='text-green-500 text-sm'>
                            Authorized successfully
                        </div>
                        <div className='flex items-center gap-5'>
                            <button className="bg-blue-300 w-[100px] h-[45px] rounded-lg text-white" onClick={handleEditPanel}>
                                Open Panel
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
            {editPanel && authorized && (
                <EditPanel onCancel={handleEditPanel} />
            )}
        </div>
    )
}

export default Admin