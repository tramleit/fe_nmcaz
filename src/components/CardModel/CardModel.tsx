import React, { FC, useState } from "react";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";

import { IProfil } from "interface/interface";
import { SITE_URL } from "constants/constants";

export interface Card11Props {
    className?: string;
    model: IProfil;
    ratio?: string;
    hiddenAuthor?: boolean;
}

const CardModel: FC<Card11Props> = ({
    className = "h-full",
    model,
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

                        <img className="absolute inset-0" src={model.picture} crossOrigin="anonymous" />
                    </div>
                </div>
            </div>
            <Link to={`models/${model.username}`} className="absolute inset-0"></Link>

            <div className="p-4 flex flex-col flex-grow space-y-3">
                <span className="text-l font-bold">@{model.username}</span>
                <span className="text-sm">{model.fullName}</span>
                <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
                    <Link to={`models/${model.username}`} className="line-clamp-2" title={model.title}>
                        {model.title}
                    </Link>
                </h2>
            </div>
        </div>
    );
};

export default CardModel;
