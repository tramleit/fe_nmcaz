import React, { useState } from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import { IUser } from "interface/interface";
import { uploadVideo } from "../../functions/video";

const DashboardSubmitPost = ({ user }: { user: IUser }) => {

  const [response, setResponse] = useState<string>("");

  const upload = async () => {
    let myForm = document.getElementById('uploadVideo') as HTMLFormElement;

    if (myForm != null) {
      const formData: FormData = new FormData(myForm);

      // Display the key/value pairs
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      const response = await uploadVideo(formData);

      //Item added
      if (response && response.affectedRows > 0) {
        setResponse("Video added 😊")

        myForm.reset();
      } else {
        setResponse("An error as occured, please try again.")
      }

    }
  }


  return (
    <>
      {response !== "" && <h1 className={`bold text-m ${response.substring(0, 5) == "Video" ? "text-emerald-600	" : "text-rose-600"}`}>{response}</h1>}
      <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">

        <form className="grid md:grid-cols-2 gap-6" id="uploadVideo">
          <label className="block md:col-span-2">
            <Label>Video Title *</Label>

            <Input type="text" className="mt-1" name="title" />
          </label>
          <label className="block md:col-span-2">
            <Label>Video description</Label>

            <Textarea className="mt-1" rows={4} name="description" />
            <p className="mt-1 text-sm text-neutral-500">
              Brief description for your article. URLs are hyperlinked.
            </p>
          </label>
          <label className="block">
            <Label>Category</Label>

            <Select className="mt-1" name="categories">
              <option value="0">– select –</option>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
            </Select>
          </label>
          <label className="block">
            <Label>Tags</Label>

            <Input type="text" className="mt-1" name="tags" />
          </label>
          <label className="block">
            <Label>Duration (HH:MM:SS)</Label>

            <Input type="time" step={"1"} defaultValue={"00:05:00"} className="mt-1" name="time" />
          </label>
          <label className="block">
            <Label>Price</Label>

            <Input type="number" step="0.5" className="mt-1" name="price" />
          </label>
          <input type="hidden" name="user_id" value={user.id} />
          <input type="hidden" name="fullname" value={user.fullName} />
          <div className="block md:col-span-2">
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
          <div className="block md:col-span-2">
            <Label>Video</Label>

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
                    {/* <span>Upload a video</span> */}
                    <input
                      id="video-upload"
                      name="video"
                      type="file"
                    // className="sr-only"
                    />
                  </label>
                  {/* <p className="pl-1">or drag and drop</p> */}
                </div>
                <p className="text-xs text-neutral-500">
                  MP4, MOV, H264
                </p>
              </div>
            </div>
          </div>
          {/* <label className="block md:col-span-2">
          <Label> Post Content</Label>

          <Textarea className="mt-1" rows={16} />
        </label> */}

          <ButtonPrimary className="md:col-span-2" type="button" onClick={upload}>
            Submit post
          </ButtonPrimary>
        </form>
      </div>
    </>
  );
};

export default DashboardSubmitPost;
