import {ContentType, NavigationItem, QueryResult} from "./types";
import {generateNavQuery} from "./query";
import {fetchDataDato, getStaticOrFetch} from "../utils/graphQLfetch";
import {mapNavData} from "./mappings";
import {footerComponentId, headerComponentId} from "../utils/config";

export const getNavigationJson = (id: string, locale:string, staticData:boolean = true) => {
    const query = generateNavQuery(id,locale);
    
    const apiPromise = fetchDataDato<QueryResult>(query).then(mapNavData);
    return getStaticOrFetch<NavigationItem[]>("Navigation", apiPromise, locale, id, staticData);
};

export const getAllSlugs = async () =>
{
    //for navigation slug = id
    return [headerComponentId,footerComponentId];    
}

export const getAllItems = async (): Promise<NavigationItem[]> => {
    const header = await getNavigationJson(headerComponentId, "en", false);
    const footer = await getNavigationJson(footerComponentId, "en", false);
    return [...footer,...header];
}