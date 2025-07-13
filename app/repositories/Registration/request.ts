import {generateRegistrationPageQuery} from "./query";
import {fetchDataDato, getStaticOrFetch} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapRegistration} from "./mappings";
import {getAllItems, getNavigationJson} from "../Navigation/request";
import {ContentType} from "../Navigation/types";
import {TPage} from "../Articles/model";
import {TRegistrationPage} from "./model";

export const getAllSlugs = async () =>
{
    const items = await getAllItems();
    return items.filter(x => x.__typename === ContentType.RegistrationPage).map( x=> x.slug);
}

export const getRegistrationPage = (slug:string, locale:string, staticData:boolean = true) => {
    const query = generateRegistrationPageQuery( locale);
    const apiPromise = fetchDataDato<QueryResult>(query).then( mapRegistration);

    return getStaticOrFetch<TRegistrationPage>("Registration", apiPromise, locale, slug, staticData);
};