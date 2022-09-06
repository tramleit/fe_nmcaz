import { SocialType } from "components/SocialsShare/SocialsShare";
import { IProfil } from "interface/interface";
import React, { FC } from "react";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
  user?: IProfil
}

const socialsDemo: SocialType[] = [
  {
    id: "Facebook",
    name: "Facebook",
    icon: "lab la-facebook-square",
    href: "#",
  },
  { id: "Twitter", name: "Twitter", icon: "lab la-twitter", href: "#" },
  { id: "Youtube", name: "Youtube", icon: "lab la-youtube", href: "#" },
  { id: "Instagram", name: "Instagram", icon: "lab la-instagram", href: "#" },
];

export const SOCIALS_2 = socialsDemo;

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block",
  socials = socialsDemo,
  user
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >

      {user && (
        <>
          {socials.map((item, i) => {
            if ((item.name == "Instagram" && user.instagram != "") || (item.name == "Twitter" && user.twitter != "")) {
              return (
                <a
                  key={i}
                  className={`${itemClass}`}
                  href={item.name == "Instagram" ? user.instagram : user.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.name}
                >
                  <i className={item.icon}></i>
                </a>
              );
            }

          })}
        </>)}
    </nav>
  );
};

export default SocialsList;
