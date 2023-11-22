import * as React from 'react';
import '../../../styles/photos.css'
import Slider from '../../slider/Slider';
import useWindowSize from '../../../hooks/UseWindowSize';
import ProductInfoSlider from '../../slider/ProductInfoSlider';

interface IProps {
    photos: IRealPhoto[];
    close: () => void;
}

export const Photos = (props: IProps) => {
    const [realPhotos, setRealPhotos] = React.useState(props.photos);
    let size = useWindowSize();
    const isMobile = size.width < 770

    React.useEffect(() => {
        setRealPhotos([...props.photos]);
    }, [props.photos]);

    return(
        <div className='photo-container'>
            <button className='photo-btn-close' onClick={props.close}><img src='icons/close.svg'/></button>
            <div className='photo-element'>
                
                {isMobile 
                    ? <div className='w-full'><Slider photos={props.photos} isBorderRounded={true}/> </div>
                    : <ProductInfoSlider images={props.photos}/>
                }
            </div>
        </div>
    )
}


