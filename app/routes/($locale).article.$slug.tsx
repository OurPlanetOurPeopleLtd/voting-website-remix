import {page_loader, PageLoaderData} from "~/loaders/page_loader";
import {PageData} from "~/components/PageData";
import {TPage} from "~/repositories/Articles/model";
import {useLoaderData} from "@remix-run/react";



export const loader = page_loader;
export default function ArticlePage() {

    console.log("on page")
    const { data, includedDonateButton, errorMessage } = useLoaderData<PageLoaderData<TPage>>();
    
    if(errorMessage)
    {
        return <>{errorMessage} from article</>
    }

    if (!data)
        return <></>

    return (
        <PageData {...data} includeDonateButton={includedDonateButton}/>
    )
}