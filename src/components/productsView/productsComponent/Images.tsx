import * as React from 'react';
import Spinner from '../../loading/Spinner';
import {Image} from "@nextui-org/react";

interface IProps {
    images: (string | { url: string })[];
    behaviour: ImageBehaviour;
}

export enum ImageBehaviour {
    Unknown,
    Single,
    Multiple
}

export const Images = (props: IProps) => {
    const [images, setImages] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (props.images) {
            const processedImages = props.images.map(image => 
                typeof image === 'string' ? image : image.url
            );
            setImages(processedImages);
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

const MultipleImages = (images: string[], select: (id: number) => void) => {
    const firstImage = images[0];
    const imageList = images.slice(1, 4).map((i, id) => (
        <img key={id} src={i}/>
    ))

    return(
        <div>
            <div className="prImg">
            <div className='grid grid-cols-2 gap-5 mb-3'>
                {images.slice(0, 4).map((i, id) => (
                    <img key={id} className='w-full h-full' src={i} onClick={() => select(id + 1)}/>
                ))}
            </div>
        </div>
        </div>
    )
}

const SingleImage = (image: string) => {
    const [isLoading, setIsLoading] = React.useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };
    return (
        <div className='w-full'>
            {isLoading && <div className='h-[200px] flex justify-center items-center'><Spinner/></div>}
            <img 
                src={image}
                className='w-full'
                onLoad={handleImageLoad}
                style={{borderRadius: '6px 6px 0px 0px'}}
            />
        </div>
    )
}

