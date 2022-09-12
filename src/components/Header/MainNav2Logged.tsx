
import ButtonPrimary from "components/Button/ButtonPrimary";
import ErrorBoundary from "components/ErrorBoundary";
import Input from "components/Input/Input";
import Logo from "components/Logo/Logo";
import MenuBar from "components/MenuBar/MenuBar";
import Navigation from "components/Navigation/Navigation";
import NavigationItem from "components/Navigation/NavigationItem";
import DarkModeContainer from "containers/DarkModeContainer/DarkModeContainer";
import { NAVIGATION_SHORT_DEMO } from "data/navigation";
import React, { FC } from "react";
import AvatarDropdown from "./AvatarDropdown";
import NotifyDropdown from "./NotifyDropdown";

export interface MainNav2LoggedProps { }

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {

  return (
    <div className={`nc-MainNav nc-MainNav2 relative z-10`}>
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo />
          <div className="hidden sm:block flex-grow max-w-xs">
            {/*  /form> */}
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-2">
            <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
              {/* {navigations.map((item) => ( */}
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
              {/* ))} */}
            </ul>
            <div className="hidden sm:block h-6 border-l border-neutral-300 dark:border-neutral-6000"></div>
            <div className="flex">
              <DarkModeContainer />
              <NotifyDropdown />
            </div>
            <div></div>
            {/* <ButtonPrimary href={"##"} sizeClass="px-4 py-2 sm:px-5">
              Create
            </ButtonPrimary> */}
            <div></div>
            <AvatarDropdown />
          </div>
          <div className="flex items-center space-x-3 xl:hidden">
            <NotifyDropdown />
            <AvatarDropdown />
            <ErrorBoundary>
              <MenuBar />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2Logged;
