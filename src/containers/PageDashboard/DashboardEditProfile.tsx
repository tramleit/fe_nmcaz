import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import React, { useEffect, useState } from "react";
import { IUser } from "interface/interface";
import { fetchModelProfilDashboard, updateModelProfil } from "functions/user";
import Textarea from "components/Textarea/Textarea";
import { update } from "lodash";

const DashboardEditProfile = ({ user }: { user: IUser }) => {

  const updateProfil = async () => {
    let myForm = document.getElementById('editForm') as HTMLFormElement;
    if (myForm != null) {
      const formData: FormData = new FormData(myForm);
      const values = Object.fromEntries(formData.entries())
      const response = await updateModelProfil(values);
      console.log(response);

    }

  }

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      { }
      <form className="grid md:grid-cols-2 gap-6" id="editForm">
        <label className="block">
          <Label>First name</Label>
          <Input placeholder="Example Doe" type="text" className="mt-1" defaultValue={user.fullName.split(" ")[0]} name="first_name" />
        </label>
        <label className="block">
          <Label>Last name</Label>
          <Input placeholder="Doe" type="text" className="mt-1" defaultValue={user.fullName.split(" ")[1]} name="last_name" />
        </label>
        <label className="block">
          <Label>Twitter</Label>
          <Input placeholder="Profil URL" type="text" className="mt-1" defaultValue={user.twitter} name="twitter" />
        </label>
        <label className="block">
          <Label>Instagram</Label>
          <Input placeholder="Profil URL" type="text" className="mt-1" name="instagram" defaultValue={user.instagram} />
        </label>
        <label className="block md:col-span-2">
          <Label>Username</Label>
          <Input
            type="email"
            placeholder="AffectionateAge"
            className="mt-1"
            defaultValue={user.username}
            name="username"
          />
        </label>
        <label className="block md:col-span-2">
          <Label> Email address</Label>
          <Input
            type="email"
            placeholder="example@example.com"
            className="mt-1"
            defaultValue={user.email}
            name="email"
          />
        </label>
        <label className="block md:col-span-2">
          <Label>Bio</Label>
          <Textarea
            className="mt-1"
            defaultValue={user.bio}
            name="bio"
          />
        </label>
        <div className="flex w-full row ">
          <div className="block md:col-span-2 ">
            <Label>Profil picture</Label>

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    {/* <span>Upload a photo</span> */}
                    <input
                      id="file-upload"
                      name="profil"
                      type="file"
                    // className="sr-only"
                    />
                  </label>
                  {/* <p className="pl-1">or drag and drop</p> */}
                </div>
                <p className="text-xs text-neutral-500">
                  PNG, JPG, GIF up to 2MB
                </p>
              </div>
            </div>
          </div>
          <div className="block md:col-span-2 ml-14">
            <Label>Thumbnail</Label>

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    {/* <span>Upload a photo</span> */}
                    <input
                      id="file-upload"
                      name="thumbnail"
                      type="file"
                    // className="sr-only"
                    />
                  </label>
                  {/* <p className="pl-1">or drag and drop</p> */}
                </div>
                <p className="text-xs text-neutral-500">
                  PNG, JPG, GIF up to 2MB
                </p>
              </div>
            </div>
          </div>
        </div>
        <ButtonPrimary className="md:col-span-2" type="button" onClick={() => { updateProfil() }}>
          Update profile
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default DashboardEditProfile;
