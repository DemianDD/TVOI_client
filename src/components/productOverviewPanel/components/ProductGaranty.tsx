import React from "react";
import translationService, { translateText } from "../../../services/translation.service";
import useWindowSize from "../../../hooks/UseWindowSize";

const connect = [
    {
        id: 1,
        target: '_blank',
        image: 'icons/insta.svg',
        href: 'https://www.instagram.com/love.tvoi/?igshid=YmMyMTA2M2Y%3D'
    },
    {
        id: 2,
        target: '_blank',
        image: 'icons/telegram.png',
        href: 'https://telegram.me/tvoiwatch'
    },
]

export const ProductGaranty = () => {
    let size = useWindowSize();
    const isMobile = size.width < 770;
    return(
        <div className="prTextDesc">
            <div>{translationService.translate("garantyInfo|A")}</div>
            {isMobile ? <></> : <div className="mt-3 w-full flex items-start flex-col">
                <span >{translateText('questions|A')}? {translateText('write us|A')}:</span>
                <div className="flex flex-row gap-1 w-full">
                    {connect.map((c, id) => {
                        return(
                            <a href={c.href} target={c.target} key={id} className="flex items-center"><img src={c.image} className={`w-[25px] mx-1`}/></a>
                        )
                    })}
                </div>
            </div>}
        </div>
    );
}