import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import './custom.css'
import ProductList from './pages/ProductList';
import { NavBar } from './components/NavBar';
import { productCategoryRoutes, routes } from './route/productsCategoryRoutes';
import { ToastrList } from './components/toastr/ToastrList';
import { isPrimitive } from './services/object.service';
import IItem from './components/nestedSelect/item';
import { comparePorductsPropertyToValue, getFilterCriteriaBasedOnProducts } from './services/filter.service';
import ServiceLayer from './components/ServiceLayer';
import { SortOrder } from './data/sortCriteria';
import ScrollToTop from './components/scroller/ScrollToTop';
import translationService from './services/translation.service';
import Spinner from './components/loading/Spinner';
import Admin from './components/Admin/Admin';

//const productsFn = (products: IProduct[]) => products;

export default function App() {
  //const { products, data } = useContext(ProductContext);
  //const [filteredProducts, setFilteredProducts] = React.useState<((products: IProduct[]) => IProduct[])[]>([productsFn, productsFn]);
  //const [filterCriteria, setFilterCriteria] = React.useState<IItem[]>([]);
  //
  //useEffect(() => {
  //  setFilterCriteria(getFilterCriteriaBasedOnProducts(data));
  //}, []);
//
  //const getFilteredProducts = (prod: IProduct[]) => {
  //  filteredProducts.forEach(fn => prod = fn(prod));
  //  return prod;
  //}
  //const sortBy = (property: string, sortOrder: SortOrder) => {
  //  if (products.length === 0) return;
//
  //  if (!isPrimitive(products[0][property])) {
  //    // TO DO make for objects
  //    return;
  //  }
  //  
  //  const sortFn = (a: any, b: any) => {
  //    const valueA = property === "salePrice" ? a.salePrice : a[property];
  //    const valueB = property === "salePrice" ? b.salePrice : b[property];
  //
  //    if (valueA > valueB) {
  //      return sortOrder === SortOrder.Descending ? -1 : 1;
  //    }
  //    if (valueB > valueA) {
  //      return sortOrder === SortOrder.Descending ? 1 : -1;
  //    }
  //    return 0;
  //  };
//
  //  setFilteredProducts([filteredProducts[0], (prod) => [...prod].sort((a: any, b: any) => {
  //    if (sortOrder === SortOrder.Ascending) {
  //      return sortFn(a, b);
  //    }
  //    return sortFn(a, b) * -1;
  //  })]);
  //}
//
  //const filterBy = (value: any, property: string) => {
  //  setFilteredProducts([(prod) => [...prod].filter(o => comparePorductsPropertyToValue(o, value, property)), filteredProducts[1]]);
  //}
//
  //const resetFilter = () => {
    //setFilteredProducts([productsFn, productsFn]);
  //}
  
  return (
    <div className='App'>
      <ToastrList/>
      <BrowserRouter>
        <ScrollToTop>
          <NavBar/>
          <main>
            <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path='/:lang' element={<ServiceLayer />}>
                {routes.map((route, index) => {
                  return <Route path={route.path} element={<route.element/>} key={index}/>
                })}
                {productCategoryRoutes.map((pcr, index) => (
                  <Route key={index} path={pcr.path} element={
                    <ProductList 
                      title={pcr.title} 
                      header={pcr.header}
                      category={pcr.category} 
                    />} 
                  />
                ))}
                <Route path='uk' element={<Home/>} />
                <Route path='admin' element={<Admin/>} />
              </Route>
              <Route path='*' element={<Navigate to={`/${translationService.getPrefferedLanguageOrDefault('uk')}`} />}/>
            </Routes>
            </Suspense>
          </main>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  )
}

