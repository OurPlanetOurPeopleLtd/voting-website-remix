import {Video} from "react-datocms/dist/types/VideoPlayer";
import {TQuestionBlock} from "../Navigation/types";
import {StructuredTextDocument} from "react-datocms";
import {TVideoThumbnail} from "../Common/types";
export interface QueryResult {
    data: {votingPageModel:VotingPageData};
    errors: [];
}

export interface VotingPageData {
    hubId: string;
    hubHeading: string;
    hubSubheading: string;
    hubIntroText: string;
    hubSecondaryText: string;
    hubVideo: TVideoThumbnail;
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


    id: string;
    questions?: TQuestionBlock[];
    videoThumbnail:{responsiveImage:{src:string}}

    donateText: {value: StructuredTextDocument};
    openingText: {value: StructuredTextDocument};
    summaryPdf: {url: string};
    mainVideo: { id: string, video: Video };
    postVoteVideo: { id: string, video: Video };
    postThankYou: { id: string, video: Video };    
    cardTitle?: string;

    thankYouVideo: TVideoThumbnail;
    detailVideo: TVideoThumbnail;
    landingVideo: TVideoThumbnail;
    summaryVideo: TVideoThumbnail;
    membersVideo: TVideoThumbnail;

    proposition1: TVideoThumbnail;
    proposition2: TVideoThumbnail;
    proposition3: TVideoThumbnail;
   
    heading?: string;
    showVoteStatistics?: boolean;
    introductionText?: string;
    
    shareHeading?: string;
    landingHeading?: string;
    votingHeading?: string;
    thanksHeading?: string;
    resultsHeading?: string;
    shareSubheading?: string;
    title?: string;
    url?: string;
    slug?: string; 
}
