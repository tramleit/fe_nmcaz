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
          <Label>Current password</Label>
          <Input placeholder="***" type="password" className="mt-1" defaultValue={user.password} name="old_password" />
        </label>
        <label className="block">
          <Label>New password</Label>
          <Input type="password" className="mt-1" name="new_password" />
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
        <ButtonPrimary className="md:col-span-2" type="button" onClick={() => { updateProfil() }}>
          Update profile
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default DashboardEditProfile;
