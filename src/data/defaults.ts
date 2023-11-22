export const defaultNumber = 0;
export const defaultText = "...";

export const defaultImage: string = "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg";

export const defaultRealPhoto: string = "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg";

export const defaultColor: string = defaultText;

export const defaultSize: string = defaultText;

export const defaultProduct: IProduct = {
    id: defaultText,
    count:  defaultNumber,
    collection: defaultText,
    category: defaultText,
    labelName: defaultText,
    brand: defaultText,
    price: defaultNumber,
    salePrice: defaultNumber,
    images: [defaultImage],
    weight: defaultNumber,
    colors: [defaultColor],
    metal: defaultText,
    sizes: [defaultSize],
    description: defaultText,
    popularity: defaultNumber,
    customPopularity: defaultNumber,
    packaging: defaultText,
    realPhotos: [defaultRealPhoto]
}