//todo consider having this as a typed generic
import {HandleErrors} from "./utilities";

export const node_env = process.env.NODE_ENV;

//temp override while I work out why env variables dont work
export const developmentSpace = "dev" //todo set to development when i work out whats going on with that...

export const APP_CONTENTFUL_ACCESS_TOKEN = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN ?? "f0565dcceef2eae29b1536d3d6157a";
export const APP_CONTENTFUL_ENVIRONMENT = process.env.REACT_APP_CONTENTFUL_ENVIRONMENT ?? node_env === "development" ? developmentSpace : "main";

const TOKEN = APP_CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = "";// APP_CONTENTFUL_ENVIRONMENT;
export const CONTENT_URL = 'https://graphql.datocms.com/'; //`https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`;

export const fetchDataDato = <TType>(query: string) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-Environment': ENVIRONMENT,
            Accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({query}),
    };

    
    return fetchData<TType>(CONTENT_URL, query, options);
}

const fetchData = async <TType>(
    url: string,
    query: string,
    options: RequestInit
): Promise<TType> => {
 
    //console.log("Fetching data " + count++ );
    

    return await fetch(url, options).then((res) => {
        const result = res.json();
        HandleErrors(result)
        return result
    });
};

// Function to read JSON from the public/data directory
interface Result<T> {
    success: boolean;
    data?: T;
    error?: Error;
}

// Function to read JSON from the public/data directory
async function readStaticJson<T>(filePath: string): Promise<Result<T>> {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json() as T;
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}

export async function getStaticOrFetch<T>(
    fileNamePrefix: string,
    apiPromise: Promise<T>,
    locale: string,
    slug: string,
    staticData: boolean = false
): Promise<T> {
    if (staticData) {
        
        const fileName = `${fileNamePrefix}_${locale}_${slug}.json`;
        const filePath = `/data/${fileName}`;

        const staticResult = await readStaticJson<T>(filePath);

        if (staticResult.success && staticResult?.data) {
            return staticResult.data;
        } else {
            console.log('\x1b[33m%s\x1b[0m',`Falling back to API for ${fileName}:`, staticResult.error);
        }
    }

    return apiPromise;
}