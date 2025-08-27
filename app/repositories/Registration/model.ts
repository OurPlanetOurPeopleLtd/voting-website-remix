import {TVideoThumbnail} from "../Common/types";

export type TRegistrationPage =
    {
        title: string,
        subtitle: string,
        commentsLabel: string,
        submit: string,
        emailLabel: string,
        nameLabel: string
        mainVideo: TVideoThumbnail,
        emailValidation: string
        thankYou: string
        deregisterMessage: string,
        noEmailValidation: string,
        privacyPolicyLinkText: string
        privacyPolicyText: string
        privacyPolicyLabel: string
        deregisterHeading: string
        registrationHeading: string
    }
export type TRegistrationProps = {
    locale: string
        data:TRegistrationPage
}