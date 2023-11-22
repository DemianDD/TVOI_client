import * as React from 'react';
import Spinner from '../../loading/Spinner';
import {Image} from "@nextui-org/react";

interface IProps {
  images: IImage[];
  behaviour: ImageBehaviour;
}

export enum ImageBehaviour {
    Unknown,
    Single,
    Multiple
}

export const Images = (props: IProps) => {
    const [images, setImages] = React.useState(props.images);

    React.useEffect(() => {
        if (props.images) {
            setImages([...props.images]);
        }
    }, [props.images]);

    const selectMain = (id: number) => {
        setImages([images[id], ...images.slice(0, id), ...images.slice(id + 1)]);
    }
    
    if (!props.images || props.images.length === 0 || props.behaviour === ImageBehaviour.Unknown) return <div></div>;

    if (props.behaviour === ImageBehaviour.Multiple) {
        return MultipleImages(images, selectMain);
    }

    return SingleImage(images[0]);
};

const MultipleImages = (images: IImage[], select: (id: number) => void) => {
    const firstImage = images[0].url;
    const imageList = images.slice(1, 4).map((i, id) => (
        <img key={id} src={i.url}/>
    ))

    return(
        <div>
            <div className="prImg">
            <div className='grid grid-cols-2 gap-5 mb-3'>
                {images.slice(0, 4).map((i, id) => (
                    <img key={id} className='w-full h-full' src={i.url} onClick={() => select(id + 1)}/>
                ))}
            </div>
        </div>
        </div>
    )
}

const SingleImage = (image: IImage) => {
    const [isLoading, setIsLoading] = React.useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };
    return (
        <div className='w-full'>
            {isLoading && <div className='h-full flex justify-center items-center'><Spinner/></div>}
            <img 
                src={image.url}
                className='w-full'
                onLoad={handleImageLoad}
                style={{borderRadius: '6px 6px 0px 0px'}}
            />
        </div>
    )
}

