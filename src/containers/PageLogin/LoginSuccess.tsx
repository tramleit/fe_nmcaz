import React, { useEffect } from "react";

export const LoginSuccess = () => {


    useEffect(() => {
        setTimeout(() => {
            window.close();
        }, 2000);
    }, []);


    console.log("Here");

    return <div className="text-xl w-full text-center mt-14">Thanks for loggin in!</div>
}

export default LoginSuccess