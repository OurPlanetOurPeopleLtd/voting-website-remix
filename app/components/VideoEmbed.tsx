import {extractYoutubeVideoId} from "~/repositories/utils/utilities";
import {TrackedYoutubeVideo} from "../pages/TrackedYoutubeVideo";

export type TVideoEmbed = {
    title: string;
    url: string | undefined;
    autoplay: boolean;
    showFrame: boolean;
};

export const VideoEmbed = (props: TVideoEmbed) => {


    const videoId = extractYoutubeVideoId(props.url)
    return (<TrackedYoutubeVideo pageTitle={"Voting Page"}
                                 videoId={videoId}
                                 autoPlay={props.autoplay}
                                 showFrame={props.showFrame}
                                 videoTitle={"Introduction Video"}/>)


}