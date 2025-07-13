import YouTube, {YouTubeProps} from "react-youtube";
import "./TrackedYoutubeVideo.scss";
import {useEffect, useState} from "react";
import {recordUse} from "../utils/analytics";
// @ts-ignore

import {localStorageVotingIdKey} from "~/repositories/utils/utilities";

export interface TrackedVideoProps {
    pageTitle: string;
    videoTitle: string;
    videoId?: string;
    showFrame: boolean;
    autoPlay: boolean;
    onFinish?: () => void;
}

export const TrackedYoutubeVideo = (props: TrackedVideoProps) => {

    const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
    useEffect(() => {

        //set up record
        function userLeft(ev: any) {

            const attributes = {
                video_title: props.videoTitle,
                userId: `${userGuid ?? ""}`,
                page: props.pageTitle
            }
            if (videoPlaying) {
                recordUse({
                    name: 'User_Left_Page_Without_Finishing_Video',
                    attributes: attributes
                }, userGuid)
                if (props.onFinish)
                    props.onFinish();
            }
        }

        window.addEventListener('beforeunload', userLeft)

        return () => {
            window.removeEventListener('beforeunload', userLeft)
        }
    })

    let userGuid = localStorage.getItem(localStorageVotingIdKey);
    const videoOptions: YouTubeProps['opts'] = {

        playerVars: {
            autoplay: props.autoPlay,
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
            rel:0,
            cc_load_policy:1
        },
    };

    function getMetrics(event: any) {
        let timeWatched = 0;
        let percentageWatched = 0;
        try {
            timeWatched = event.target.getCurrentTime();
            percentageWatched = Math.floor((event?.target?.getCurrentTime() / event?.target?.getDuration()) * 100);
        } catch (e) {
            console.log("video event play back error");
            console.log(e);
        }
        return {amountOfVideoWatched: timeWatched, percentageWatched: percentageWatched};
    }

    function getAttributes(event: any) {
        const timeWindow = 10;
        let timeLeftOnVideo = "unknown";
        let playedTime = "unknown";
        let videoPlayedUntilEnd = "unknown";
        let playedPercentage = "0%"
        let page = window?.location?.pathname ?? "HubPage";

        try {
            timeLeftOnVideo = (event?.target?.getDuration() ?? 0 - event?.target?.getCurrentTime() ?? 0).toString();
            playedTime = event?.target?.getCurrentTime();
            playedPercentage = Math.floor((event?.target?.getCurrentTime() / event?.target?.getDuration()) * 100).toString() + "%";
            videoPlayedUntilEnd = (event?.target?.getCurrentTime() >= (event?.target?.getDuration() - timeWindow)).toString();
        } catch (e) {

        }
        const attributes = {
            video_title: props.videoTitle,
            userId: `${userGuid ?? ""}`,
            page: page,
            playedTime: playedTime,
            playedPercentage: playedPercentage,
            timeLeftOnVideo: timeLeftOnVideo
        }
        return attributes;
    }

    // @ts-ignore
    // @ts-ignore
    const content = (<div className="video-container">
        <div className="aspect-ratio">
            <YouTube
                className="t-video"
                title={props.videoTitle}
                opts={videoOptions}
                videoId={props.videoId}
                onPlay={(e) => {
                    setVideoPlaying(true);
                    try {
                        recordUse({
                            name: 'Video_Played',
                            metrics: getMetrics(e),
                            attributes: getAttributes(e)
                        }, userGuid)
                    } catch (e) {
                        console.log("failed to analyse")
                        console.log(e);
                    }
                }
                }
                onPause={(e) => {
                    if (props.onFinish)
                        props.onFinish();
                    recordUse({
                        name: 'Video_Paused',
                        metrics: getMetrics(e),
                        attributes: getAttributes(e)
                    }, userGuid)
                }
                }

                onEnd={(e) => {
                    setVideoPlaying(false);
                    if (props.onFinish)
                        props.onFinish();
                    recordUse({
                        name: 'Video_Watched_To_End',
                        metrics: getMetrics(e),
                        attributes: getAttributes(e)
                    }, userGuid)
                }
                }
            />
        </div>
    </div>)

    if (!props.videoId) return <></>;
    return (

        props.showFrame
            ? <div className="videoIframe">
                {content}
            </div>
            : <>{content}</>


    );

}