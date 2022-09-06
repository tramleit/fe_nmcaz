import { PostDataType } from "data/types";
import React, { FC } from "react";
import Badge from "components/Badge/Badge";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories: string;
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  categories,
}) => {
  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      {/* {categories.map((item, index) => ( */}
      <Badge
        className={itemClass}
        // key={index}
        name={"Trending"}
        href={"#"}
        color={"blue"}
      />
      {/* ))} */}
    </div>
  );
};

export default CategoryBadgeList;
