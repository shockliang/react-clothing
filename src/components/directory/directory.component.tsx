import DirectoryItem from "../directory-item/directory-item.component";
import {Category} from "../../models/category";
import "./directory.styles.scss";

interface DirectoryProps {
  categories: Category[]
}

const Directory = ({categories}: DirectoryProps) => {
  return (
    <div className={"directory-container"}>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category}/>
      ))}
    </div>
  )
}

export default Directory;
