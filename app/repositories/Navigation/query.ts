//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w

import {getPreview} from "../utils/preview";
import {QueryBlocks} from "../Common/query";
import {LogQuery} from "../utils/utilities";

//todo rename to "Page Group"
function buildNavigationGroup(levels: number): string {
    levels--
    if (levels >= 0)
        return `
        
        __typename
        id
 
        navigationItem {
          ${QueryBlocks.BasicNavigationItems}
          ... on ExternalLinkModelRecord {
            title
            url
          } 
          ... on NavigationGroupModelRecord  {
            title            
            id         
             ${buildNavigationGroup(levels)}           
             showVideoThumbnailsInHub
          }
        
      }`;
    return "";
}

export const navigationGroup = buildNavigationGroup(3)

export function generateNavQuery(id: string,locale:string) {

 
    const query = `
      query findNavById{
        allNavigationGroupModels(filter:{id: {eq:"${id}"}} , locale:${locale},fallbackLocales:[en]) {
     
          ${navigationGroup}
          
        }
      }`;

    LogQuery(query)
    return query;
}
