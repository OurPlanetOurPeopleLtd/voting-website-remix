

import {AllContentTypes, AllContentTypesInNavigation, ContentType} from "../Navigation/types";

const blogPost = `title
            slug`;



const videoBlock = `{
                   id,
                   video {
                    muxPlaybackId
                    title
                    width
                    height
                    blurUpThumb
                  }
              }`

const imgBlock = `{responsiveImage
        {src}}`;

const pdfWrapperBlock = `{
            title
            description
               id 
               thumbnail${imgBlock}
               pdf
                {
                  url
                  size
                  _createdAt
                }
          }`


const videoPage = `
                id
                slug
                title
                mainVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
                }    
            `;

const registrationPage = `
                title
                slug
                commentsLabel
                emailLabel
                nameLabel
                submit
                thankYou
                emailValidation
                noEmailValidation
                deregisterMessage
                mainVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
                } 
                
                privacyPolicyLinkText
                privacyPolicyText
                privacyPolicyLabel
                deregisterHeading
                registrationHeading
                   
            `;
const videoWithPdfPage = videoPage + ` 
            followOnLink {      
            url
          }
            pdfs
             ${pdfWrapperBlock}`;
    
const questionBlock = `
    id,
    questionTitleSt{  
        value
        }
        voteForText
        voteAgainstText
        textBelowVoting
    `
const votingPage = `
    hubHeading
    hubSubheading
    hubIntroText
    hubSecondaryText
    hubVideo {
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
    hubLinksHeading
    hubPanelLink {
      ... on HubLinkModelRecord {
        id
        linkTitle
        linkDescription
        linkDestination {
          ... on VideoWithPdfRecord {
            slug
          }
            ...on RegistrationPageRecord {
            slug
          }
          ... on VotingPageModelRecord {
            slug
          }
          ... on BlogPostModelRecord {
          	slug
          }
          ... on SpecialPageRecord {
            slug
            stage
          }
          ... on ExternalLinkModelRecord {
            url
          }
        }
        externalLink
        externalLinkUrl
      }
    } 
            id
            cardTitle,  
            showVoteStatistics,
     
            landingVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
             detailVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
             thankYouVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
                summaryVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
                membersVideo{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
            
            
             proposition1{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
             proposition2{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
             proposition3{
                video${videoBlock}
                thumbnailImage${imgBlock}
            }
            
            openingText{value},
            summaryPdf {
             url
            },
            shareHeading,
            landingHeading,
            votingHeading,
            thanksHeading,
            resultsHeading,
            shareSubheading,
            donateText{value},
            slug,
            questions {
                ... on QuestionRecord { 
                 ${questionBlock}
                 }
            }
            postThankYou${videoBlock}
            postVoteVideo${videoBlock}
            mainVideo${videoBlock}`;


const getNavBlock = (contentType:ContentType) =>
{
    switch(contentType)
    {
 
        case ContentType.PdfAndVideo:
            return `... on InformationSourceRecord{  title}`
        default:
            return `... on ${contentType}{id, slug, title}`
            
    }
}

//AllContentTypes

const basicNavItems = `__typename ${AllContentTypesInNavigation.map(contentType =>getNavBlock(contentType as ContentType) )}`
    
export const QueryBlocks =
{
    BasicNavigationItems: basicNavItems,
    BlogPost: blogPost,
    VideoWithPdfPage: videoWithPdfPage,
    VideoPost: videoPage,
    VotingPage: votingPage,
    VideoComponent: videoPage, 
    RegistrationPage: registrationPage

}