import React, {useEffect, useState} from "react";

import {
    FaFacebook,
    FaTwitter,
    FaShareAlt,
    FaWhatsapp,
} from "react-icons/fa";

// REMOVED: import "./SharingControls.scss"; // This SCSS file is no longer needed

import {getUserGuid} from "~/repositories/utils/utilities";
import {recordUse} from "~/utils/analytics";

export interface ISharingControls {
    voted?: boolean; // Not used in current JSX
    shareHeading?: string;
    shareSubHeading?: string; // Not used in current JSX
    shareButtonText?: string; // Not used in current JSX
    className?: string; // Not used in current JSX
    mainQuestionText?: string;
}

export const SharingControls = ({shareHeading, mainQuestionText}: ISharingControls) => {
    // pageUrl could ideally be derived from window.location.origin + window.location.pathname
    const [pageUrl, setPageUrl] = useState("https://www.ourplanetourpeople.com"); // Consider dynamic URL

    const logoUrl = "https://ourplanetourpeople.com/logo.png"; // Consider dynamic asset import or public URL

    // Refactored share functionality to use onClick directly.
    // This handler attempts native share first, then falls back to clipboard copy.
    const handleCopyOrNativeShare = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default link behavior for the <a> tag
        const userGuid = getUserGuid();

        if (navigator.share) {
            // Use native Web Share API if available
            navigator.share({
                url: pageUrl,
                title: mainQuestionText,
                text: `Please vote! ${logoUrl}`
            })
                .then(() => recordUse({name: "Share_Clicked", attributes: {page: window.location.pathname, userGuid, social:"Native_Share"}}))
                .catch((error) => console.error('Error sharing natively:', error));
        } else {
            // Fallback: Copy to clipboard for browsers that don't support native share
            navigator.clipboard.writeText(pageUrl)
                .then(() => {
                    alert("Link copied to clipboard!"); // Simple user feedback
                    recordUse({name: "Share_Clicked", attributes: {page: window.location.pathname, userGuid, social:"Copy_Clipboard"}});
                })
                .catch((err) => console.error('Failed to copy text: ', err));
        }
    };

    const openSocialWindow = (url: string) => {
        const left = (window.screen.width - 570) / 2;
        const top = (window.screen.height - 570) / 2;
        // Adjusted window features for better security (noopener, noreferrer)
        const params = `menubar=no,toolbar=no,status=no,width=570,height=570,top=${top},left=${left}`;
        window.open(url, "NewWindow", params);
    };

    const handleShare = (platform: string) => {
        let url = "";

        switch (platform) {
            case "facebook":
                url = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(pageUrl)}`;
                break;
            case "twitter":
                url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent('Check this out!')}`;
                break;
            case "whatsapp":
                url = `https://api.whatsapp.com/send?text=${encodeURIComponent(pageUrl)}`;
                break;
            default:
                return;
        }

        const userGuid = getUserGuid();
        recordUse({name: "Share_Clicked", attributes: {page: window.location.pathname, userGuid, social:platform}});

        openSocialWindow(url);
    };

    return (
        // Replaced <Row> elements with `div` and applied Tailwind/custom CSS classes
        <>
            {/* This div replaces the first <Row> to center the heading */}
            <div className="flex flex-col items-center justify-center py-4"> {/* py-4 for vertical spacing */}
                {shareHeading &&
                    <h1 className="frame__heading text-center">{shareHeading}</h1>
                }
            </div>

            {/* This div replaces the second <Row> to center the sharing controls block */}
            <div className="flex justify-center w-full">
                {/* This div replaces the <Col> and holds the main sharing content */}
                {/* Applied custom `sharingControls` for specific styling and `verticalFrameCentre` for centering its content */}
                <div className={"sharingControls verticalFrameCentre"}>
                    {/* This div contains the sharing icons and buttons */}
                    {/* Tailwind classes: flex container, center items, add gap, allow wrapping on small screens */}
                    <div className="sharing-icons__top flex items-center justify-center gap-6 md:gap-8 flex-wrap">
                        {/* WhatsApp Button */}
                        <button type="button" className="sharing-icon-btn"> {/* Use a common class for styling */}
                            <FaWhatsapp onClick={(e) => { e.preventDefault(); handleShare("whatsapp")}} style={{ fontSize: '3rem'}}/>
                            <span className="sr-only">Share via WhatsApp</span> {/* Tailwind for visually-hidden */}
                        </button>

                        {/* Facebook Button */}
                        <button type="button" className="sharing-icon-btn">
                            <FaFacebook onClick={(e) => { e.preventDefault(); handleShare("facebook")}} style={{ fontSize: '3rem'}}/>
                            <span className="sr-only">Share on Facebook</span>
                        </button>

                        {/* Twitter Button */}
                        <button type="button" className="sharing-icon-btn">
                            <FaTwitter onClick={(e) => { e.preventDefault(); handleShare("twitter")}} style={{ fontSize: '3rem'}}/>
                            <span className="sr-only">Share on X</span>
                        </button>

                        {/* Share Link (Native Share / Copy to Clipboard) */}
                        {/* Removed id="copy-link" as onClick directly handles functionality */}
                        <a className="sharing-icon-btn cursor-pointer" onClick={handleCopyOrNativeShare}>
                            <FaShareAlt style={{ fontSize: '3rem'}}/>
                            <span className="sr-only">Share with contacts</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};