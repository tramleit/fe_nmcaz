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
import { API_URL, SITE_URL } from "constants/constants";
import { AiFillLock } from "react-icons/ai"
import { Replay } from 'vimond-replay';
import 'vimond-replay/index.css';
import axios from "axios";
import Hls from "hls.js";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(false);


  const fetch = async () => {
    setIsLoading(true)
    let params = location.pathname.split("/");
    let video = await getSingleVideo(params[params.length - 2], params[params.length - 1]);
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


  useEffect(() => {
    let dialog = document.getElementById("message");
    if (dialog) dialog.innerHTML = "Please wait the video is being decoded, it won't take long";
    if (videoAuthor && videoAuthor.id) {
      axios.get(`${API_URL}video/ffmpeg/${videoAuthor.id}?user_id=${videoAuthor.user_id}`).then((result) => {
        const video = document.getElementById('video') as HTMLMediaElement;

        if (Hls.isSupported() && video) {
          const hls = new Hls();

          hls.loadSource(`${API_URL}video/file/${result.data}`);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {

            video.play();
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          console.log("ERRRROR");

          // video.src = videoSrc;
          // video.addEventListener('loadedmetadata', () => {
          //   video.play();
          // });
        }
        console.log("false");

      })
      if (dialog) dialog.innerHTML = "";
    }

  }, [videoAuthor?.id])

  const handleLock = () => {
    if (videoAuthor && videoAuthor.user_id > 0) {
      //User is logged into his account
      window.location.href = `${SITE_URL}purchase?title=${videoAuthor.title}&model=${videoAuthor.username}`;

    } else {
      //User not connected, we redirect
      window.location.href = `${SITE_URL}login?message=You must be logged in first`;
    }
  }

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
        {(videoAuthor?.purchased) ? (
          <>
            <h1 id="message"></h1>
            <video id="video" className='react-player' width="100%" height="100%" controls ></video>
          </>
        ) :
          (<>
            <div className="w-full h-full relative inset-0 cursor-pointer" onClick={() => handleLock()}>
              <img src={videoAuthor?.thumbnail} alt="thumbnail" className="brightness-50 relative top-0 left-0" />
              <AiFillLock size={90} className="absolute top-1/2 w-full bg-neutral-700" color={"white"} />
            </div>
          </>)}
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
              <h1>{videoAuthor.length} minutes </h1>
              <h1 className="text-lg font-bold">{videoAuthor.price} $</h1>


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
