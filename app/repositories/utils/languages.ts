
import countryCodeToFlagEmoji from "country-code-to-flag-emoji";
import {fetchDataDato} from "./graphQLfetch";
export const defaultLanguage = "en";


const localesQuery = `query {
  _site {
    locales # -> ["en", "it", "fr"]
  }
}`

interface QueryResult
{
    data:
        {
            _site: {
                locales: string[]
            }
        }
}

export type CountryFlag =
{
    code:string;
    flag:string;
}


export const defaultFlag = {code:"en", flag:countryCodeToFlagEmoji("en")}


export const getSupportedLocales = async (): Promise<string[]> => {
   
    const root: QueryResult = await fetchDataDato<QueryResult>(localesQuery);
    const supportedLanguages = root.data._site.locales;   

    return supportedLanguages;
};

export const getSupportedCountries = async ()  => {

  
    const locales = await getSupportedLocales();
    const supportedCountries:CountryFlag[] = [];
    locales.forEach( (supportedLanguage) => 
    {
      
        let supportedLanguageForFlag = supportedLanguage .replace("_","-")
        if(supportedLanguageForFlag == "en")
        {
            supportedLanguageForFlag = "en-gb";
        }
        const flagCode: CountryFlag = {code:supportedLanguage, flag:countryCodeToFlagEmoji(supportedLanguageForFlag)};
        
        supportedCountries.push(flagCode)
    })
    return supportedCountries;
    
}
    

