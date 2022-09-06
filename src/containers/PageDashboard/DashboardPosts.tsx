import React, { useEffect, useState } from "react";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import { IUser, IVideo } from "interface/interface";
import { getVideos } from "functions/video";
import Loading from "components/LoadingVideo/Loading";

const DashboardPosts = ({ user }: { user: IUser }) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [videos, setVideos] = useState<IVideo[]>();

  const fetchData = async () => {
    const data = await getVideos(user.id);
    setVideos(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex flex-col space-y-8">
      {isLoading ? <>
        <Loading />
      </> : <>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
            {videos && videos.length > 0 ? (
              <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">

                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                  <thead className="bg-neutral-50 dark:bg-neutral-800">
                    <tr className="text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                      <th scope="col" className="px-6 py-3">
                        Video
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Views
                      </th>

                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                    {videos.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">

                            <img crossOrigin="anonymous" src={item.thumbnail} className="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14" />
                            <div className="ml-4 flex-grow">
                              <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                                {item.title}
                              </h2>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.video ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-teal-100 text-teal-900 lg:text-sm">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
                              Offline
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                          <span> {item.views}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                          <a
                            href="/#"
                            className="text-primary-800 dark:text-primary-500 hover:text-primary-900"
                          >
                            Edit
                          </a>
                          {` | `}
                          <a
                            href="/#"
                            className="text-rose-600 hover:text-rose-900"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) :
              <>
                <h2>You haven't posted any video yet 😔</h2>
              </>}
          </div>
        </div>
        {/* {(videos && videos.length) && <Pagination />} */}
      </>}
    </div>
  );
};

export default DashboardPosts;
