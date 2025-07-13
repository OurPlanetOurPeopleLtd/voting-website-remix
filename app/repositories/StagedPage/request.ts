import {generateSpecialPageQuery} from "./query";
import {fetchDataDato, getStaticOrFetch} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapSpecialPage} from "./mappings";
import {getAllItems} from "../Navigation/request";
import {ContentType} from "../Navigation/types";
import {TStagePage} from "./model";


export const getAllSlugs = async () =>
{
    const items = await getAllItems();
    return items.filter(x => x.__typename === ContentType.SpecialPageRecord).map( x=> x.slug);
}

export const getSpecialPageJson = (slug: string, locale:string, staticData:boolean = true) => {
    const query = generateSpecialPageQuery(slug, locale);
    const apiPromise = fetchDataDato<QueryResult>(query).then(mapSpecialPage);

    return getStaticOrFetch<TStagePage>("StagedPage", apiPromise, locale, slug, staticData);
};

