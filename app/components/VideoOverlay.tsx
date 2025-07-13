import React, {useEffect, useState} from "react";
import "./VideoOverlay.scss";

import {TVideoProps, VideoControl} from "./VideoControl";
import {SharingControls} from "./SharingControls";
import {Video} from "react-datocms/dist/types/VideoPlayer";

type TOverlayVideoProps = TVideoProps &
    {
        show: boolean;
        altVideo: Video | undefined,
        onClose: () => void;
    }
const VideoOverlay = (props: TOverlayVideoProps) => {

    const [useAlt, setUseAlt] = useState(false);
    useEffect(() => {
        if(props.show)
            window.scrollTo(0, 0);
    }, [props.show]);
    
    if(!props.show)
    {
        return null;
    }

    return (
        <>
        <div id="overlay"></div>
        <div id="dato-video-player-frame" >
                
           
                    
                
                <button className="close" onClick={() => props.onClose()}>X</button>
                <div className="video-frame"></div>
                <VideoControl {...props} onFinish={() => setUseAlt(true)} datoVideo={ props.datoVideo} autoPlay={true}/>
               
                <SharingControls className={"overlay-share-buttons"} voted={true} shareHeading={"Please share...."?? ""}
                              shareButtonText={"Please share!"}/>
              
                <div className={"share-text"}>
                    Watch our full <a href="#" onClick={() => setUseAlt(true)} className={"share-link"}>Climate Change Crisis</a> explanation video
                </div>
            </div>
        </>
    )
};


export default VideoOverlay