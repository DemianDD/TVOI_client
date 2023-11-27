import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const tips = [
    {
        id: 1,
        title: 'Мрррр... додай понад 3 товари у корзину та отримай додаткові 5% знижки.',
        image: 'animals/cat.png'
    }, {
        id: 3,
        title: 'Замовляй товар зараз - оплачуй на пошті. Безпека в інтернеті перш за все!',
        image: 'animals/bear.png'
    }, {
        id: 4,
        title: 'Не забудь обрати розмір та колір, щоб ми знали, що тобі пакувати!',
        image: 'animals/pig.png'
    }, {
        id: 5,
        title: 'Вжжжуууххх. Вперед за шопінгооом. Покажемо йому, де раки зимують!',
        image: 'animals/cat_tea.png'
    }, {
        id: 6,
        title: 'Ці лапки тут, щоб тобі допомогти....Раптом заблукаєш.',
        image: 'animals/cat_cute.png'
    }, {
        id: 7,
        title: 'Цейвот..Хочеш такі модні окуляри як в мене? - тобі в "аксесуари".',
        image: 'animals/cat_cool.png'
    },
];

type Tip = {
    id: number;
    title: string;
    image: string;
};

const Tips = () => {
    const [randomTip, setRandomTip] = useState<Tip | null>(null);

    const selectRandomTip = () => {
        const randomIndex = Math.floor(Math.random() * tips.length);
        const selectedTip = tips[randomIndex];
        setRandomTip(selectedTip);
    };

    useEffect(() => {
        selectRandomTip();
    }, []);

    const handleTipClick = () => {
        selectRandomTip();
    };

    if (!randomTip) {
        return null;
    }

    return (
        <div className='bg-white w-full pb-4 flex justify-center relative'>
            <div onClick={handleTipClick} className='cursor-pointer'>
                <div className='pt-3'>
                    <LazyLoadImage src={randomTip.image} className='2xl:w-[250px] w-[200px] hover:drop-shadow-2xl duration-150' effect="blur" PlaceholderSrc="defaults/logoclear.png"/>
                </div>
                <div
                    key={randomTip.id}
                    className="absolute bottom-5 left-0 w-full text-center bg-white text-medium lg:text-base text-sm gilroy flex items-center p-2 px-4 rounded-3xl text-[#919191] shadow-[#ccc] shadow-xl"
                >
                    {randomTip.title}
                </div>
            </div>
        </div>
    );
};

export default Tips;
