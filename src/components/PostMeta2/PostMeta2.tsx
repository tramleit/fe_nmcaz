import React, { FC } from "react";
import Avatar from "components/Avatar/Avatar";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import { IVideoAuthor } from "interface/interface";

export interface PostMeta2Props {
  className?: string;
  meta: IVideoAuthor;
  hiddenCategories?: boolean;
  size?: "large" | "normal";
  avatarRounded?: string;
}

const PostMeta2: FC<PostMeta2Props> = ({
  className = "leading-none",
  meta,
  hiddenCategories = false,
  size = "normal",
  avatarRounded,
}) => {
  // const { date, author, categories, readingTime } = meta;
  return (
    <div
      className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${size === "normal" ? "text-xs" : "text-sm"
        } ${className}`}
      data-nc-id="PostMeta2"
    >
      <Link to={`models/${meta.username}`} className="flex items-center space-x-2">
        <Avatar
          radius={avatarRounded}
          sizeClass={
            size === "normal"
              ? "h-6 w-6 text-sm"
              : "h-10 w-10 sm:h-11 sm:w-11 text-xl"
          }
          imgUrl={meta.picture}
          userName={meta.username}
        />
      </Link>
      <div className="ml-3">
        <div className="flex items-center">
          <Link to={`models/${meta.username}`} className="block font-semibold">
            {meta.fullName}
          </Link>
        </div>
        <div className="text-xs mt-[6px]">
          <span className="text-neutral-700 dark:text-neutral-300">{meta.date_added.substring(0, 10)}</span>
          <span className="mx-2 font-semibold"></span>

        </div>
      </div>
    </div>
  );
};

export default PostMeta2;
