import { generateVideoWithPdfPageQuery} from "./query";
import {fetchDataDato, getStaticOrFetch} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapVideoWithPdfData} from "./mappings";
import {getAllItems} from "../Navigation/request";
import {ContentType} from "../Navigation/types";
import {TVideoPage} from "../VideoPage/model";
import {TVideoWithPdfsPage} from "./model";


export const getAllSlugs = async () =>
{
    const items = await getAllItems();
    return items.filter(x => x.__typename === ContentType.VideoWithPdfs).map( x=> x.slug);
}

export const getVideoWithPdfPageJson = (slug: string, locale:string, staticData:boolean = true) => {
    const query = generateVideoWithPdfPageQuery(slug, locale);
    const apiPromise =  fetchDataDato<QueryResult>(query).then(mapVideoWithPdfData);

    return getStaticOrFetch<TVideoWithPdfsPage>("VideoWithPdfsPage", apiPromise, locale, slug, staticData);
};

