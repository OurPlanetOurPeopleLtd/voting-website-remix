import {fetchDataDato, getStaticOrFetch} from "../utils/graphQLfetch";
import {allNavigationParts, QueryResult} from "./types";
import {NavigationItem} from "../Navigation/types";
import {LogErrors} from "../utils/utilities";
import {footerComponentId, headerComponentId} from "../utils/config";
import {mapRegistration} from "../Registration/mappings";
import {TRegistrationPage} from "../Registration/model";

const getNavBlocks = (locale:string):string =>  allNavigationParts.map(name =>
      ` ${name}(locale:${locale}, fallbackLocales:[en]){
                  __typename
                    id
                    title
                    slug
                  }`
        
    ).join("")



function generateAllPagesForNavQuery(locale:string) {

    return `query navQuery{ 
        ${getNavBlocks(locale)}    
    }`;
}

function mapAllSlugs(root: QueryResult): NavigationItem[] {
    return root?.data?.allVideoPageModels
        .concat(root.data.registrationPage)
        .concat(root.data.allVideoWithPdfs)
        .concat(root.data.allBlogPostModels)
        .concat(root.data.votingPageModel)
        .concat(root.data.allSpecialPages)
        .concat(root.data.votingResult);
}

export const getAllSlugs = async () =>
{
    //for navigation slug = id
    return [undefined]
}

export const getAllNavData = (slug:string, locale:string, staticData:boolean = true) => {
    const query = generateAllPagesForNavQuery(locale);

    const apiPromise = fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
       
        if (root.errors) {
            console.log(root.errors)
            LogErrors(root.errors)
        }

        return mapAllSlugs(root); //todo handle failure outside of function

    });

    

    return getStaticOrFetch<NavigationItem[]>("Common", apiPromise, locale, slug, staticData);
};