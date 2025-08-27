import {page_loader, PageLoaderData, pdf_page_loader} from "~/loaders/page_loader";
import {PageData} from "~/components/PageData";
import {TPage} from "~/repositories/Articles/model";
import {useLoaderData} from "@remix-run/react";
import {TVideoWithPdfsPage} from "~/repositories/VideoWithPdfsPage/model";
import {VideoWithPdfs} from "~/components/VideoWithPdfs";
import React from "react";



export const loader = pdf_page_loader;
export default function ArticlePage() {

    console.log("on page")
    const { data, includedDonateButton, errorMessage, resolvedLocale } = useLoaderData<PageLoaderData<TVideoWithPdfsPage>>();
    
    if(errorMessage)
    {
        return <>{errorMessage} from info</>
    }

    if (!data)
        return <></>

    return (
        <>
            <h1>{data.header}</h1>
            {data.introText ? <p className="introText">{data.introText}</p> : null}

            <VideoWithPdfs pdfWrappers={data.pdfs} locale={resolvedLocale} fullScreenOnClick={false} datoVideo={data?.mainVideo?.video?.video ?? undefined} pageTitle={data.videoTitle} videoTitle={data.videoTitle} videoThumbnail={data.mainVideo?.thumbnailImage.responsiveImage.src} ></VideoWithPdfs>
        </>
    );
}