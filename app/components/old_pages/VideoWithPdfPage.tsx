import React, {useCallback, useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import {TArticlePage} from "~/repositories/Common/types";
import {getVideoWithPdfPageJson} from "~/repositories/VideoWithPdfsPage/request";
import {VideoWithPdfs} from "~/components/VideoWithPdfs";

import "./Page.scss";
import {getLastSlugPart} from "~/repositories/utils/utilities";
import {TVideoWithPdfsPage} from "~/repositories/VideoWithPdfsPage/model";


export const VideoWithPdfsPage = (props: TArticlePage) => {
    const {slug, locale} = props;
    const navigate = useNavigate();

    const [data, setData] = useState<TVideoWithPdfsPage>({
        header: "",
        videoTitle: "UnknownVideo",
        mainVideo:  undefined,
        introText: "",
        pdfs:[],
        followOnLink:""
    });
    
    const handleFinish = () => {
   
        if(data.followOnLink)
        {
            let link = data.followOnLink;
     
            if(link.includes("ourplanetourpeople")) //internal link
            {
                //todo this feels overengineered!
                const internalSlug = getLastSlugPart(link);
                link = `/${locale}/${internalSlug}`;
            }
     
            navigate(link)
        }
    };

    const fetchData = useCallback(async () => {
        const videoName = getLastSlugPart(slug);
        const dataFetched = await getVideoWithPdfPageJson(videoName ?? "", locale);

        setData(dataFetched);
    }, [slug])


    useEffect(() => {
        fetchData().catch(console.error);
    }, [slug, fetchData]);

    return (
        <>
            <h1>{data.header}</h1>  
            {data.introText ? <p className="introText">{data.introText}</p> : null}

            <VideoWithPdfs pdfWrappers={data.pdfs} locale={locale} fullScreenOnClick={false} datoVideo={data?.mainVideo?.video?.video ?? undefined} pageTitle={props.title} videoTitle={data.videoTitle} videoThumbnail={data.mainVideo?.thumbnailImage.responsiveImage.src}  {...(slug.includes("in-depth") ? { onFinish: () => { handleFinish() } } : {})}></VideoWithPdfs>
        </>
    );
};
