import {LoaderFunctionArgs} from "@remix-run/node";
import {TPage} from "~/repositories/Articles/model";
import {getPageJson} from "~/repositories/Articles/request";
import {getVideoWithPdfPageJson} from "~/repositories/VideoWithPdfsPage/request";
import {getLastSlugPart} from "~/repositories/utils/utilities";
import {TVideoWithPdfsPage} from "~/repositories/VideoWithPdfsPage/model";
import {TRegistrationPage} from "~/repositories/Registration/model";
import {useCallback, useEffect, useState} from "react";
import {getRegistrationPage} from "~/repositories/Registration/request";

const DEFAULT_LOCALE = 'en';
type ErrorData =
    {
        message: string,
    }
export type PageLoaderData<TType> = {
    data?: TType;
    slug?:string,
    title?: string,
    includedDonateButton?: boolean;
    resolvedLocale?: string;
    errorMessage?: string;
};
export const just_locale_loader = async ({ request, params }: LoaderFunctionArgs) : Promise<string | undefined> => {
    return params.locale as string | undefined;
}

export const registration_loader = async ({ request, params }: LoaderFunctionArgs) : Promise<PageLoaderData<TRegistrationPage>> => {
   
    
    let locale = params.locale as string | undefined;

    if (!locale) {
        locale = DEFAULT_LOCALE;
    }
    let dataFetched = await getRegistrationPage("registration",locale);
    
   
    
    return {
        data: dataFetched,
        resolvedLocale: params.locale,     
    };
  
}
export const page_loader = async ({ request, params }: LoaderFunctionArgs) : Promise<PageLoaderData<TPage>> => {
    console.log("in loader func")
    let locale = params.locale as string | undefined;
    const slug = params.slug as string | undefined;
    if (!locale) {
        locale = DEFAULT_LOCALE;

    }
    if(!slug)
    {
        return {
            errorMessage: "Slug invalid"
        }
    }

    try {
        const articleData = await getPageJson(slug, locale); // this is type TPage

        if(!articleData)
        {
            return {
                errorMessage: `${slug} Slug Not Found here`
            }
        }

        return {
            data: articleData,
            resolvedLocale: locale,
            slug: slug,
            title: articleData.header,
            includedDonateButton:  slug.includes("donate")
        };
    }
    catch (e :any ){
        console.log(e)
        return {

            errorMessage: e.message
        }
    }

};

export const pdf_page_loader= async ({ request, params }: LoaderFunctionArgs) : Promise<PageLoaderData<TVideoWithPdfsPage>> => {
    
    let locale = params.locale as string | undefined;
    const slug = params.slug as string | undefined;
    if (!locale) {
        locale = DEFAULT_LOCALE;

    }
    if(!slug)
    {
        return {
            errorMessage: "Slug invalid"
        }
    }
    try {
        const videoName = getLastSlugPart(slug);
        const dataFetched = await getVideoWithPdfPageJson(videoName ?? "", locale);

        if(!dataFetched)
        {
            return {
                errorMessage: `${slug} Slug Not Found here`
            }
        }

        return {
            data: dataFetched,
            resolvedLocale: locale,
            slug: slug,
            title: dataFetched.header,
            includedDonateButton:  slug.includes("donate")
        };
    }
    catch (e :any ){
        console.log(e)
        return {

            errorMessage: e.message
        }
    }
}