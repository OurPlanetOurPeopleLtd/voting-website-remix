
import {getPreview} from "../utils/preview";
import {navigationGroup} from "../Navigation/query";
import {LogQuery} from "../utils/utilities";
import {QueryBlocks} from "../Common/query";

export function generatePostQueryPaginated(page: number, locale: string, blogsPerPage: number = 10) {

    const first: number = blogsPerPage;
    const skip: number = page * blogsPerPage;
    return generatePostQueryFrom(locale, true, undefined, first, skip);
}

function generatePostQueryFrom(locale:string, shortBlog: boolean, sentSlug: string | undefined, first: number, skip: number) {
    const queryString = sentSlug ? `, filter: {slug: {eq:"${sentSlug}"}}` : "";
    const query = `query blogPostCollectionQuery{
    allBlogPostModel${shortBlog ? "News" : "s"}(first: ${first}, skip:${skip} ${queryString}, locale:${locale}, fallbackLocales:[en]) 
    {
      
      
        id        
        title,    
        
         ${!shortBlog ? `  
        author{name,image{title,url}}       
        slug    
        image{title,url,alt}` : ""
    }
        
        body {
              value 
              
                  links
                  {       
        
                        ... on  BlogPostModelRecord{                  
                          ${QueryBlocks.BlogPost}
                        }

                                ... on VideoAndThumbnailRecord {
                                __typename
          id
          video {
            id
            video {
              muxPlaybackId
              title
              width
              height
              blurUpThumb
            }
          }
          thumbnailImage {
            responsiveImage {
              src
            }
          }
        }
                  
                        ... on GenericImageModelRecord {
                          __typename
      id
      image {
        url
        title
        alt
        responsiveImage {
          srcSet
          webpSrcSet
          sizes
          src
          width
          height
          aspectRatio
          alt
          title
          base64
        }
      }
      title
    }
                          
                        

                        ... on  NavigationGroupModelRecord{
                          __typename                 
                          title
                          showVideoThumbnailsInHub
                          ${navigationGroup}
                        }
                        ... on  YoutubeVideoEmbedModelRecord{
                          __typename
                          ytembedUrl
                          title
                          autoPlay
                          
                        }
                      
                  }
            
              }
        
      }
    
  }
`;

    LogQuery(query);
    return query;
}

export function generatePostQuery(slug: string, locale: string) {
    const isPreview = getPreview();
    const first: number = 1;
    const skip: number = 0;
    const sentSlug: string | undefined = slug;
    return generatePostQueryFrom(locale,false, sentSlug, first, skip);
}
