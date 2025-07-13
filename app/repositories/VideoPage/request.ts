import {generateVideoPageQuery} from "./query";
import {fetchDataDato, getStaticOrFetch} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapVideoData} from "./mappings";
import {getAllItems} from "../Navigation/request";
import {ContentType} from "../Navigation/types";
import {TVideoPage} from "./model";

export const getAllSlugs = async () =>
{
    const items = await getAllItems();
    return items.filter(x => x.__typename === ContentType.VideoPage).map( x=> x.slug);
}

export const getVideoPageJson = (slug: string, locale:string, staticData:boolean = true) => {
    const query = generateVideoPageQuery(slug, locale);
    const apiPromise = fetchDataDato<QueryResult>(query).then(mapVideoData);

    return getStaticOrFetch<TVideoPage>("VideoPage", apiPromise, locale, slug, staticData);
};

