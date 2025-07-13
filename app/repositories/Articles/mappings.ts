import {Item, QueryResult} from "./types";
import {TPage} from "./model";


export function mapBlogPost(actualPost: Item | undefined, locale:string) {
    if (!actualPost) {
        throw new Error("no blog post")
    }
    

    const model: TPage = {
        header: actualPost.title,
        heroImageUrl: actualPost.image?.url,
        heroImageAltText: actualPost.image?.description,
        actualPostBody: actualPost.body,
        locale:locale
    };
    return model;
}

export async function mapBlogData(result: QueryResult, locale:string): Promise<TPage | null> {

    const actualPost = result.data.allBlogPostModels.shift();
    if(!actualPost)
        return null;

    return mapBlogPost(actualPost,locale);
}


