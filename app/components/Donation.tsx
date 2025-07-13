import React from "react";
import "./Donation.scss";
// Removed: import {Button} from "react-bootstrap";
import {recordUse} from "~/utils/analytics";
import {getUserGuid} from "~/repositories/utils/utilities";
import {getDonateTranslation} from "~/repositories/utils/extraTranslations";


export interface TDonationProps {
    locale: string;
}

function GetWhyDonateLink(locale:string)
{

    const supportedLanguageCodesInWeDontate: string[] = [
        "en",
        "de",
        "bg",
        "el",
        "de", // Duplicate 'de' - you might want to review this
        "es",
        "it",
        "hu",
        "da",
        "pl",
        "sv",
        "fi",
        "nl",
        "ro",
        "pt",
        "sk",
        "fr",
        "hr",
        "cz",
        "uk",
    ];
    //if not supported by WeDontate, fall back to english
    if(!supportedLanguageCodesInWeDontate.includes(locale))
    {
        locale = "en";
    }
    return `https://whydonate.com/${locale}/donate/save-our-planet`

}
const Donation= (props: TDonationProps) => {


    // You had an empty return here which is not necessary:
    // return (<>
    //     </>)

    return (
        <>
            <button
                id="donate-button"
                className="btn btn--dark" // Keep your existing CSS classes
                onClick={() => {
                    const width = window.innerWidth * 0.9;
                    const height = window.innerHeight * 0.9;

                    // Calculate the left position
                    const left = window.innerWidth * 0.05;
                    // Calculate the top position
                    const top = window.innerHeight * 0.10;
                    const userGuid = getUserGuid();
                    recordUse({name: "Donate_Clicked", attributes: {page: window.location.pathname, userGuid}});
                    window.open(GetWhyDonateLink(props.locale), "newWindow", `width=${width}, height=${height}, left=${left}, top=${top}`);

                }}
            >
                {getDonateTranslation(props.locale)}
            </button>
        </>
    );

};


export default Donation;