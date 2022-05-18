import {Route, Routes} from "react-router-dom";
import {useEffect} from "react";
import './shop.styles.scss';
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {fetchCategoriesAsync} from "../../store/categories/category.action";
import {useAppDispatch} from "../../store/store";

const Shop = () => {
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(fetchCategoriesAsync());
  }, [])
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path={":category"} element={<Category />} />
    </Routes>
  );
};

export default Shop;
