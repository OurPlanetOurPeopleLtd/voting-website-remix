import React, {useEffect, useState} from "react";
import { Col, Row } from "react-bootstrap";
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaShareAlt,
    FaWhatsapp,
} from "react-icons/fa";

import "./SharingControls.scss";
import {getUserGuid} from "~/repositories/utils/utilities";
import {recordUse} from "../utils/analytics";

export interface ISharingControls {
    voted?: boolean;
    shareHeading?: string;
    shareSubHeading?: string;
    shareButtonText?: string;
    className?: string;
    mainQuestionText?: string;
}

export const SharingControls = ({shareHeading, shareSubHeading, mainQuestionText}: ISharingControls) => {
    const [linkAdded, setLinkAdded] = useState(false);
    const [pageUrl, setPageUrl] = useState( "https://www.ourplanetourpeople.com");
    
   
 
    
    const logoUrl = "https://ourplanetourpeople.com/logo.png";
    useEffect(() => {
        if (linkAdded)
            return;

        const copyLink = document.getElementById('copy-link') as HTMLLinkElement;
        if(!copyLink)
            return;

        function getCurrentPage():string
        {
            const cleanUrl = window.location.origin + window.location.pathname;
            return encodeURIComponent(cleanUrl);        
        }
        

        copyLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Get the link's href attribute
            const link = copyLink.href;

            navigator.share({
                url:link, 
                title:mainQuestionText,
                text: `Please vote! ${logoUrl}`
            })

        });
        setLinkAdded(true);
    })

    function record(text: string) {
        const userGuid = getUserGuid();
        recordUse({name: "Share_Clicked", attributes: {page: window.location.pathname, userGuid, social:"Custom"}});
    }

    const openSocialWindow = (url: string) => {
        const left = (window.screen.width - 570) / 2;
        const top = (window.screen.height - 570) / 2;
        const params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
        window.open(url, "NewWindow", params);
    };
    
    const handleShare = (platform: string) => {
        let url = "";

        switch (platform) {
            case "facebook":
                url = `https://www.facebook.com/sharer.php?u=${pageUrl}`;
            break;

            case "twitter":
                url = `https://twitter.com/intent/tweet?url=${pageUrl}&text=Check this out!`;
            break;

            case "whatsapp":
                url = `https://api.whatsapp.com/send?text=${pageUrl}`;
            break;

            default:
            return;
        }

        const userGuid = getUserGuid();
        recordUse({name: "Share_Clicked", attributes: {page: window.location.pathname, userGuid, social:platform}});
        
        openSocialWindow(url);
    };
    
    return (
        <>
            <Row className={"verticalFrameCentre justify-content-center"}>
                {shareHeading &&
                    <h1 className="frame__heading">{shareHeading}</h1>
                }
            </Row>

            <Row>
                <Col className={"squashToRow  sharingControls"}>
                    <div className={"verticalFrameCentre"}>
                        <div className="sharing-icons__top">
                            <button type="button">
                                <FaWhatsapp onClick={(e) => { e.preventDefault(); handleShare("whatsapp")}} style={{ fontSize: '3rem'}}/>
                                <span className="visually-hidden">Share via WhatsApp</span>
                            </button>

                            <button type="button">
                                <FaFacebook onClick={(e) => { e.preventDefault(); handleShare("facebook")}} style={{ fontSize: '3rem'}}/>
                                <span className="visually-hidden">Share on Facebook</span>
                            </button>

                            <button type="button">
                                <FaTwitter onClick={(e) => { e.preventDefault(); handleShare("twitter")}} style={{ fontSize: '3rem'}}/>
                                <span className="visually-hidden">Share on X</span>
                            </button>

                            <a id="copy-link" href={pageUrl}>
                                <FaShareAlt onClick={() => record("Copy")} />
                                <span className="visually-hidden">Share with contacts</span>
                            </a>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}