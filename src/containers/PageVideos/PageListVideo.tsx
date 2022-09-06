import React, { FC, useEffect, useState } from "react";
import { DEMO_POSTS } from "data/posts";
import { PostAuthorType, PostDataType } from "data/types";
import Pagination from "components/Pagination/Pagination";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { DEMO_AUTHORS } from "data/authors";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { fetchModelProfil, fetchModels } from "functions/user";
import { SITE_URL } from "constants/constants";
import { IProfil, IVideoAuthor } from "interface/interface";
import Loading from "components/LoadingVideo/Loading";
import Input from "components/Input/Input";
import HeadBackgroundCommon from "components/HeadBackgroundCommon/HeadBackgroundCommon";
import CardVideo from "components/CardVideo/CardVideo";
import NewPagination from "components/Pagination/NewPagination";
import { getAllVideos } from "functions/video";

export interface PageAuthorProps {
    className?: string;
}
const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 12);
// const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 12);
const AUTHOR: PostAuthorType = DEMO_AUTHORS[0];
const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
];
const TABS = ["Models", "Favorites"];

const PageListModels: FC<PageAuthorProps> = ({ className = "" }) => {

    const [tabActive, setTabActive] = useState<string>(TABS[0]);
    const [models, setModels] = useState<IVideoAuthor[]>();
    const [search, setSearch] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);


    const fetch = async (limit: number = 25, offset: number = 0,) => {
        let models = await getAllVideos(search, limit, offset);
        console.log("My videos", models);
        setModels(models)
        setIsLoading(false)
        console.log(isLoading);

    }


    useEffect(() => {
        setIsLoading(true)
        fetch();
    }, [])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            e.preventDefault();
            fetch();
        }
    }


    return (
        <div className={`nc-PageSearchV2 ${className}`} data-nc-id="PageSearchV2">
            <HeadBackgroundCommon className="h-24 2xl:h-28" />
            <Helmet>
                <title>Videos</title>
            </Helmet>
            <div className="container">
                <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
                    <form className="relative" action="" method="post">
                        <label
                            htmlFor="search-input"
                            className="text-neutral-500 dark:text-neutral-300"
                        >
                            <span className="sr-only">Search all videos</span>
                            <Input
                                id="search-input"
                                type="text"
                                placeholder="Search video"
                                className="shadow-lg rounded-xl border-opacity-0"
                                sizeClass="pl-14 py-5 pr-5 md:pl-16"
                                defaultValue={""}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e)}
                                value={search}
                            />
                            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
                                    ></path>
                                </svg>
                            </span>
                        </label>
                    </form>
                    <span className="block text-sm mt-4 text-neutral-500 dark:text-neutral-300">
                        We found{" "}
                        <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
                            {models?.length}
                        </strong>{" "}
                        videos{" "}
                    </span>
                </header>
            </div>
            <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
                <main>
                    {/* TABS FILTER */}
                    <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row ">
                        <Nav
                            containerClassName="w-full overflow-x-auto hiddenScrollbar"
                            className=" sm:space-x-2"
                        >
                            {TABS.map((item, index) => (
                                <NavItem
                                    key={index}
                                    isActive={tabActive === item}

                                >
                                    {item}
                                </NavItem>
                            ))}
                        </Nav>
                        <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
                        <div className="flex justify-end">
                            <ArchiveFilterListBox lists={FILTERS} />
                        </div>
                    </div>
                    {!isLoading ? (
                        <>
                            {models && models.length > 0 ? (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
                                    {models.map((model, index) => {
                                        return (<CardVideo video={model} key={index} />);
                                    })}
                                </ div>
                            ) : (
                                <h1 className="text-l font-bold mt-10 ml-3">No videos found, with search "{search}"</h1>
                            )}

                        </>
                    ) : (
                        <Loading />
                    )}





                    {/* PAGINATION */}
                    <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                        <NewPagination data={models} getData={fetch} offset={offset} setOffset={setOffset} setIsLoading={setIsLoading} />
                        {/* <ButtonPrimary>Show me more</ButtonPrimary> */}
                    </div>
                </main>



            </div>
        </div>
    );
};

export default PageListModels;
