import {StructuredTextDocument} from "react-datocms";
import {Video} from "react-datocms/dist/types/VideoPlayer";
import {TQuestionBlock} from "../Navigation/types";
import {Choice} from "../../models";
import {TVideoThumbnail} from "../Common/types";

export interface TVideos {
    detailVideo: TVideoThumbnail;
    thankYouVideo: TVideoThumbnail;
    landingVideo: TVideoThumbnail;
    hubVideo: TVideoThumbnail;
    summaryVideo: TVideoThumbnail;
    membersVideo: TVideoThumbnail;

    prop1: TVideoThumbnail;
    prop2: TVideoThumbnail;
    prop3: TVideoThumbnail;
}

export interface TVotingPage {
    videos?: TVideos;
    donateText?: { value: StructuredTextDocument };
    openingText?: { value: StructuredTextDocument };
    summaryPdf?: { url: string };
    heading?: string;
    introText: string;
    mainVideo: { id: string, video: Video };
    postVoteVideo?: { id: string, video: Video };
    postThankYou?: { id: string, video: Video };
    questions?: TQuestionBlock[];

    hubHeading: string;
    hubSubheading: string;
    hubIntroText: string;
    hubSecondaryText: string;
    hubLinksHeading: string;
    hubPanelLink: {
        id: string;
        linkTitle: string;
        linkDescription: string;
        linkDestination: {
            slug: string;
            stage?: number;
        };
        externalLink: boolean;
        externalLinkUrl: string;
    }[];

    shareHeading: string;
    landingHeading?: string;
    votingHeading?: string;
    thanksHeading?: string;
    resultsHeading?: string;
    shareSubHeading: string;

    showIntroVideo: boolean;
    showSharePanel: boolean;
    showStatistics: boolean;
    videoThumbnail: { responsiveImage: { src: string } } | undefined;
}

export interface TVotingPageExtended extends TVotingPage {
    locale: string;
    voteResultCallBack?: (voted: boolean) => void,
    voteChangedCallBack?: (choice: Choice) => void,
    watchedCallBack?: () => void,
    watched: boolean,
    voted: boolean,
}

export interface TVotingQueryProps {
    locale: string
    id: string
}