import IItem from "../components/nestedSelect/item";
import { getPropertyFromObject } from "./object.service";
import translationService from "./translation.service";

export function getFilterCriteriaBasedOnProducts(products: IProduct[]): IItem[] {
    const metalItems: IItem = { Title: translationService.translate("filter metal|A"), Value: "metal", Items: [] };
    const colorItems: IItem = { Title: translationService.translate("filter color|A"), Value: "colors", Items: [] };
    const brandItems: IItem = { Title: translationService.translate("filter brand|A"), Value: "brand", Items: [] };
  
    products.forEach(p => {
      if (metalItems.Items!.findIndex(i => i.Title === p.metal) === -1) {
        metalItems.Items?.push({ Title: p.metal, Value: p.metal });
      }
      
      if (p.colors) {
        p.colors.forEach(c => {
          if (colorItems.Items!.findIndex(i => i.Title === c) === -1) {
            colorItems.Items?.push({ Title: c, Value: c, Path: "name" });
          }
        });
      }
  
      if (brandItems.Items!.findIndex(i => i.Title === p.brand) === -1) {
        brandItems.Items?.push({ Title: p.brand, Value: p.brand });
      }
    });
  
    return [brandItems, metalItems, colorItems];
  }

export function comparePorductsPropertyToValue(product: IProduct, value: any, propertyPath: string) {
    var property = getPropertyFromObject(product, propertyPath);
    
    if (Array.isArray(property)) {
        return property.some(p => p === value);
    }

    return property === value;
}