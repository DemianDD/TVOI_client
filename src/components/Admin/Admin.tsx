import React from 'react'
import TextField from '@mui/material/TextField';
import { UserContext } from '../../context/user-context';
import SidePanel from './SidePanel';

const Admin = () => {
    const {authorized, setAuthorized} = React.useContext(UserContext);
    const [key, setKey] = React.useState('');

    const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKey(event.target.value);
    };

    const handleAuthorization = (e: any) => {
        e.preventDefault();
        if (key === process.env.REACT_APP_SC_KEY) {
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
                    <div>
                        <SidePanel/>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Admin