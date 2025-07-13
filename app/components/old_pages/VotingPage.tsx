import React, {useCallback, useEffect, useState} from "react";
import {getVotingPageJson} from "~/repositories/VotingPage/request";
import {Choice} from "../models";
import {v4 as generateGuid} from "uuid";
import {VotingPageMainJourney} from "./VotingPageVariants/VotingPageMainJourney";
import {TVotingPage, TVotingPageExtended, TVotingQueryProps} from "~/repositories/VotingPage/model";
import {localStorageVotingIdKey, localStorageWatchedIdKey} from "~/repositories/utils/utilities";

import "./VotingPage.scss";

const VotingPage = (queryProps: TVotingQueryProps) => {
    const initialState: TVotingPage = {
        videos: undefined,
        donateText: undefined,
        openingText: undefined,
        postVoteVideo: undefined,
        introText: "",
        mainVideo: { id: "", video: {} },
        showIntroVideo: false,
        showSharePanel: false,
        showStatistics: false,
        videoThumbnail: undefined,
        shareHeading: "",
        shareSubHeading: "",
        hubHeading: "",
        hubSubheading: "",
        hubIntroText: "",
        hubSecondaryText: "",
        hubLinksHeading: "",
        hubPanelLink: [],
    }

    const lwatchedString = localStorage.getItem(localStorageWatchedIdKey);
    const lwatched = lwatchedString ? lwatchedString === "true" : false;

    const [voted, setVoted] = useState(lwatched);
    const [watched, setWatched] = useState(false);

    const [data, setData] = useState<TVotingPage>(initialState);

    let userGuid = localStorage.getItem(localStorageVotingIdKey);

    if (!userGuid) {
        userGuid = generateGuid();
        localStorage.setItem(localStorageVotingIdKey, userGuid);
    }

    function onWatched() {
        setWatched(true);
        localStorage.setItem(localStorageWatchedIdKey, "true");
    }

    function voteChanged(choice: Choice){}

    const fullData: TVotingPageExtended = {
        locale: queryProps.locale,
        voteChangedCallBack: voteChanged,
        voteResultCallBack: setVoted,    
        watchedCallBack: onWatched,
        voted:voted,
        watched:watched,
        ...data
    }
    
    const fetchData = useCallback(async () => {
        let dataFetched = await getVotingPageJson("Original", queryProps.locale);

        setData(dataFetched);
    }, [queryProps]);

    useEffect(() => {
        fetchData().catch(console.error);
    }, [queryProps]);
       
    const RenderComponent = VotingPageMainJourney;

    return (
        <>
            <RenderComponent {...fullData}/>
        </>
    );
};

export default VotingPage;
