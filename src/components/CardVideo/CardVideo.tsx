import React, { FC, useState } from "react";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";

import { IVideoAuthor } from "interface/interface";
import { SITE_URL } from "constants/constants";

export interface Card11Props {
    className?: string;
    video: IVideoAuthor;
    ratio?: string;
    hiddenAuthor?: boolean;
}

const CardModel: FC<Card11Props> = ({
    className = "h-full",
    video,
    hiddenAuthor = false,
    ratio = "aspect-w-4 aspect-h-3",
}) => {

    // const { title, href, categories, date } = post;

    const [isHover, setIsHover] = useState(false);

    return (
        <div
            className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
            data-nc-id="Card11"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div
                className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
            >
                <div>
                    <div
                        className={`nc-PostFeaturedMedia relative ${className}`}
                        data-nc-id="PostFeaturedMedia"
                    >

                        <img className="absolute inset-0" src={video.thumbnail} crossOrigin="anonymous" />
                    </div>
                </div>
            </div>
            <Link to={`models/${video.username}`} className="absolute inset-0"></Link>

            <div className="p-4 flex flex-col flex-grow">
                <span className="text-l font-bold">{video.title}</span>
                <span className="text-sm">{video.date_added.substring(0, 10)}</span>

                <Link to={`models/${video.username}`} className="line-clamp-2" title={video.title}>
                    <div className="flex row mt-5">
                        <img src={video.picture} crossOrigin="anonymous" className="w-12 h-12 rounded-full" />
                        <h2 className="nc-card-title block font-semibold text-m text-neutral-900 dark:text-neutral-100 ml-2 mt-5">{video.username} </h2>
                    </div>

                </Link>

            </div>
        </div>
    );
};

export default CardModel;
