import {getPreview} from "../utils/preview";
import {LogQuery} from "../utils/utilities";
import {QueryBlocks} from "../Common/query";

export function generateSpecialPageQuery(slug: string, locale:string) {

    const isPreview = getPreview();
    const query = `query specialPageQuery {
  allSpecialPages(first: 1, filter: {slug: {eq:"${slug}"}} , locale:${locale} fallbackLocales:[en]) 
  {    
      
       id      
      __typename
      slug
      title
       stage
    
  }
}`

    LogQuery(query);
    return query;
}
