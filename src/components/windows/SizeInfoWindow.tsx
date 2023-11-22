import React, { useEffect, useState } from "react";
import translationService, { translateText } from "../../services/translation.service";
import OutsideAlerter from "../helpers/Outside";
import {ReactComponent as CloseIcon} from '../../images/close.svg';
import { productCategoryRoutes } from "../../route/productsCategoryRoutes";

interface IProps {
    onCancel: () => void;
    isOpen: boolean;
}

const size_helper = [
    {
        name: 'bracelets',
        howTo: translateText('insctruction bracelet|A')
    },
    {
        name: 'rings',
        howTo: translateText('dimensional grid|A') + ' 52 - 16, 54 - 17, 56 - 17,5'
    },
]

const renderSize = productCategoryRoutes.map((category) => {
    const matchingSize = size_helper.find((size) => size.name === category.category);
    return {
        ...category,
        howTo: matchingSize ? matchingSize.howTo : '',
    };
}).filter(item => item.howTo !== '');

export const SizeInfoWindow = ({onCancel, isOpen}:IProps) => {
    return(
        <OutsideAlerter onOutsideClick={onCancel}>
            <div className='panelStyle'>
                <div className="text-[#6a6a6a] py-2 px-3 rounded-3xl mb-3 bg-[#f2f2f2]">{translateText('right size|A')}:</div>

                <div className="w-full flex flex-wrap p-3 border border-[#f2f2f2] rounded-xl mb-3">
                    {renderSize.map((option, index) => {
                        return(
                            <div className="bg-[#f2f2f2] py-2 px-4 rounded-md text-sm m-1 w-full" key={index}>
                                <div className="font-[600]">{option.title}</div>
                                <div>{option.howTo}</div>
                            </div>
                        )
                    })}
                </div>

                <div className="bg-[#e6e6e6] rounded-full p-1 cursor-pointer hover:bg-[#ccc] duration-300" onClick={onCancel}><CloseIcon className="w-[30px]"/></div>
            </div>
        </OutsideAlerter>
    )
}