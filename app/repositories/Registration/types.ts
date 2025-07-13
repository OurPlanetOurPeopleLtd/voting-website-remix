import { TVideoThumbnail} from "../Common/types";

export interface QueryResult {
    data: Data;
    errors: [];
}

export interface Data {
    registrationPage: TRegistrationItem
}

export type TRegistrationItem = {
    
    title:string,
    commentsLabel: string,
    emailLabel: string,
    nameLabel: string,
    subtitle:string,
    mainVideo: TVideoThumbnail,
    emailValidation: string,
    noEmailValidation: string;
    thankYou: string,
    submit: string,
    deregisterMessage: string,

    privacyPolicyLinkText: string,
    privacyPolicyText: string,
    privacyPolicyLabel: string,
    deregisterHeading: string,
    registrationHeading: string
    
}