import React, { FC } from "react";
export interface LoadingVideoProps {
    className?: string;
    chilClassName?: string;
}

const Loading: FC<LoadingVideoProps> = ({
    className = "",
    chilClassName = "bg-white",
}) => {
    return (
        <div
            className={`lds-ellipsis ${className}  mt-5 mb-5  !w-full`}
        >
            <img src="https://www.voyagesgabymsh.ca/wp-content/uploads/2022/09/load.gif" className="ml-auto mr-auto" />
        </div>
    );
};

export default Loading;
