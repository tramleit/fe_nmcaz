import React, { FC, useState } from "react";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "components/PostFeaturedMedia/PostFeaturedMedia";
import { IProfil, IVideoAuthor } from "interface/interface";
import NcImage from "components/NcImage/NcImage";

export interface Card11Props {
  className?: string;
  post: IVideoAuthor;
  ratio?: string;
  hiddenAuthor?: boolean;
  width?: string
  height?: string
}

const Card11: FC<Card11Props> = ({
  className = "h-full",
  post,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
  width,
  height
}) => {

  // const { title, href, categories, date } = post;

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className} ${width as string} ${height as string}`}
      data-nc-id="Card11"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl`}
      >
        <div>
          <div
            className={`nc-PostFeaturedMedia relative ${className}`}
            data-nc-id="PostFeaturedMedia"
          >

            <img className="ml-auto mr-auto" src={post.thumbnail} crossOrigin="anonymous" />
          </div>
        </div>
      </div>
      <Link to={post.fullName} className="absolute inset-0"></Link>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        <span className="text-xs text-neutral-500">{post.date_added.substring(0, 10)}</span>
        <h2 className="nc-card-title block text-2xl font-semibold text-neutral-900 dark:text-neutral-100 ">
          {post.title}
        </h2>
        <h2 className="nc-card-title block text-xl font-bold text-neutral-900 dark:text-neutral-100 ">
          {post.price}{" "}$
        </h2>
        <h2 className="text-s text-neutral-500">
          {post.length}{" "}mm
        </h2>
      </div>
    </div>
  );
};

export default Card11;
