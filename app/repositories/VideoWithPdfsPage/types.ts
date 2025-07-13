
import {VideoItem} from "../VideoPage/types";
import {TPdfWrapper} from "../Common/types";


export interface QueryResult {
    data: Data;
    errors: [];
}

export interface Data {
    allVideoWithPdfs: VideoWithPdfItem[]
}


export interface VideoWithPdfItem extends VideoItem{

    followOnLink: {url:string}
    pdfs: TPdfWrapper[]
}




