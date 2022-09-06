import React, { FC, ReactNode, useEffect, useState } from "react";
import { PostDataType, TaxonomyType } from "data/types";
import { SINGLE_VIDEO } from "data/single";
import { CommentType } from "components/CommentCard/CommentCard";
import { useAppDispatch } from "app/hooks";
import { changeCurrentPage } from "app/pages/pages";
import SingleContent from "containers/PageSingle/SingleContent";
import SingleRelatedPosts from "containers/PageSingle/SingleRelatedPosts";
import ReactPlayer from "react-player";
import NcPlayIcon from "components/NcPlayIcon/NcPlayIcon";
import SingleMetaAction2 from "containers/PageSingle/SingleMetaAction2";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import SingleTitle from "containers/PageSingle/SingleTitle";
import PostMeta2 from "components/PostMeta2/PostMeta2";
import NcImage from "components/NcImage/NcImage";
import isSafariBrowser from "utils/isSafariBrowser";
import { useLocation, useParams } from "react-router-dom";
import { downloadVideo, getSingleVideo } from "functions/video";
import { IVideoAuthor } from "interface/interface";
import Loading from "components/LoadingVideo/Loading";
import { API_URL } from "constants/constants";

export interface PageSingleVideoProps {
  className?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
}

const PageSingleVideo: FC<PageSingleVideoProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const location = useLocation()
  const [isPlay, setIsPlay] = useState(false);
  const [videoAuthor, setIsVideoAuthor] = useState<IVideoAuthor>();
  const [video, setVideo] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetch = async () => {
    setIsLoading(true)
    let params = location.pathname.split("/");
    let video = await getSingleVideo(params[params.length - 2], params[params.length - 1]);
    setVideo(downloadVideo(video.id))
    setIsVideoAuthor(video);
    setIsLoading(false);
  }

  useEffect(() => {
    fetch();

    // UPDATE CURRENTPAGE DATA IN PAGE-REDUCERS
    dispatch(changeCurrentPage({ type: "/single/:slug", data: SINGLE_VIDEO }));
    return () => {
      dispatch(changeCurrentPage({ type: "/", data: {} }));
    };
  }, []);

  console.log(video, "video");


  const renderMainVideo = () => {
    return (

      <div className="">
        {isSafariBrowser() && SINGLE_VIDEO.featuredImage && !isPlay && (
          <div
            className="absolute inset-0 z-10 cursor-pointer "
            onClick={() => setIsPlay(true)}
          >
            <NcImage
              src={SINGLE_VIDEO.featuredImage}
              containerClassName="absolute inset-0"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <NcPlayIcon />
            </div>
          </div>
        )}
        <ReactPlayer
          url={`${API_URL}video/download/${videoAuthor?.id}`}
          className="absolute inset-0"
          playing={isSafariBrowser() ? isPlay : true}
          width="100%"
          height="100%"
          controls
          crossOrigin={"anonymous"}
          light={isSafariBrowser() ? false : videoAuthor?.thumbnail}
          playIcon={<NcPlayIcon />}
        />
      </div>
    );
  };

  const renderHeader = () => {
    const { categories, title } = SINGLE_VIDEO;
    return (
      <>
        {videoAuthor && (
          <div className={`nc-SingleHeader ${className}`}>
            <div className="space-y-5 dark text-neutral-100">
              <CategoryBadgeList itemClass="!px-3" categories={videoAuthor.categories} />
              <SingleTitle
                mainClass="text-neutral-900 font-semibold text-3xl md:!leading-[120%] dark:text-neutral-100"
                title={videoAuthor?.title as string}
              />

              <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
              <div className="flex flex-col space-y-5">


                <PostMeta2
                  size="large"
                  className="leading-none flex-shrink-0"
                  meta={videoAuthor}
                  hiddenCategories
                  avatarRounded="rounded-full shadow-inner"
                />
                <SingleMetaAction2 meta={videoAuthor} />
              </div>
            </div>
          </div>
        )}</>
    );
  };

  return (
    <>
      {!isLoading && videoAuthor ? (
        <>
          <div
            className={`nc-PageSingleVideo  ${className}`}
            data-nc-id="PageSingleVideo"
          >
            {/* SINGLE HEADER */}
            <header className="container relative py-14 lg:py-20 flex flex-col lg:flex-row lg:items-center">
              <div className="nc-PageSingleVideo__headerWrap absolute inset-y-0 transform translate-x-1/2 right-1/2 w-screen lg:translate-x-0 lg:w-[calc(100vw/2)] bg-neutral-900 dark:bg-black dark:bg-opacity-50 lg:rounded-r-[40px]"></div>
              <div className="pb-10 lg:pb-0 lg:pr-10 relative">
                {renderHeader()}
              </div>
              <div className="relative lg:w-8/12 flex-shrink-0">
                <div className="aspect-w-16 aspect-h-16 sm:aspect-h-9 border-4 border-neutral-300 dark:border-neutral-800 shadow-2xl bg-neutral-800 rounded-3xl overflow-hidden z-0">
                  {renderMainVideo()}
                </div>
              </div>
            </header>

            {/* SINGLE MAIN CONTENT */}
            <div className="container mt-12">
              <SingleContent data={videoAuthor} />
            </div>

            {/* RELATED POSTS */}
            {/* <SingleRelatedPosts /> */}
          </div></>) : (<Loading />)}
    </>
  );
};

export default PageSingleVideo;
