
import gtag from "./gtag";
import {DataStore} from '@aws-amplify/datastore';
import {Event} from '~/src/models';
import {getUserGuid} from "~/repositories/utils/utilities";
//import {Analytics, EventAttributes} from "@aws-amplify/analytics";



type TTrackingItem = {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventAttributes?: Record<string, any>;
    //  userID: string;
    eventName: string;
    event: string;
    //  eventLabel?: string;
    //  choice?:string;

};

declare global {
    interface Window {
        dataLayer: Array<TTrackingItem>;
        gtag: (...args: any[]) => void;
        gaEnabled: boolean
    }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pushToGaDatalayer = (name: string, userId: string, eventData?: Record<string, any>): void => {

    if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "analytics_event",
            eventName: name,
            eventAttributes: eventData
        });
    }
};


export function EnableAnalytics() {
    window.gaEnabled = true;
    
    if (typeof window !== 'undefined') {
        console.log("Enablng analytics")
        gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
        });
        const userGuid = getUserGuid();
        recordUse({name: "Tracking_Consent_Changed", attributes: {status: 'granted', userGuid}});
    }

    //Analytics.enable();
}

export function InitAnalytics() {
    if (typeof window !== 'undefined') {
        /* Set default consent permission - All denied in our case */
        gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            wait_for_update: 500
        });
    }
}




export function DisableAnalytics() {
    if (typeof window !== 'undefined') {
        console.log("Disabling analytics")
        gtag('consent', 'update', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
        });
        const userGuid = getUserGuid();
        recordUse({name: "Tracking_Consent_Changed", attributes: {status: 'denied', userGuid}});
    }

    window.gaEnabled = false;
   // Analytics.disable();
}

export function recordUse(e: any, userId?: string | null, forceRecord?: boolean | null) {

    pushToGaDatalayer(e.name, userId ?? e?.attributes?.userGuid ?? "unknown_user", e.attributes)
    const force = forceRecord ?? false;
    //Analytics.record(e)

    if (window.gaEnabled || force) {
        DataStore.save(
            new Event({
                "userId": userId,
                "eventName": e.name,
                "attributes": JSON.stringify(e.attributes)
            })
        );
    }
}
