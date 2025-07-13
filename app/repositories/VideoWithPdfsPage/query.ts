
import {getPreview} from "../utils/preview";
import {LogQuery} from "../utils/utilities";
import {QueryBlocks} from "../Common/query";

export function generateVideoWithPdfPageQuery(slug: string, locale:string) {

    const isPreview = getPreview();
    const query = `query videoPdfPageCollectionQuery {
  allVideoWithPdfs(first: 1, filter: {slug: {eq:"${slug}"}} , locale:${locale} fallbackLocales:[en]) 
  {   
      
       id      
      __typename
      ${QueryBlocks.VideoWithPdfPage}
    
  }
}`

    LogQuery(query);

    return query;
}
