import React from "react";
import translationService, { translateText } from "../../../services/translation.service";

interface IProps {
    products: IProduct[];
}

export const ProductDescription = (props: IProps) => {

    const viewInfo = props.products.map((p, index) => {
        return(
          <div key={index} className='prTextDesc' >
            <div>
                <div className="text-base text-[#8c8c8c]">{translationService.translate("brand|A")}</div>
                {p.brand}
            </div>

            <div>
                <div className="text-base text-[#8c8c8c]">{translationService.translate("metal|A")}</div>
                {translateText(p.metal)}
            </div>

            <div>
                <div className="text-base text-[#8c8c8c]">{translationService.translate("weight|A")}</div>
                {p.weight} г
            </div>

            {p.description.length > 10 ? <div >
                <div className="text-base text-[#8c8c8c]">{translationService.translate("desc|A")}</div>
                {translateText(p.description)}
            </div> : <></>}
            <div>
                <div className="text-base text-[#8c8c8c]">{translationService.translate("package|A")}</div>
                {translateText(p.packaging)}
            </div>
          </div>
        )
    })

    return(
        <div>
            {viewInfo}
        </div>
    );
}

