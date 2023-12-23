import React from 'react'
import TextField from '@mui/material/TextField';
import { UserContext } from '../../context/user-context';
import SidePanel from './components/panels/SidePanel';
import ControlPanel from './components/panels/ControlPanel';

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
            <div className='w-full' style={{height: 'calc(100vh - 65px)'}}>
                {!authorized ? 
                <div className='flex items-center justify-center'>
                    <form onSubmit={handleAuthorization}>
                        <TextField 
                            id="key" 
                            label="Enter key" 
                            variant="outlined" 
                            type='password'
                            value={key}
                            onChange={handleKeyChange}
                        />
                    </form> 
                </div>
                : 
                <div className=''>
                    <div className='fixed left-0 top-[50px] z-10'><SidePanel/></div>
                    <div className='fixed left-[500px] top-[50px] h-full' style={{width: 'calc(100vw - 500px)'}}><ControlPanel/></div>
                </div>}
            </div>
        </div>
    )
}

export default Admin