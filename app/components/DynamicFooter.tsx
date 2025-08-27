import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {cleanUrl, flattenNavigationRoute, LogLinks} from "~/repositories/utils/utilities";
import {FooterItem, NavigationItem} from "~/repositories/Navigation/types";


export const DynamicFooter: React.FC<{
    
    id: string;
    locale:string;
    itemGroup?: NavigationItem[];
}> = ({  id, locale,itemGroup }) => {

    const [links, setLinks] = useState<NavigationItem[]>(itemGroup ?? []);
    const showFooter = links?.length > 0;
   /* const fetchData = useCallback(async () => {
        let slugs = await flattenNavigationRoute(id,locale ?? "en");
        let sentLinks = slugs.map((x) => ({link: x.slug, title: x.title}));
        setLinks(sentLinks);

        LogLinks(sentLinks)
    }, [id,locale])

    useEffect(() => {
        fetchData().catch(console.error);
    }, [fetchData,locale]);*/

    const gslugPrefix = locale ? `/${locale}/` :"/";
    
    return showFooter
        ? (<footer>

            <ul>
                {links && links.map((x:NavigationItem, index) => {

                    let slugPrefix = x.slug?.includes(gslugPrefix) ? "" : gslugPrefix;
                    if (x.slug?.startsWith("/") && slugPrefix?.endsWith("/"))
                        slugPrefix = locale ?? ""

                    const key = index + (locale ?? "");

                    return (
                        <li key={locale + index}>
                            <Link to={cleanUrl(slugPrefix + `article/${x.slug}`)} className="nav-link">
                                {x.title}
                            </Link>
                        </li>);
                })}
            </ul>
        </footer>)
        : null
};
