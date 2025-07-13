import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {cleanUrl, flattenNavigationRoute, LogLinks} from "../repositories/utils/utilities";

export const DynamicFooter = ({id,locale}) => {
    const [links, setLinks] = useState([]);
    const showFooter = links?.length > 0;
    const fetchData = useCallback(async () => {
        let slugs = await flattenNavigationRoute(id,locale ?? "en");
        let sentLinks = slugs.map((x) => ({link: x.slug, title: x.title}));
        setLinks(sentLinks);

        LogLinks(sentLinks)
    }, [id,locale])

    useEffect(() => {
        fetchData().catch(console.error);
    }, [fetchData,locale]);

    const gslugPrefix = locale ? `/${locale}/` :"/";
    
    return showFooter
        ? (<footer>
            <ul>
                {links && links.map((x, index) => {

                    let slugPrefix = x.link?.includes( gslugPrefix) ? "" : gslugPrefix;
                    if(x.link?.startsWith("/") && slugPrefix?.endsWith("/"))
                        slugPrefix = locale ?? ""

                    const key =index +  (locale ?? "");
                   
                    return (
                        <li key={locale+index}>
                            <Link to={cleanUrl(slugPrefix  +`/${x.link}`)} className="nav-link">
                                {x.title}
                            </Link>
                        </li>);
                })}
            </ul>
        </footer>)
        : null
};
