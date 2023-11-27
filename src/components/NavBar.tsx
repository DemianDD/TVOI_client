import React, { ChangeEvent, useContext, useState } from "react";
import {ReactComponent as CartIcon} from '../images/cart.svg';
import {ReactComponent as MenuIcon} from '../images/menu.svg';
import {ReactComponent as SearchIcon} from '../images/search.svg';
import {ReactComponent as CancelIcon} from '../images/cancel.svg';
import {ReactComponent as AdminIcon} from '../images/admin.svg';
import { NavLink, useNavigate } from "react-router-dom";
import translationService from "../services/translation.service";
import { getRoute } from "../services/routes.service";
import { CartContext } from "../context/cart-context";
import { ProductContext } from "../context/product-context";
import { Drawer } from "@mui/material";
import { categoriesRender } from "../route/productsCategoryRoutes";
import { UserContext } from "../context/user-context";

const SideBar = () => {
  const { authorized } = useContext(UserContext);
  const navigate = useNavigate();
  const className = (state:{isActive: boolean, isPending: boolean}) => {
    return "navItem " + (state.isActive ? "activeLink" : "");
  }

  const mainRoutes = categoriesRender.filter(category => category.path !== "sales");
  const sale = categoriesRender.find(category => category.path === 'sales');
  
  return (
    <div className="bg-[#111111] h-full w-[200px] grid grid-rows-3 justify-center py-3">
      <div className='flex justify-center'>
        <NavLink to={"/"}>
          <img src='logo_main.svg'/>
        </NavLink> 
      </div>
      <div>
        {sale && <NavLink className={className} to={getRoute(sale.path)} >{sale.title}</NavLink>}
        {mainRoutes.map((category, id) => (
          <NavLink className={className} to={getRoute(category.path)} key={id}>
            {translationService.translate(category.translationKey)}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center justify-center pt-5">
        {authorized ? <AdminIcon className="bg-[#252525] w-[40px] h-[40px] p-2 rounded-xl" onClick={() => {navigate(getRoute(`admin`))}} /> : <></>}
      </div>
    </div>
  );
};

export const NavBar = () => {
  const { cart, count } = useContext(CartContext);
  const { search, resetSearch } = useContext(ProductContext);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const getBackgroundColor = () => {
    if (count > 90) {
      return 'linear-gradient(45deg, orange, red)';
    } else if (count > 50) {
      return 'linear-gradient(45deg, yellow, red)';
    } else {
      return 'linear-gradient(45deg, yellow, orange)';
    }
  };

  const navigate = useNavigate();
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    navigate(getRoute(`search`));
    search(event.target.value);
  };
  const handleSearchClick = () => {
    setOpenSearch(true);
  };
  const cancelSearch = () => {
    resetSearch();
    setOpenSearch(false);
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate(getRoute(`search`))
  }

  return(
    <header>
        <div className="menuIconPos">
          <MenuIcon className="icon" onClick={() => setOpenSidebar(!openSidebar)} />
        </div>
          <Drawer open={openSidebar} onClose={() => setOpenSidebar(!openSidebar)}> 
            <SideBar/>
          </Drawer>
          {openSearch && <form role="search" className="searchBarPos" onSubmit={handleSubmit}>
          <CancelIcon className="icon positionRightAbsolute" onClick={cancelSearch}/> 
          <input 
            className="searchBar"
            type="text" 
            aria-label={translationService.translate("search|A")}
            placeholder={translationService.translate("search|A") + "..."}
            onChange = {handleSearch}/>
          </form>}

        <div className="logoPos">
          <div className="logoStyle" onClick ={() => {navigate(getRoute(``))}}>
            TVOI
          </div>
        </div>
        
        <div className="flex absolute right-5">
          
          <SearchIcon className="icon" onClick={handleSearchClick}/>
          <CartIcon className="icon" onClick={() => {navigate(getRoute(`cart`))}} />
          { cart.data.length > 0 && <><div className="cartIndicator"
            style={{ background: getBackgroundColor() }}/></>}
        </div>
    </header>
  );
}
