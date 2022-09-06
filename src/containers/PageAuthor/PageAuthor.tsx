import React, { FC, useEffect, useState } from "react";
import { DEMO_POSTS } from "data/posts";
import { PostAuthorType, PostDataType } from "data/types";
import Pagination from "components/Pagination/Pagination";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { DEMO_AUTHORS } from "data/authors";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import Avatar from "components/Avatar/Avatar";
import SocialsList from "components/SocialsList/SocialsList";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import Card11 from "components/Card11/Card11";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import { DEMO_CATEGORIES } from "data/taxonomies";
import ButtonSecondary from "components/Button/ButtonSecondary";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import NcImage from "components/NcImage/NcImage";
import { useLocation } from "react-router-dom";
import { fetchModelProfil } from "functions/user";
import { SITE_URL } from "constants/constants";
import { IProfil } from "interface/interface";

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
const TABS = ["Videos", "Favorites"];

const PageAuthor: FC<PageAuthorProps> = ({ className = "" }) => {
  const [tabActive, setTabActive] = useState<string>(TABS[0]);
  const [dataUser, setUserData] = useState<IProfil[]>();
  const location = useLocation()

  const fetch = async () => {
    console.log("we are fetching...");
    let profil = await fetchModelProfil(location.pathname.substring('/author/'.length));
    console.log(profil);
    if (profil) {


      setUserData(await fetchModelProfil(location.pathname.substring('/author/'.length)))
    } else {
      //We dont have any profile we redirect
      window.location.href = `${SITE_URL}models`
    }

  }


  useEffect(() => {
    fetch();
  }, [])



  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }

    setTabActive(item);
  };

  return (
    <>
      {dataUser ? (
        <div className={`nc-PageAuthor  ${className}`} data-nc-id="PageAuthor">

          <Helmet>
            <title>Author || Blog Magazine React Template</title>
          </Helmet>

          {/* HEADER */}
          <div className="w-screen px-2 xl:max-w-screen-2xl mx-auto">
            <div className="rounded-3xl md:rounded-[40px] relative aspect-w-16 aspect-h-12 sm:aspect-h-7 xl:sm:aspect-h-6 overflow-hidden ">

              <img src={dataUser[0].thumbnail} className="absolute inset-0 object-cover w-full h-full" crossOrigin="anonymous" />
            </div>
            <div className="relative container -mt-20 lg:-mt-48">
              <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 rounded-[40px] shadow-2xl flex flex-col sm:flex-row sm:items-center">
                <img src={dataUser[0].picture} className="ring-4 ring-white dark:ring-0 shadow-2xl w-20 h-20 text-xl lg:text-2xl lg:w-36 lg:h-36" alt="" crossOrigin="anonymous" />
                <div className="mt-5 sm:mt-0 sm:ml-8 space-y-4 max-w-lg">
                  <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl font-semibold">
                    {dataUser[0].fullName}
                  </h2>
                  <span className="block text-sm text-neutral-6000 dark:text-neutral-300 md:text-base">
                    {dataUser[0].bio}
                  </span>
                  <SocialsList user={dataUser[0]} />
                </div>
              </div>
            </div>
          </div>
          {/* ====================== END HEADER ====================== */}
          <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
            <main>
              {/* TABS FILTER */}
              <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
                <Nav className="sm:space-x-2">
                  {TABS.map((item, index) => (
                    <NavItem
                      key={index}
                      isActive={tabActive === item}
                      onClick={() => handleClickTab(item)}
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

              {/* LOOP ITEMS */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
                {dataUser.map((post) => (
                  <Card11 key={post.id} post={post} />
                ))}
              </div>

              {/* PAGINATION */}
              <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                {/* <Pagination />
                <ButtonPrimary>Show me more</ButtonPrimary> */}
              </div>
            </main>

            {/* === SECTION 5 === */}
            {/* <div className="relative py-16">
              <BackgroundSection />
              <SectionGridCategoryBox
                categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
              />
              <div className="text-center mx-auto mt-10 md:mt-16">
                <ButtonSecondary>Show me more</ButtonSecondary>
              </div>
            </div> */}

            {/* === SECTION 5 === */}
            {/* <SectionSliderNewAuthors
              heading="Top elite authors"
              subHeading="Discover our elite writers"
              uniqueSliderClass="PageAuthor__slider"
              authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
            /> */}

            {/* SUBCRIBES */}
            {/* <SectionSubscribe2 /> */}
          </div>
        </div>
      ) : "The profil is loading..."}
    </>

  );
};

export default PageAuthor;
