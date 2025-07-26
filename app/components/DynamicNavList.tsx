// app/components/DynamicNavList.tsx (or wherever it resides in your app/)

import React, { useCallback, useEffect, useState } from "react";
import { ContentType, NavigationItem } from "~/repositories/Navigation/types";
import { getNavigationJson } from "~/repositories/Navigation/request"; // Using the alias!
import { NavLink } from "@remix-run/react"; // Use Remix's NavLink
import "./MegaMenu.scss"; // Keep if you have custom styles that aren't easily done in Tailwind

export type TDynamicNav = {
    id: string;
    onSelect?: () => void; // More specific type for onSelect
    itemGroup?: NavigationItem[];
    locale?: string;
    // New prop for managing open dropdown in multi-level menus
    onDropdownToggle?: (id: string | null) => void;
    parentDropdownId?: string | null; // To track which dropdown is open
};

// Helper component for dropdown logic to handle nested open states
const NavigationDropdown: React.FC<{
    title: string;
    id: string;
    children: React.ReactNode;
    onSelect?: () => void;
    onDropdownToggle: (id: string | null) => void;
    parentDropdownId: string | null;
}> = ({ title, id, children, onSelect, onDropdownToggle, parentDropdownId }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Close dropdown if a different one is opened or onSelect is called
    useEffect(() => {
        if (parentDropdownId !== id && parentDropdownId !== null) {
            setIsOpen(false);
        }
    }, [parentDropdownId, id]);

    const handleToggle = useCallback((e: React.MouseEvent) => {
        e.preventDefault(); // Prevent default link behavior
        e.stopPropagation(); // Stop event bubbling to parent li
        const newState = !isOpen;
        setIsOpen(newState);
        onDropdownToggle(newState ? id : null); // Notify parent about open/close state
    }, [isOpen, id, onDropdownToggle]);

    const handleBackClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent bubbling that might re-open
        setIsOpen(false);
        onDropdownToggle(null); // Close this dropdown
        if (onSelect) onSelect(); // Call onSelect if defined
    }, [onSelect, onDropdownToggle]);

    return (
        <li className="relative group"> {/* Tailwind's group class for hover effect */}
            <button
                onClick={handleToggle}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 lg:hover:bg-transparent lg:hover:text-blue-600 lg:p-0"
                aria-expanded={isOpen}
                aria-controls={`dropdown-menu-${id}`}
            >
                {title}
                {/* Dropdown arrow icon */}
                <svg className={`ml-2 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {/* Dropdown Menu Content */}
            <div
                id={`dropdown-menu-${id}`}
                className={`
                    absolute left-0 lg:top-full lg:mt-0 mt-2 lg:bg-white lg:shadow-lg lg:rounded-md lg:min-w-[160px]
                    w-full lg:w-auto p-4 lg:p-0 bg-white lg:static
                    z-40 transition-all duration-300
                    ${isOpen ? 'block opacity-100 visible' : 'hidden opacity-0 invisible lg:group-hover:block lg:group-hover:opacity-100 lg:group-hover:visible'}
                    lg:group-hover:block lg:group-hover:opacity-100 lg:group-hover:visible
                `}
                // Ensure dropdown remains open on desktop hover
                onMouseEnter={() => window.innerWidth >= 1024 && setIsOpen(true)}
                onMouseLeave={() => window.innerWidth >= 1024 && setIsOpen(false)}
            >
                {/* Mobile "Back" button */}
                <button
                    type="button"
                    className="lg:hidden flex items-center mb-4 text-blue-600 hover:text-blue-800 focus:outline-none"
                    onClick={handleBackClick}
                >
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 320 512" aria-hidden="true"><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                    Back
                </button>
                <ul className="lg:py-1"> {/* List for dropdown items */}
                    {children}
                </ul>
            </div>
        </li>
    );
};


export const DynamicNavList = (props: TDynamicNav) => {
    const { id, itemGroup, locale, onSelect } = props;

    // Use a state for the currently open dropdown in this level
    // This helps ensure only one top-level dropdown is open at a time for mobile
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        const dataFetched = await getNavigationJson(id, locale ?? "en");
        setData(dataFetched);
    }, [id, locale]);

    const [data, setData] = useState<NavigationItem[]>(itemGroup ?? []);

    // Initial fetch if data is not provided via props
    useEffect(() => {
        if (!data.length) {
            fetchData().catch(console.error);
        }
    }, [fetchData, data.length]); // Add data.length to dependency array

    // Re-fetch when locale changes
    useEffect(() => {
        fetchData().catch(console.error);
    }, [locale, fetchData]);

    // Construct slug prefix for internal links
    const gslugPrefix = locale ? `/${locale}/` : "/";

    try {
        return (
            <ul className="flex flex-col lg:flex-row lg:space-x-4"> {/* Main navigation list */}
                {data && data.map((navItem: NavigationItem, index) => {
                    let slug = navItem.slug;
                    // Adjust slugPrefix handling for internal Remix NavLinks
                    let path = slug ? `${gslugPrefix}${slug}` : gslugPrefix;
                    // Handle double slashes if slug is empty or starts with '/'
                    path = path.replace(/\/\//g, '/');


                    const key = index + (locale ?? "");

                    switch (navItem.__typename) {
                        case ContentType.ExternalLink:
                            return (
                                <li key={key}>
                                    <a
                                        href={navItem.url ?? ""}
                                        target="_blank" // External links usually open in new tab
                                        rel="noopener noreferrer"
                                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition duration-200"
                                        data-test="full link"
                                        onClick={onSelect} // Call onSelect for any click
                                    >
                                        {navItem.title}
                                    </a>
                                </li>
                            );

                        case ContentType.PdfAndVideo:
                            return (
                                <NavigationDropdown
                                    key={key}
                                    title={navItem.title ?? "_"}
                                    id={`pdf-video-dropdown-${navItem.id}`}
                                    onSelect={onSelect}
                                    onDropdownToggle={setOpenDropdownId}
                                    parentDropdownId={openDropdownId}
                                >
                                    <li>
                                        <NavLink
                                            onClick={onSelect}
                                            to={path + (navItem.video?.slug ?? "")}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200"
                                        >
                                            Video format
                                        </NavLink>
                                    </li>
                                    <li>
                                        <a
                                            href={navItem.pdf?.url ?? ""}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200"
                                        >
                                            PDF format
                                        </a>
                                    </li>
                                </NavigationDropdown>
                            );

                        case ContentType.NavigationGroup:
                            return (
                                <NavigationDropdown
                                    key={key}
                                    title={navItem.title ?? "_"}
                                    id={`nav-group-dropdown-${navItem.id}`}
                                    onSelect={onSelect}
                                    onDropdownToggle={setOpenDropdownId}
                                    parentDropdownId={openDropdownId}
                                >
                                    {/* Recursive call for nested navigation */}
                                    <DynamicNavList
                                        onSelect={onSelect}
                                        itemGroup={navItem.navigationItem}
                                        locale={locale}
                                        id={navItem.id ?? "123"}
                                        onDropdownToggle={setOpenDropdownId} // Pass down the toggle handler
                                        parentDropdownId={openDropdownId}
                                    />
                                </NavigationDropdown>
                            );

                        case ContentType.VotingPage:
                        case ContentType.SpecialPageRecord:
                        case ContentType.RegistrationPage:
                        case ContentType.VotingResult:
                        case ContentType.VideoPage:
                        case ContentType.BlogPost:
                        case ContentType.VideoWithPdfs:
                        default:
                            // Default case for all other internal links
                            return (
                                <li key={key}>
                                    <NavLink
                                        onClick={onSelect}
                                        to={path}
                                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition duration-200"
                                        // Add active link styling for Remix NavLink
                                        // className={({ isActive }) =>
                                        //     `block px-3 py-2 text-gray-700 hover:text-blue-600 transition duration-200 ${isActive ? 'font-bold' : ''}`
                                        // }
                                    >
                                        {navItem.title ?? "error"}
                                    </NavLink>
                                </li>
                            );
                    }
                })}
            </ul>
        );
    }
    catch(e:any)
    {
        return <div>Something went wrong in the nav list</div>
    }
};