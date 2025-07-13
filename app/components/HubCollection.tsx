import {createAnchorLinkFromTitle} from "~/repositories/utils/utilities";
import "./HubCollection.scss";

import {ContentType, NavigationItem} from "~/repositories/Navigation/types";
import {Video} from "react-datocms";
import {VideoControl} from "./VideoControl";
import {TVideoThumbnail} from "~/repositories/Common/types";

export type THubCollection = {
    items: NavigationItem[]
    title?: string;
    showVideoThumbNails: boolean
    parentTitle?: string;
    pageTitle?: string;
    uniqueKey?: string;
};

export type THubCard =
    {
        cardTitle?: string;
        pageTitle: string;
        pageImageSrc?:string;
        link: string;
        uniqueKey: string;
    }
export type TVideoHubCard = THubCard &
    {        

        videoThumbnail:{responsiveImage:{src:string}}
   
        mainVideo: TVideoThumbnail | undefined;
    }

function getOverrideFontSize(title: string): string | undefined {
    const breakPoint = 40;
    const scaleFactor = 70;
    const overrideFontSize = (title.length > breakPoint);

    if (overrideFontSize) {
        let dynamicSize = (scaleFactor / title.length);
        return `${dynamicSize / 2}rem`;
    }
    return undefined;
}

export const HubCard = (props: THubCard) => {
    const title = props.cardTitle ?? "";
    
    const overrideFontSizeTo = getOverrideFontSize(title);

    return (
        <a href={props.link} className={"card"} key={props.uniqueKey}>
            <div className="card-content">
                {overrideFontSizeTo
                    ? <h2 className="card-title" font-overridded={!!overrideFontSizeTo}
                          style={{fontSize: overrideFontSizeTo}}>{title}</h2>
                    : <h2 className="card-title">{title}</h2>}
                {props.pageImageSrc ? <img src={props.pageImageSrc}/> : null }
            </div>
        </a>)
}
export const VideoHubCard = (props: TVideoHubCard) => {
    const title = props.cardTitle ?? "";


    return (
        <div className={"card"} key={props.uniqueKey}>
        <a href={props.link} >{title}</a>
        <div className="video-card">
            <div className="card-content" key={props.uniqueKey}>

                <VideoControl fullScreenOnClick={true} datoVideo={props.mainVideo?.video?.video} pageTitle={props.pageTitle}
                              videoThumbnail={props.mainVideo?.thumbnailImage.responsiveImage.src}
                              videoTitle={props.mainVideo?.video?.video?.title ?? ""} />

            </div>
        </div></div>)
}
export const HubCollection = (props: THubCollection) => {
    let subHubCollections: any[] = [];
    let mainHubCards: any[] = [];
    createHubCards(props.items);
    const pageTitle = props.pageTitle ?? props.parentTitle ?? "hub_page";


    function createHubCards(items: NavigationItem[]) {
        if (!items)
            return [];
        const pageTitle = props.pageTitle ?? props.parentTitle ?? "hub_page";
        items.forEach((x: NavigationItem, i) => {
            let link = x.slug ?? `#${createAnchorLinkFromTitle(x.title)}`;
            const key = `${x.title}-card-${i}`;

            switch (x.__typename) {
                case ContentType.NavigationGroup:
                    //add card that will link to new hub
                    mainHubCards.push(
                        <HubCard pageTitle={pageTitle} cardTitle={x.title} link={link} uniqueKey={key} key={key}/>
                    )
                    //create a new hub at the bottom

                    subHubCollections.push(<HubCollection pageTitle={pageTitle}
                                                          showVideoThumbNails={x.showVideoThumbnailsInHub ?? false}
                                                          parentTitle={props.title} title={x.title}
                                                          items={x.navigationItem} uniqueKey={"subhub" + key}/>)
                    break;
                case ContentType.VideoPage:

                    if (props.showVideoThumbNails) {
                        mainHubCards.push(
                            <VideoHubCard key={key} pageTitle={pageTitle} cardTitle={x.title} link={link}
                                          videoThumbnail={x.thumbnail}
                                            
                                           uniqueKey={key} mainVideo={x.mainVideo}/>
                        )
                    } else {
                        mainHubCards.push(
                            <HubCard key={key} pageTitle={pageTitle} cardTitle={x.title} link={link} uniqueKey={key}/>
                        )
                    }
                    break;
                case ContentType.VotingPage:
                    mainHubCards.push(
                        <HubCard key={key} pageTitle={pageTitle} cardTitle={x.cardTitle} link={link} uniqueKey={key}/>
                    )
                    break;
                case ContentType.PdfWrapper:
                    mainHubCards.push(
                        <HubCard key={key} pageTitle={pageTitle} pageImageSrc={x.thumbnail.responsiveImage.src} cardTitle={x.title} link={x.pdf.url} uniqueKey={key}/>
                    )
                    break;
                default:
                    mainHubCards.push(
                        <HubCard key={key} pageTitle={pageTitle} cardTitle={x.title} link={link} uniqueKey={key}/>
                    )
                    break;
            }
        })

    }

    //  const title = props.parentTitle ? props.title + ": " + x.title : x.title;

    return (
        <div className="hub"
             key={props.uniqueKey ? `${props.title}-${props.uniqueKey}` : `${props.parentTitle}-${props.title}`}>
            {props.parentTitle ? <h2>{props.parentTitle}:</h2> : null}
            {props.title ? <h2 id={createAnchorLinkFromTitle(props.title)}>{props.title}</h2> : null}
            {mainHubCards}
            {subHubCollections}
        </div>);
}