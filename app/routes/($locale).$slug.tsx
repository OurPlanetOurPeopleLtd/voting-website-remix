import {getPageJson} from "~/repositories/Articles/request";
import {PageData} from "~/components/PageData";
import {TPage} from "~/repositories/Articles/model";

import {useLoaderData} from "@remix-run/react";
import { LoaderFunctionArgs} from "@remix-run/node";


const DEFAULT_LOCALE = 'en';


type ErrorData =
    {
        message: string,
    }
type LoaderData<TType> = {
    data?: TType;
    includedDonateButton?: boolean;
    resolvedLocale?: string;
    errorMessage?: string;
};

export const loader = async ({ request, params }: LoaderFunctionArgs) : Promise<LoaderData<TPage>> => {
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
                errorMessage: `${slug} Slug Not Found`
            }
        }

        return {
            data: articleData,
            resolvedLocale: locale,
            includedDonateButton:  slug.includes("donate")
        };
    }
    catch (e :any ){
        return {

            errorMessage: e.message
        }
    }

};


export const ArticlePage = () => {

    const { data, includedDonateButton, errorMessage } = useLoaderData<LoaderData<TPage>>();

    if(errorMessage)
    {
        return <>errorMessage</>
    }

    if (!data)
        return <></>

    return (
        <PageData {...data} includeDonateButton={includedDonateButton}/>
    )
}