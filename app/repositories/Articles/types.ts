import type {StructuredText as TStructuredText} from 'datocms-structured-text-utils';
import {Sys} from "../Common/types";


export interface QueryResult {
    data: Data;
    errors: [];
}

export interface Data {
    allBlogPostModels: Item[];
    allBlogPostModelNews: Item[];
}

export interface Image {
    title: string;
    url: string;
    description: string;
}

export interface Item {
    sys: Sys;
    title: string;
    author: Author;
    slug: string;
    image: Image;
    body: TStructuredText;
}


export interface Author {
    name: string;
    image: any;
}


