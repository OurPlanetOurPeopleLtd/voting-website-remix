
import {LogQuery} from "../utils/utilities";
import {QueryBlocks} from "../Common/query";

export function generateRegistrationPageQuery(locale:string) {
   
    const query = `query videoPageCollectionQuery {
          registrationPage(locale:${locale} fallbackLocales:[en]) 
          {           
               id      
              __typename
              ${QueryBlocks.RegistrationPage}
            
          }
    }`

    LogQuery(query);

    return query;
}
