import {NavigationItem} from "../Navigation/types";
import {Video} from "react-datocms/dist/types/VideoPlayer";

export interface QueryResult {
    data: Data
    errors: {}
}

export interface TVideoThumbnail {
    thumbnailImage: {responsiveImage: {src: string}};
    video: { id: string, video: Video };
}
export type Data =  {
    registrationPage: NavigationItem,
    allVideoPageModels: NavigationItem[],
    allBlogPostModels: NavigationItem[],
    allVideoWithPdfs: NavigationItem[],
    allSpecialPages: NavigationItem[],
    votingPageModel: NavigationItem,
    votingResult: NavigationItem,
}

// Get keys
export const allNavigationParts  = [
    "registrationPage",
    "allVideoPageModels",
    "allBlogPostModels",
    "allVideoWithPdfs",
    "allSpecialPages",
    "votingPageModel",
    "votingResult",
];

export type TArticlePage = {
    slug: string;
    title?: string;
    locale: string;
};
export interface Sys {
    id: string
}

export type TPdfWrapper =
    {
        title: string;
        description: string;
        createdDate?:Date;
        thumbnail: { responsiveImage: { src: string } };
        pdf:{url:string, size:number, _createdAt:string}
    }
