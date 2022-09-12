import React, { FC, useEffect, useMemo, useState } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import { PostDataType } from "data/types";
import CardAuthorBox2 from "components/CardAuthorBox2/CardAuthorBox2";
import NextPrev from "components/NextPrev/NextPrev";
import ncNanoId from "utils/ncNanoId";
import { IProfil } from "interface/interface";
import { fetchLatestModels } from "functions/user";
import Loading from "components/LoadingVideo/Loading";

export interface SectionSliderNewAuthorsProps {
  className?: string;
  heading: string;
  subHeading: string;
  authors?: any
  uniqueSliderClass: string;
}

const SectionSliderNewAuthors: FC<SectionSliderNewAuthorsProps> = ({
  heading,
  subHeading,
  className = "",
  uniqueSliderClass,
}) => {
  const UNIQUE_CLASS = "sliderNewAuthors_" + ncNanoId(uniqueSliderClass);

  // const MY_GLIDE = new Glide(`.${UNIQUE_CLASS}`, {
  //   // @ts-ignore
  //   direction:
  //     document.querySelector("html")?.getAttribute("dir") === "rtl"
  //       ? "rtl"
  //       : "ltr",
  //   perView: 5,

  //   gap: 32,
  //   bound: true,
  //   breakpoints: {
  //     1280: {
  //       perView: 4,
  //     },
  //     1023: {
  //       gap: 24,
  //       perView: 3,
  //     },
  //     767: {
  //       gap: 20,
  //       perView: 2.3,
  //     },
  //     639: {
  //       gap: 20,
  //       perView: 2,
  //     },
  //     500: {
  //       gap: 20,
  //       perView: 1.3,
  //     },
  //   },
  // });

  /* ********************* */
  const [models, setModels] = useState<IProfil[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetch = async () => {
    setIsLoading(true);
    let models = await fetchLatestModels();
    console.log(models);

    setModels(models)
    setIsLoading(false)
  }

  useEffect(() => {
    // MY_GLIDE.mount();
    fetch();
  }, []);

  return (
    <div className={`nc-SectionSliderNewAuthors ${className}`}>
      {isLoading ? (<Loading />) : (
        <>
          <div className={`${UNIQUE_CLASS}`}>
            <Heading isCenter desc={"Say hello to our newest models"}>
              {"Newest models"}
            </Heading>
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {models && models.map((item, index) => (
                  <li key={index} className="glide__slide pb-12 md:pb-16">
                    <CardAuthorBox2 author={item} />
                  </li>
                ))}
              </ul>
            </div>
            <NextPrev
              btnClassName="w-12 h-12"
              containerClassName="justify-center"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SectionSliderNewAuthors;
