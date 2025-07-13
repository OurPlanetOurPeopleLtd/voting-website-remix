import { TVideoThumbnail } from "~/repositories/Common/types";
import { VideoControl } from "./VideoControl";

import "./HubPage.scss";

export interface IHubComponentProps {
    id: string;
    heading: string;
    subheading: string;
    introText: string;
    secondaryText: string;
    hubvideo: TVideoThumbnail;
    hubLinksHeading: string;
    panelLink: {
        id: string;
        linkTitle: string;
        linkDescription: string;
        linkDestination: {
            slug: string;
            stage?: number;
        };
        externalLink: boolean;
        externalLinkUrl: string;
    }[];
    locale: string;
}
  
export const HubComponent = (props: IHubComponentProps) => {
    return (
        <div className="hub-container">
            <div className="hub-frame">
                <div className="hub-content">
                    <h1 className="hub-heading">{props.heading}</h1>

                    <div className="hub-text-block">
                        <div dangerouslySetInnerHTML={{__html: props.introText}}></div>

                        <h2 className="hub-subheading">{props.subheading}</h2>
                        <div dangerouslySetInnerHTML={{__html: props.secondaryText}}></div>
                    </div>
                </div>
            </div>

            <div className="hub-panel-right">
                <VideoControl fullScreenOnClick={true}
                                datoVideo={ props.hubvideo.video.video }
                                videoThumbnail={ props.hubvideo.thumbnailImage.responsiveImage.src } />

                <h2 className="content-heading">{props.hubLinksHeading}</h2>

                <div className="hub-links-grid">
                    {props.panelLink.map((link) => (
                        link.externalLink ? (
                            <a
                                key={link.id}
                                href={link.externalLinkUrl}
                                className="hub-card-link"
                                rel="noopener noreferrer"
                            >
                                <h3>{link.linkTitle}</h3>
                                <p>{link.linkDescription}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" fill="currentColor"/></svg>
                            </a>
                        ) : (
                            <a
                                key={link.id}
                                href={`/${props.locale}/${link.linkDestination.slug}${link.linkDestination.stage ? '?stage=' + link.linkDestination.stage : ''}`}
                                className="hub-card-link"
                            >
                                <h3>{link.linkTitle}</h3>
                                <p>{link.linkDescription}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"></path></svg>
                            </a>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};
