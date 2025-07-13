import {QueryResult} from "./types";


import {TVotingPage} from "./model";

export async function mapVotingPage(result: QueryResult): Promise<TVotingPage> {

    
    const votingPage = result?.data?.votingPageModel;    

    if (!votingPage) {
        throw new Error("no voting data");
    }
    const data:TVotingPage =
        {
            videos: {
                landingVideo: votingPage.landingVideo,
                detailVideo: votingPage.detailVideo,
                thankYouVideo: votingPage.thankYouVideo,
                hubVideo: votingPage.hubVideo,
                summaryVideo: votingPage.summaryVideo,
                membersVideo: votingPage.membersVideo,

                prop1: votingPage.proposition1,
                prop2: votingPage.proposition2,
                prop3: votingPage.proposition3,
            },

            hubHeading: votingPage.hubHeading ?? "",
            hubSubheading: votingPage.hubSubheading ?? "",
            hubIntroText: votingPage.hubIntroText ?? "",
            hubSecondaryText: votingPage.hubSecondaryText ?? "",
            hubLinksHeading: votingPage.hubLinksHeading ?? "",
            hubPanelLink: votingPage.hubPanelLink.map((link) => ({
                id: link.id,
                linkTitle: link.linkTitle,
                linkDescription: link.linkDescription,
                linkDestination: {
                    slug: link.linkDestination.slug,
                    stage: link.linkDestination.stage ?? 0
                },
                externalLink: link.externalLink,
                externalLinkUrl: link.externalLinkUrl
            })),
             
            donateText: votingPage.donateText,

            landingHeading: votingPage.landingHeading ?? "",
            votingHeading: votingPage.votingHeading ?? "",
            thanksHeading: votingPage.thanksHeading ?? "",
            resultsHeading: votingPage.resultsHeading ?? "",
            
            openingText: votingPage.openingText,
            summaryPdf: votingPage.summaryPdf ?? undefined,
            heading: votingPage.heading,
            introText: votingPage.introductionText ?? "",
            mainVideo: votingPage.mainVideo,
            postVoteVideo: votingPage.postVoteVideo,
            postThankYou: votingPage.postThankYou,
            questions: votingPage.questions,
            shareHeading: votingPage.shareHeading ?? "",
            shareSubHeading: votingPage.shareSubheading ?? "",
            showIntroVideo: true,
            showSharePanel: true,
            showStatistics: votingPage.showVoteStatistics ?? false,
            videoThumbnail: votingPage.videoThumbnail

        }
    
    return data;
}