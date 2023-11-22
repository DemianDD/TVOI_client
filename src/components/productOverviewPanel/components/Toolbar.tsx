import React, { useEffect, useState } from "react";
import { ProductDelivery } from "./ProductDelivery";
import { ProductDescription } from "./ProductDescription";
import "../Toolbar.css"
import translationService from "../../../services/translation.service";
import { ProductGaranty } from "./ProductGaranty";
import { defaultProduct } from "../../../data/defaults";
import { useParams } from "react-router-dom";
import useWindowSize from "../../../hooks/UseWindowSize";
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';

interface IOverviewPanel {
  button?: React.ReactNode;
  panel: React.ReactNode;
  icon: JSX.Element;
}

interface IProps {
  products: IProduct[];
}

export const Toolbar = (props: IProps) => {
  let size = useWindowSize();
  const isMobile = size.width < 620
  const [openedPanel, setOpenPanel] = useState<number | null>(null);
  const [productItemDesc, setProductItemDesc] = useState<IProduct>(defaultProduct);
  const [productsDesc, setProductsDesc] = useState<IProduct[]>([]);
  let {id} = useParams<any>();

  const panels: IOverviewPanel[] = [{
    panel: <ProductDescription products={productsDesc}/>,
    button: translationService.translate("details|A"),
    icon: <SettingsIcon/>
  },{
    panel: <ProductDelivery/>,
    button: translationService.translate("delv|A"),
    icon: <LocalShippingIcon/>
  },{
    panel: <ProductGaranty/>,
    button: translationService.translate("warranty|A"),
    icon: <DoneAllIcon/>
  }];
  const prodDesc = props.products.find(e => e.id === id) ?? defaultProduct;
  useEffect(() => {
    const desc = props.products.filter(e => e.id === id) ?? defaultProduct;
    setProductItemDesc(prodDesc);
    setProductsDesc(desc);
  }, [id, prodDesc]);

  const togglePanel = (id: number) => {
    if (openedPanel === id) {
      setOpenPanel(null);
    } else {
      setOpenPanel(id); 
    }
  };

  return(
    <div className="toolbarPosition">
      <div className="toolbarStyle" key={id}>
        {panels.filter(v => v.button).map((p: IOverviewPanel, index: number) => (
          <div className="toolbarBtn flex items-center bg-blue-50 text-blue-400" key={index} onClick={() => togglePanel(index)}>
            <span className="pr-1">{p.icon}</span>
            {p.button}
          </div>
        ))}
      </div>
      {panels.map((p: IOverviewPanel, id: number) => id === openedPanel && p.panel)}
    </div>
  );
}
