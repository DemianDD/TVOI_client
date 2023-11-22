import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoute } from '../../services/routes.service';
import translationService from '../../services/translation.service';
import { categoriesRender } from '../../route/productsCategoryRoutes';
import useWindowSize from '../../hooks/UseWindowSize';

const CategoryItem = ({ route, translationKey, imageUrl }) => {
  const navigate = useNavigate();
  let size = useWindowSize();
  const isMobile = size.width < 620

  const handleClick = () => {
    navigate(getRoute(route));
  };

  return (
    <div className={`${isMobile && (translationKey === 'bracelet|A' || translationKey === 'charm|A') ? '!w-[160px] !h-[160px]' : ''} logoCategory`} onClick={handleClick}>
      <div className="txtCategory">{translationService.translate(translationKey)}</div>
      <img className={`${isMobile && (translationKey === 'bracelet|A' || translationKey === 'charm|A') ? '!w-[160px] !h-[160px]' : ''} photoCategory`} src={imageUrl} alt={translationKey} />
    </div>
  );
};

const Categories = () => {
  return (
    <div className="categoriesStylePos">
      {categoriesRender.map((category) => (
        <CategoryItem
          key={category.path}
          route={category.path}
          translationKey={category.translationKey}
          imageUrl={category.imageUrl}
        />
      ))}
    </div>
  );
};

export default Categories;