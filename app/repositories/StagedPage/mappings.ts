import {QueryResult} from "./types";

import {TStagePage} from "./model";


export async function mapSpecialPage(result: QueryResult): Promise<TStagePage> {

    const actualPost = result?.data?.allSpecialPages?.shift();

    if (!actualPost) {
        throw new Error("no stage data");
    }
    const data:TStagePage = {
        stage: actualPost.stage
    };
    return data;
}
