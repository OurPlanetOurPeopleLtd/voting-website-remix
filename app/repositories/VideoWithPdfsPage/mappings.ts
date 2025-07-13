import {QueryResult, VideoWithPdfItem} from "./types";

import {TPdfWrapper} from "../Common/types";
import {TVideoWithPdfsPage} from "./model";


export async function mapVideoWithPdfData(result: QueryResult): Promise<TVideoWithPdfsPage> {
    
    const actualPost = result?.data?.allVideoWithPdfs?.shift() as VideoWithPdfItem;

    if (!actualPost) {
        throw new Error("no video data");
    }
    
    function decoratePdfWrapper(original:TPdfWrapper) : TPdfWrapper
    {
        return  {
            ...original,
            createdDate: new Date(original.pdf._createdAt)
        }
    }
    
    const data:TVideoWithPdfsPage =  {
        pdfs: actualPost.pdfs.map( decoratePdfWrapper),
        header: actualPost.title,
        introText: actualPost.introText,
        videoTitle: actualPost.mainVideo?.video?.video?.title ?? undefined,
        mainVideo: actualPost.mainVideo,
        followOnLink : actualPost.followOnLink?.url ?? undefined,
    };
  
    return data;
}