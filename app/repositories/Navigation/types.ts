import {StructuredTextDocument} from "react-datocms";
import {TPdfWrapper, TVideoThumbnail} from "../Common/types";


export interface QueryResult {
    data: Data
    errors: {}
}

export interface Data {
    allNavigationGroupModels: NavigationItem[]
}

export interface NavigationGroup {
    navigationItem: NavigationItem[]
}

export enum ContentType {
    RegistrationPage = "RegistrationPageRecord",//
    VotingPage = "VotingPageModelRecord",//
    BlogPost = "BlogPostModelRecord",//
    VideoPage = "VideoPageModelRecord",//
    NavigationGroup = "NavigationGroupModelRecord",//
    ExternalLink = "ExternalLinkModelRecord",//
    VotingResult = "VotingResultRecord",
    PdfAndVideo = "InformationSourceRecord",
    PdfWrapper = "PdfWrapperModelRecord",
    VideoWithPdfs = "VideoWithPdfRecord",
    SpecialPageRecord = "SpecialPageRecord",
}

export const AllContentTypes: string[] = Object.values(ContentType);

// Define excludedTypes before using it
export const excludedTypes = [ContentType.ExternalLink,ContentType.PdfWrapper, ContentType.NavigationGroup];

export const AllContentTypesInNavigation: string[] = AllContentTypes.filter(
    (type) => !excludedTypes.includes(type as ContentType)
);

export enum AssetTypes {
    YoutubeVideoEmbed = "YoutubeVideoEmbed",
    GenericImage = "GenericImage",
}
export interface BasePage {
    __typename: ContentType
    slug: string
    title: string
}

export interface TQuestionBlock {
    id: string,
    questionTitleSt: {value: StructuredTextDocument},
    voteForText: string,
    voteAgainstText: string,
    textBelowVoting: string,
}

export interface NavigationItem extends NavigationGroup {
    mainVideo: TVideoThumbnail | undefined;
    cardTitle: string;
    title: string;
    url: string;
    id: string;
    slug: string;
    __typename: ContentType
    showVideoThumbnailsInHub?: boolean
    thumbnail: { responsiveImage: { src: string } };
    pdf:{url:string}  
    pdfs:TPdfWrapper[]
    video:{slug:string}
    resultsHeading?: string,
}
