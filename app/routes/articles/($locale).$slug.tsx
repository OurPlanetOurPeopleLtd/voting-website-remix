import {getPageJson} from "~/repositories/Articles/request";
import {PageData} from "~/components/PageData";
import {TPage} from "~/repositories/Articles/model";

import {useLoaderData} from "@remix-run/react";
import { LoaderFunctionArgs} from "@remix-run/node";


const DEFAULT_LOCALE = 'en';


type LoaderData<TType> = {
    data: TType;
    includedDonateButton: boolean;
    resolvedLocale: string;
};

export const loader = async ({ request, params }: LoaderFunctionArgs) : Promise<LoaderData<TPage>> => {
    let locale = params.locale as string | undefined;
    const slug = params.slug as string | undefined;
    if (!locale) {
        locale = DEFAULT_LOCALE;

    }
    if(!slug)
    {
        throw new Response('Slug not valid', { status: 404 });
    }

    const articleData = await getPageJson(slug, locale); // this is type TPage
    if(!articleData)
    {
        throw new Response('Not Found', { status: 404 });
    }

    return {
        data: articleData,
        resolvedLocale: locale,
        includedDonateButton:  slug.includes("donate")
    };
};


export const ArticlePage = () => {

    const { data, includedDonateButton } = useLoaderData<LoaderData<TPage>>();
    
    

    if (!data)
        return <></>

    return (
        <PageData {...data} includeDonateButton={includedDonateButton}/>
    )
}