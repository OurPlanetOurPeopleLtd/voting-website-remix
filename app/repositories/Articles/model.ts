import {ReactNode} from "react";
import type {StructuredText as TStructuredText} from "datocms-structured-text-utils/dist/types/types";

export interface TPage {
    header: string;
    heroImageUrl?: string;
    heroImageAltText?: string;
    includeDonateButton?: boolean;
    locale: string;
    actualPostBody: TStructuredText;
}