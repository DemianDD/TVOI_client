import * as React from 'react';
import { useEffect } from 'react';
import CardProducts from '../components/productsView/CardProduct';
import { Helmet } from 'react-helmet';
import { FadeIn } from 'react-slide-fade-in';
import { ProductContext } from '../context/product-context';
import { FilterContext } from '../context/filter-context';
import '../styles/filterPanel.css'
import { createCollection } from '../data/collections';
import { translateText } from '../services/translation.service';

interface IProps {
  category: string;
  title: string;
  header: string;
}

const ProductList = (props: IProps) => {
  const { products } = React.useContext(ProductContext);
  const { sortByPriceAscending, sortByPriceDescending, sortByPopularity, sortByRandom } = React.useContext(FilterContext);
  const [categoryProducts, setCategoryProducts] = React.useState<IProduct[]>([]);

  const handleSorting = (buttonValue) => {
    if (buttonValue === 'priceUp') {
      const sortedProducts = sortByPriceAscending(categoryProducts);
      setCategoryProducts(sortedProducts);
    } else if (buttonValue === 'priceDown') {
      const sortedProducts = sortByPriceDescending(categoryProducts);
      setCategoryProducts(sortedProducts);
    } else if (buttonValue === 'popularity') {
      const sortedProducts = sortByPopularity(categoryProducts);
      setCategoryProducts(sortedProducts);
    }else if (buttonValue === 'random') {
      const sortedProducts = sortByRandom(categoryProducts);
      setCategoryProducts(sortedProducts);
    }
  };

  const FilterPanel = () => {
    return (
      <div className='filter-panel-container'>
        <div className='filter-panel-element'>
          <button value="random" onClick={() => handleSorting('random')}>
            {translateText(('sort random|A'))}
          </button>
          <button value="priceUp" onClick={() => handleSorting('priceUp')}>
            {translateText(('sort price Up|A'))}
          </button>
          <button value="priceDown" onClick={() => handleSorting('priceDown')}>
            {translateText(('sort price Down|A'))}
          </button>
          <button value="popularity" onClick={() => handleSorting('popularity')}>
            {translateText(('sort popularity|A'))}
          </button>
        </div>
      </div>
    );
  };
  
  useEffect(() => {
    let filteredProducts: IProduct[] = [];
    if (props.category === 'sales') {
      filteredProducts = products.filter((p) => p.salePrice > 0);
    } else if(props.category === 'collection'){
      filteredProducts = createCollection(products, 'Pandora', '');
    } else {
      filteredProducts = products.filter((p) => p.category === props.category);
    }
    setCategoryProducts(filteredProducts);
  }, [products, props.category]);
  
  return(
    <div className='page-container'>
      <FadeIn 
        from="bottom"
        positionOffset={600}
        triggerOffset={0}
        delayInMilliseconds={-700}>
      <Helmet>
        <title>{props.header}</title>
      </Helmet>
      <div className="simItemPos">
        <div className="simItemStyle">
          {props.title}
        </div>
        <FilterPanel/>
      </div>
      <CardProducts products = {categoryProducts} style='productView'/>
      </FadeIn>
    </div>
  )
};

export default ProductList;

