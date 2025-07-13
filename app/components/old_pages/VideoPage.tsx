import {useCallback, useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import {getVideoPageJson} from "~/repositories/VideoPage/request";
import {TArticlePage} from "~/repositories/Common/types";
import {VideoControl} from "~/components/VideoControl";

import "./Page.scss";

import {TVideoPage} from "~/repositories/VideoPage/model";

function getLastSlugPart(slug: string, separator: string = '/'): string | undefined {
    if (!slug) {
        return undefined; // Handle empty or null slugs
    }
    const parts = slug.split(separator);
    return parts.pop();
}

export const VideoPage = (props: TArticlePage) => {
    let {slug, locale} = props;
    const navigate = useNavigate();
    const handleFinish = () => {
        navigate(`/${locale}/donate`);
    };

    const fetchData = useCallback(async () => {
        var videoName = getLastSlugPart(slug);
        let dataFetched = await getVideoPageJson(videoName ?? "", locale);

        setData(dataFetched);
    }, [slug])

    const [data, setData] = useState<TVideoPage>({
        header: "",
        videoTitle: "UnknownVideo",
        mainVideo:  undefined,
        introText: "",
    });
    
    useEffect(() => {
        fetchData().catch(console.error);
    }, [slug, fetchData]);

    return (
        <>
            <h1>{data.header}</h1>  
            {data.introText ? <p className="introText">{data.introText}</p> : null}

            <VideoControl locale={locale} fullScreenOnClick={false} datoVideo={data?.mainVideo?.video?.video ?? undefined} pageTitle={props.title} videoTitle={data.videoTitle} videoThumbnail={data.mainVideo?.thumbnailImage.responsiveImage.src}  {...(slug.includes("detailed-introduction-video") ? { onFinish: () => { handleFinish() } } : {})}></VideoControl>
        </>
    );
};
