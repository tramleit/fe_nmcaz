import React, { FC, useEffect, useState } from "react";
import Heading from "components/Heading/Heading";
import { PostDataType } from "data/types";
import Card5 from "components/Card5/Card5";
import { IProfil } from "interface/interface";
import { fetchPopularModels } from "functions/user";
import Loading from "components/LoadingVideo/Loading";
import CardModel from "components/CardModel/CardModel";


export interface SectionTrendingProps {
  posts: PostDataType[];
  heading?: string;
  className?: string;
}

const SectionTrending: FC<SectionTrendingProps> = ({
  posts,
  heading = "Trending on Ncmaz",
  className = "",
}) => {

  const [models, setModels] = useState<IProfil[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetch = async () => {
    setIsLoading(true);
    let models = await fetchPopularModels();
    console.log("Models", models);

    setModels(models);
    setIsLoading(false);
  }

  useEffect(() => {
    fetch();
  }, [])
  return (
    <div className={`nc-SectionTrending relative ${className}`}>
      {!!heading && <Heading>{heading}</Heading>}
      {isLoading ? (<Loading />) : (
        <div className="grid grid-cols-4 sm:grid-cols-2 lg:md:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {models && models.map((model) => {
            return <CardModel key={model.id} model={model} className={"w-full"} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SectionTrending;
