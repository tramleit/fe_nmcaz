import React, { useEffect, useState } from "react";
import NcLink from "components/NcLink/NcLink";
import { fetchAuthUser } from "functions/user";
import { IUser } from "interface/interface";
import { SITE_URL } from "constants/constants";

const DashboardRoot = ({ user }: { user: IUser }) => {

  return (

    <div className="rounded-xl min-h-full text-sm border border-neutral-100 dark:border-neutral-800 p-6 md:text-base">
      <>
        <span className="block text-lg mb-3">
          👋 Hello <strong>{user.fullName}</strong>
        </span>
        From your account dashboard you can view your dashboard, manage your
        {` `}
        <NcLink to="#">Posts</NcLink>, <NcLink to="#">Subscription</NcLink>,
        <NcLink to="#">edit your password and profile</NcLink>
      </>
    </div>
  );
};

export default DashboardRoot;
