import {useNavigate} from "react-router-dom";
import './directory-item.styles';
import {Category} from "../../models/category";
import {BackgroundImage, DirectoryItemContainer, Body} from "./directory-item.styles";

interface DirectoryItemProps {
  category: Category
}

const DirectoryItem = ({category}: DirectoryItemProps) => {
  const {title, imageUrl, route} = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl}/>
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem
