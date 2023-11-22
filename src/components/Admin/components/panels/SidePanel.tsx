import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddTab from '../ActionTabs/AddTab';
import EditTab from '../ActionTabs/EditTab';
import DeleteTab from '../ActionTabs/DeleteTab';

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

const SidePanel = () => {
    const [value, setValue] = React.useState(0);
    return (
        <div className='w-[500px] bg-white flex flex-col items-center p-3 border-r-2 border-[#ccc]'>
            <div className='w-full'>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Add" icon={<AddBoxIcon />} />
                    <BottomNavigationAction label="Edit" icon={<EditIcon />} />
                    <BottomNavigationAction label="Delete" icon={<DeleteForeverIcon />} />
                </BottomNavigation>
            </div>
            <div className='w-full overflow-auto' style={{maxHeight: 'calc(100vh - 140px)'}}>
                {value === 0 && <AddTab inputFields={inputFields}/>}
                {value === 1 && <EditTab inputFields={inputFields}/>}
                {value === 2 && <DeleteTab />}
            </div>
        </div>
    )
}

export default SidePanel;