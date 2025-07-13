import {QueryResult} from "./types";

import {TRegistrationPage} from "./model";


export async function mapRegistration(result: QueryResult): Promise<TRegistrationPage> {

    const rec = result.data.registrationPage;
    const data: TRegistrationPage =
    {
        emailValidation: rec.emailValidation, 
        thankYou: rec.thankYou,
        title: rec.title,
        commentsLabel: rec.commentsLabel,
        emailLabel: rec.emailLabel,
        subtitle: rec.subtitle,
        nameLabel: rec.nameLabel,
        mainVideo: rec.mainVideo,
        submit: rec.submit,
        noEmailValidation: rec.noEmailValidation,
        deregisterMessage: rec.deregisterMessage,
        privacyPolicyLinkText: rec.privacyPolicyLinkText,
        privacyPolicyText: rec.privacyPolicyText,
        privacyPolicyLabel: rec.privacyPolicyLabel,
        deregisterHeading: rec.deregisterHeading,
        registrationHeading: rec.registrationHeading,
    }
    
    return data;
}