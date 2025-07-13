import type {StructuredText as TStructuredText} from "datocms-structured-text-utils/dist/types/types";
import React, {ReactNode} from "react";
import {renderNodeRule, StructuredText} from "react-datocms";
import {isParagraph} from "datocms-structured-text-utils";
import {ContentType, NavigationItem} from "~/repositories/Navigation/types";
import {HubCollection} from "~/components/HubCollection";
import {TArticlePage, TVideoThumbnail} from "~/repositories/Common/types";
import {getLogger} from "./logger";
import { VideoControl } from "~/components/VideoControl";

function datoRichTextToReactNode(content: TStructuredText): ReactNode {


    //see https://github.com/datocms/react-datocms/blob/master/docs/structured-text.md for documentation
    return (
        <StructuredText
            data={content}

            customNodeRules={[
                renderNodeRule(
                    isParagraph,
                    ({adapter: {renderNode}, node, children, key}) => {
                        // If the paragraph contains an inline record, remove the surrounding p tags
                        if (node.children[0]?.type === 'inlineItem') {

                            return (
                                <React.Fragment key={key}>
                                    {children}
                                </React.Fragment>
                            );
                        } else {
                            // Otherwise render the p tags

                            return renderNode(
                                'p',
                                {
                                    key,
                                },
                                children,
                            );
                        }
                    },
                ),
            ]}
            renderInlineRecord={({record}) => {
                // Check for undefined __typename and log it for debugging
    const { __typename, id, ...props } = record;
    
    if (!__typename) {
        console.warn("Record missing __typename:", record);
    }

                if (__typename === "VideoAndThumbnailRecord") {
                    const videoRecord = record as {
                        video?: {
                            video?: TVideoThumbnail; // this is the actual Mux video object
                        };
                        thumbnailImage?: {
                            responsiveImage?: {
                                src: string;
                            };
                        };
                    };
                
                    const video = videoRecord.video?.video;
                    const thumbnail = videoRecord.thumbnailImage?.responsiveImage?.src;
                
                    if (video) {
                        return (
                            <VideoControl
                                datoVideo={video}
                                videoThumbnail={thumbnail}
                                fullScreenOnClick={false}
                                autoPlay={false}
                            />
                        );
                    } else {
                        return <p style={{ color: 'red' }}>Missing video data</p>;
                    }
                }

                if (__typename === "GenericImageModelRecord") {
                    const { image, title } = record as {
                        image?: {
                            url: string;
                            alt?: string | null;
                        };
                        title?: string | null;
                    };
                
                    return (
                        <img
                            src={image?.url}
                            alt={image?.alt || title || 'Image without alt text'}
                            className="article-inline-image"
                            loading="lazy"
                        />
                    );
                }

                if (__typename === ContentType.NavigationGroup) {
                    const navItem = record as unknown as NavigationItem;
                    return (<HubCollection pageTitle={record.id}
                                           showVideoThumbNails={navItem?.showVideoThumbnailsInHub ?? false}
                                           items={navItem.navigationItem}></HubCollection>);
                }
                if (__typename === ContentType.BlogPost || record.__typename === ContentType.VideoPage) {
                    const page = record as unknown as TArticlePage;
                    return (
                        <a href={page.slug} className={"card"}>
                            <div className="card-content">
                                <h2>{page.title}</h2>
                            </div>
                        </a>
                    );
                }

                return <pre>props</pre>;
            }}

            renderBlock={({record}) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {__typename, id, ...props} = record;

                switch (__typename) {
                    case 'ContentTableRecord': {
                        const table = (props.htmlTable as string).replace(
                            /height="[^"]+"/,
                            '',
                        );
                        return (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: table,
                                }}
                            ></div>
                        );
                    }
                    default:
                        return null;
                }
            }}
        ></StructuredText>
    );
}

export function getReactFromStructuredText(text:TStructuredText)
{
    let react = null;
    try {
        react = datoRichTextToReactNode(text);
    } catch (e) {
        const logger = getLogger('Exception');
        logger.error(e);
    }
    return react;
}