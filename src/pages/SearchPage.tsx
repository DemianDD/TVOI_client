import React, { useEffect } from 'react';
import { FooterPanel } from '../components/FooterPanel';
import IItem from '../components/nestedSelect/item';
import CardProducts from '../components/productsView/CardProduct';
import { SortOrder } from '../data/sortCriteria';
import { Helmet } from 'react-helmet';
import { FadeIn } from 'react-slide-fade-in';
import { ProductContext } from '../context/product-context';

interface IProps {
    //sortBy: (property: string, sortOrder: SortOrder) => void;
    //filterBy: (value: any, property: string) => void;
    //filterCriteria: IItem[];
    //resetFilter: () => void;
}

const SearchPage = (props: IProps) => {
    const {searchedProducts} = React.useContext(ProductContext);

    //useEffect(() => { 
        //return () => {props.resetFilter()}
    //}, [])
    return(
        <div className='page-container'>
            <FadeIn 
                from="bottom"
                positionOffset={600}
                triggerOffset={0}
                delayInMilliseconds={-800}>
            <Helmet>
                <title>Каталог: стильні ювелірні вироби, елегантні недорогі годинники, дешеві | TVOI</title>
            </Helmet>
            <CardProducts products = {searchedProducts} style='productView'/>
            <FooterPanel/>
            </FadeIn>
        </div>
    );
}

export default SearchPage;
