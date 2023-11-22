import React from "react";
import translationService from "../../../services/translation.service";

export const ProductDelivery = () => {
    return(
        <div className="prTextDesc">
            <div>{translationService.translate("deliveryInfo|A")}</div>
            <div>
                <div className="text-base text-[#8c8c8c]">{translationService.translate("pay|A")}</div>
                <div>{translationService.translate("payingInfo|A")}</div>
            </div>
        </div>
    );
}