
import {fetchDataDato, getStaticOrFetch} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import { mapVotingPage} from "./mappings";
import {generateVotingPageQuery} from "./query";
import {LogQuery} from "../utils/utilities";
import {getAllItems} from "../Navigation/request";
import {ContentType} from "../Navigation/types";
import {TVideoPage} from "../VideoPage/model";
import {TVotingPage} from "./model";

export const getAllSlugs = async () => {
    return ["Original"];
}

export const getVotingPageJson = (slug: string, locale: string, staticData: boolean = true) => {
    const query = generateVotingPageQuery(slug, locale);

    const apiPromise = fetchDataDato<QueryResult>(query).then(mapVotingPage);

    return getStaticOrFetch<TVotingPage>("VotingPage", apiPromise, locale, slug, staticData);
};

