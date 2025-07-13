import {getPreview} from "../utils/preview";
import {LogQuery} from "../utils/utilities";
import {QueryBlocks} from "../Common/query";

export function generateVideoPageQuery(slug: string, locale:string) {

    const isPreview = getPreview();
    const query = `query videoPageCollectionQuery {
  allVideoPageModels(first: 1, filter: {slug: {eq:"${slug}"}} , locale:${locale} fallbackLocales:[en]) 
  {
    
      
       id      
      __typename
      ${QueryBlocks.VideoPost}
    
  }
}`

    LogQuery(query);

    return query;
}
