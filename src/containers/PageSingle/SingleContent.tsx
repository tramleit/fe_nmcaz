import React, { FC, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { IProfil, IVideoAuthor } from "interface/interface";
import Avatar from "components/Avatar/Avatar";

export interface SingleContentProps {
  data: IVideoAuthor;
}

const SingleContent: FC<SingleContentProps> = ({ data }) => {
  // const { tags, author, commentCount, comments } = data;
  const commentRef = useRef<HTMLDivElement>(null);
  //
  const location = useLocation();

  return (
    <div className="nc-SingleContent space-y-10">
      {/* ENTRY CONTENT */}
      <div
        id="single-entry-content"
        className="prose lg:prose-lgmx-auto dark:prose-invert"
      >

        <h1 className="text-m font-bold">Description: </h1>
        <p>{data.description}</p>
      </div>



      {/* AUTHOR */}
      <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>



    </div>
  );
};

export default SingleContent;
