import CardVideo from "components/Card11/CardVideo";
import Loading from "components/LoadingVideo/Loading";
import { getSingleVideo } from "functions/video";
import { IVideoAuthor } from "interface/interface";
import React, { useEffect, useState } from "react";
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_A7jK4iCYHL045qgjjfzAfPxu');

const Purchase = () => {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [video, setVideo] = useState<IVideoAuthor>();

    const fetch = async () => {
        setIsLoading(true)
        const urlParams = new URLSearchParams(window.location.search);
        let video = await getSingleVideo(urlParams.get("model") as string, urlParams.get("title") as string);
        console.log(video);

        setVideo(video)
        setIsLoading(false);
    }

    useEffect(() => {
        //We get the video info
        fetch();
    }, [])

    return (<div>
        <h1 className="text-3xl text-center mt-5 mb-5 border-b-2 pb-2">Buy video</h1>
        {isLoading ? (<Loading />) : (
            <div className="flex row w-3/5 ml-auto mr-auto mb-5">

                {video &&
                    (<>
                        <div className="w-1/3">
                            <CardVideo post={video} />
                        </div>
                        <div className="w-2/3 ml-5">
                            {/* <Elements stripe={stripePromise} options={options}>
                                <PaymentElement />
                            </Elements> */}
                        </div>
                    </>)}
            </ div>
        )}
    </ div>)

}

export default Purchase;