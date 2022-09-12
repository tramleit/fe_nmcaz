import React, { FC } from "react";
import Logo from "components/Logo/Logo";
import Navigation from "components/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "components/Button/ButtonPrimary";
import MenuBar from "components/MenuBar/MenuBar";
import DarkModeContainer from "containers/DarkModeContainer/DarkModeContainer";
import ErrorBoundary from "components/ErrorBoundary";
import { store } from "../../../src/app/store";
import NavigationItem from "components/Navigation/NavigationItem";
export interface MainNav1Props {
  isTop?: boolean;
}

const MainNav1: FC<MainNav1Props> = ({ isTop }) => {
  return (
    <div className={`nc-MainNav nc-MainNav1 relative z-10`}>
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
          <Logo />
          <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
            <NavigationItem menuItem={{
              id: "1",
              href: "/trending",
              name: "Trending",
            }} />
            <NavigationItem menuItem={{
              id: "1",
              href: "/videos",
              name: "Videos",
            }} />
            <NavigationItem menuItem={{
              id: "1",
              href: "/models",
              name: "Models",
            }} />
          </ul>
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-1">
            <DarkModeContainer />
            <div className="px-1" />
            <ButtonPrimary href="/login">Sign up</ButtonPrimary>
          </div>
          <div className="flex items-center xl:hidden">
            <ButtonPrimary href="/login">Sign up</ButtonPrimary>
            <div className="px-1" />
            <ErrorBoundary>
              <MenuBar />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
