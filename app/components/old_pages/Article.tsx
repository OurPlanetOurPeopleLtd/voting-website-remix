import React, {useCallback, useEffect, useState} from "react";
import {getPageJson} from "~/repositories/Articles/request";
import {LogException} from "~/repositories/utils/utilities";
import {TArticlePage} from "~/repositories/Common/types";
import {PageData} from "~/components/PageData";
import {TPage} from "~/repositories/Articles/model";

import "./Page.scss";
import "~/components/HubCollection.scss";

export const ArticlePage = (props: TArticlePage) => {
    let {slug, locale} = props;

    const fetchData = useCallback(async () => {
        let dataFetched = await getPageJson(slug, locale);
        if (dataFetched) {
            setData(dataFetched);
        }
    }, [slug, locale])

    const [data, setData] = useState<TPage | null>(null);

    useEffect(() => {
        fetchData().catch(reason => {
            LogException(reason)
        });
    }, [slug, fetchData]);

    const includedDonateButton = slug.includes("donate"); // todo: we should power this via dato
    
    if(!data)
        return <></>
    
    return (
        <PageData {...data} includeDonateButton={includedDonateButton}/>
    )
};
