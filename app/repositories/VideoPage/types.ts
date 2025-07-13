
import {Sys, TVideoThumbnail} from "../Common/types";

export interface QueryResult {
    data: Data;
    errors: [];
}

export interface Data {
    allVideoPageModels: VideoItem[]
}


export interface VideoItem {

    mainVideo: TVideoThumbnail,
    sys: Sys
    __typename: string
    slug: string
    title: string
    introText?: string,

}



