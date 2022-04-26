import './directory-item.styles.scss';
import {Category} from "../../models/category";

interface DirectoryItemProps {
  category: Category
}

const DirectoryItem = ({category}: DirectoryItemProps) => {
  const {title, imageUrl} = category;
  return (
    <div className={"directory-item-container"}>
      <div className={"background-image"} style={{
        backgroundImage: `url(${imageUrl})`
      }}/>
      <div className={"body"}>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
}

export default DirectoryItem
