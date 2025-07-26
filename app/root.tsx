// app/root.tsx
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useLocation, // To get current path for analytics
    useNavigate, // To programmatically navigate for locale switching
} from '@remix-run/react';
import { json } from '@remix-run/node';
import type {  MetaFunction, LoaderFunctionArgs } from '@remix-run/node';
import React, { useCallback, useEffect, useState } from 'react';
import { CookieConsent, getCookieConsentValue } from 'react-cookie-consent';
import { v4 as generateGuid } from 'uuid';


// --- Style Imports ---
// --- Asset Imports ---
import logo from '../logo.png'; // Make sure this path is correct relative to root.tsx or use public folder path

// --- Utility/Repository Imports ---
import { DisableAnalytics, EnableAnalytics } from '~/utils/analytics'; // Adjust path
import { DynamicNavList } from '~/components/DynamicNavList'; // Adjust path
import { DynamicFooter } from '~/components/DynamicFooter'; // Adjust path
import FlagSelect from '~/components/FlagSelect'; // Adjust path
import { getCookieBannerText } from '~/repositories/utils/extraTranslations'; // Adjust path
import { localStorageVotingIdKey } from '~/repositories/utils/utilities'; // Adjust path
import { defaultLanguage } from '~/repositories/utils/languages'; // Adjust path
import { footerComponentId, headerComponentId } from '~/repositories/utils/config'; // Adjust path
import 'tailwindcss/tailwind.css';
import "~/components/BootStrapBase.css";
import "~/components/old_pages/VotingPage.scss";
import "~/components/old_pages/Page.scss";
import "~/components/Layout.scss";
import "~/components/CopiedStyles.css";

// --- Remix Link and Meta Functions ---
// These define the <link> and <meta> tags for the entire document
/*
export const links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: layoutStyles },
        // You might add Tailwind's output CSS here once built:
        // { rel: 'stylesheet', href: '/build/tailwind.css' }, // Example for built Tailwind CSS
    ];
};*/

export function links() {
    return [
     /*   { rel: 'stylesheet', href: '~/components/BootstrapBaseline.css' },
        { rel: 'stylesheet', href: '~/components/CustomComponentStyles.css' },
        { rel: 'stylesheet', href: '~/components/DynamicHeader.css' },*/
        // ... (any other stylesheets you want loaded globally)
    ];
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    // Access data from the root loader for dynamic meta tags
    const { title: rootTitle, cookieText } = data || {};
    const defaultTitle = "Our Planet Our People";

    return [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { title: rootTitle ? `${rootTitle} - ${defaultTitle}` : defaultTitle }, // Set document title
        { tagName: 'html', attributes: { lang: data?.locale || 'en' } }, // Set HTML lang based on detected locale
        // You can add other global meta tags here (e.g., site description, favicon, etc.)
        // Note: Favicon meta tags are often dynamically rendered from a CMS,
        // so you might move that logic from your previous homepage root.tsx if it was there.
    ];
};

// --- Root Loader ---
// This loader runs on every request for any page in your app.
// It's ideal for fetching data needed by the global layout (header, footer, cookie banner text).
export type RootLoaderData = {
    locale: string;
    cookieText: ReturnType<typeof getCookieBannerText>;
    // Add any other data needed by DynamicNavList or DynamicFooter here
    // For example: headerNavData: HeaderNavData, footerData: FooterData
    title?: string; // Initial title for root, can be overridden by child routes
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    // Determine locale from URL or headers for SSR
    // This is a simplified example; a real i18n solution might use Accept-Language header
    // or more robust URL parsing.
    let locale = params.locale as string || defaultLanguage; // Assuming your routes are like /en/page or /page
    // If you are using optional locale segment like ($locale)._index.tsx
    // then the locale will be available in the child loader, and you'd pass it from there.
    // For root, it's generally best to parse it from the URL or a cookie/header.
    // Let's assume for simplicity you get it from the URL or it defaults.

    // Fetch cookie banner text for the resolved locale
    const cookieBannerText = getCookieBannerText(locale);

    // You might also fetch data for DynamicNavList and DynamicFooter here
    // const headerNavData = await fetchHeaderNavData(locale);
    // const footerData = await fetchFooterData(locale);

    return json<RootLoaderData>({
        locale,
        cookieText: cookieBannerText,
        // headerNavData,
        // footerData,
        title: "Home", // Default title for the entire app, can be overridden by specific routes
    });
};

// --- Root Component ---
// This is your main App component that renders the layout
export default function App() {
    const { locale, cookieText, title: rootTitle } = useLoaderData<RootLoaderData>();
    const location = useLocation(); // Get current URL path
    const navigate = useNavigate(); // For programmatic navigation (e.g., locale change)

    const [expanded, setExpanded] = useState(false);
    const [analyticsEnabled, setAnalyticsEnabled] = useState(() => {
        // Client-side only check for cookie consent on first render
        if (typeof window !== 'undefined') {
            return getCookieConsentValue('OurPeopleOurPlanetAnalyticsAcceptance') ?? false;
        }
        return false;
    });

    const toggleExpanded = () => setExpanded(!expanded);

    // Set up Analytics based on analyticsEnabled state
    useEffect(() => {
        let userGuid = localStorage.getItem(localStorageVotingIdKey);
        if (!userGuid || userGuid.length < 1) {
            userGuid = generateGuid();
            localStorage.setItem(localStorageVotingIdKey, userGuid);
        }
        let trackingAttributes = {
            userId: userGuid,
        };  

        if (analyticsEnabled) {
            EnableAnalytics();
        } else {
            DisableAnalytics();
        }
    }, [analyticsEnabled]);

    // Handle cookie reset logic
    const resetCookie = useCallback((name: string, path?: string, domain?: string): void => {
        let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        if (path) {
            cookieString += ` path=${path};`;
        } else {
            cookieString += ' path=/;';
        }
        if (domain) {
            cookieString += ` domain=${domain};`;
        }
        document.cookie = cookieString;
        window.location.reload();
    }, []);

    const cookieName = 'OurPeopleOurPlanetAnalyticsAcceptance';
    // Check if current path is the privacy page
    const onPrivacyPage = location.pathname.includes('/privacy'); // More robust check
    const cookieExists = typeof window !== 'undefined' ? getCookieConsentValue(cookieName) !== undefined : false; // Client-side check

    return (
        <html lang={locale}> {/* Use locale from loader data for lang attribute */}
        <head>
            {/* Remix's Meta and Links handle what react-helmet-async did */}
            <Meta />
            <Links />
        </head>
        <body>
        {/* Navbar - Tailwind migration starts here */}
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50"> {/* Replaces Navbar */}
            <div
                className="container mx-auto flex items-center justify-between p-4 relative"> {/* Replaces Container */}
                <a href={`/${locale}`}
                   className="shrink-0"> {/* Replaces Link, use <a> for external-like links or Remix <Link> */}
                    <img
                        alt="Our Planet Our People"
                        src={logo}
                        onClick={() => setExpanded(false)}
                        className="h-10" // Example: Set height using Tailwind
                    />
                </a>

                {/* Toggle button */}
                <button
                    className="lg:hidden text-gray-700 focus:outline-none" // Replaces Navbar.Toggle
                    onClick={toggleExpanded}
                    aria-controls="responsive-navbar-nav"
                    aria-expanded={expanded}
                >
                    {/* Hamburger icon - example using SVG or font icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>

                {/* Navbar.Collapse */}
                <div
                    className={`lg:flex lg:items-center lg:w-auto ${expanded ? 'block' : 'hidden'} w-full`} // Replaces Navbar.Collapse
                    id="responsive-navbar-nav"
                >
                    <nav
                        className="lg:flex-grow lg:flex lg:justify-end lg:items-center mt-4 lg:mt-0"> {/* Replaces Nav */}
                        <DynamicNavList id={headerComponentId} locale={locale} onSelect={() => setExpanded(false)}/>

                        <div className="lg:ml-4 mt-4 lg:mt-0"> {/* Replaces main-nav__language */}
                            <FlagSelect currentLocale={locale ?? defaultLanguage}/>
                        </div>
                    </nav>
                </div>
            </div>
        </nav>

        <main className="pt-20"> {/* Adjust padding-top to clear fixed navbar */}
            <div className="container mx-auto px-4"> {/* Replaces Container */}
                <Outlet/> {/* Renders content from child routes */}
            </div>
        </main>


        {/* Cookie Consent */}
        <CookieConsent
            location="bottom"
            buttonText={cookieText.approveText}
            cookieName={cookieName}
            declineButtonText={cookieText.declineText}
            expires={150}
            enableDeclineButton
            onDecline={() => {
                setAnalyticsEnabled(false);
            }}
            onAccept={(acceptedByScrolling) => {
                setAnalyticsEnabled(true);
            }}
            // Basic Tailwind for the main consent banner, customize more for full styling
            containerClasses="fixed bottom-0 left-0 right-0 p-4 bg-gray-800 text-white flex flex-col md:flex-row items-center justify-between z-50"
            contentClasses="text-lg mb-2 md:mb-0"
            buttonClasses="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mx-2"
            declineButtonClasses="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md mx-2"
        >
            <h2 className="text-xl font-bold mb-2">{cookieText.headerText}</h2>
            {cookieText.mainText}{' '}
            (<a className="text-gray-400 hover:underline" href={`/${locale}/privacy`}>
            {cookieText.privacyLinkText}
        </a>)
        </CookieConsent>

        {onPrivacyPage && cookieExists ? (
            <div
                className="fixed bottom-0 left-0 w-full flex justify-center items-center py-2 z-50 bg-gray-800" // Tailwind for privacy page cookie reset
            >
                <button
                    onClick={() => resetCookie(cookieName)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md" // Tailwind button style
                >
                    {cookieText.resetText}
                </button>
            </div>
        ) : null}

        {/* Dynamic Footer */}
        <DynamicFooter id={footerComponentId} locale={locale}/>
        <div>HELLO WORLD 2</div>
        {/* Remix Core Scripts */}
        <ScrollRestoration/>
        <Scripts/>
        {process.env.NODE_ENV === 'development' && <LiveReload/>}
        </body>
        </html>
    );
}