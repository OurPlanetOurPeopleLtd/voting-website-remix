import {just_locale_loader, PageLoaderData, registration_loader} from "~/loaders/page_loader";

import {useLoaderData} from "@remix-run/react";

import React from "react";
import {RegistrationPage} from "~/components/old_pages/RegistrationPage";
import {TRegistrationPage} from "~/repositories/Registration/model";



export const loader = registration_loader;
export default function ArticlePage() {

    console.log("on page")
    const {data, resolvedLocale} = useLoaderData<PageLoaderData<TRegistrationPage>>();
    
    if(!data)
        return <>Could not load data</>
    return (
        <>
        <RegistrationPage locale={resolvedLocale ?? "en"} data={data}/>
        </>
    );
}