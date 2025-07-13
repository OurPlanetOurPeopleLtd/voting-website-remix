import {mapBlogData, mapBlogPost} from "./mappings";
import {QueryResult} from "./types";
import {generatePostQuery, generatePostQueryPaginated} from "./query";
import {fetchDataDato, getStaticOrFetch} from "../utils/graphQLfetch";
import {getAllItems} from "../Navigation/request";
import {ContentType, NavigationItem} from "../Navigation/types";
import {generateNavQuery} from "../Navigation/query";
import {mapNavData} from "../Navigation/mappings";
import {TPage} from "./model";


export const getAllSlugs = async () =>
{
    const items = await getAllItems();
    return items.filter(x => x.__typename === ContentType.BlogPost).map( x=> x.slug);  
}

export const getPageJson = (slug: string, locale: string, staticData:boolean = true) => {
    const query = generatePostQuery(slug, locale);
    const apiPromise = fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
        return mapBlogData(root,locale); //todo handle failure outside of function
    });


 
    return getStaticOrFetch<TPage | null>("Articles", apiPromise, locale, slug, staticData);
};