import Donation from "./Donation";
import {SharingControls} from "./SharingControls";
import {getShareText} from "~/repositories/utils/extraTranslations";

import {TPage} from "~/repositories/Articles/model";
import {getReactFromStructuredText} from "../utils/richText";

export const PageData = (data: TPage) => {

    const richText = getReactFromStructuredText(data.actualPostBody);
    const includeDonateButton =data.includeDonateButton;
    const styleClass = data.heroImageUrl ? "heroWithImage" : "hero";
    return (
        <>
            <div className={includeDonateButton ? "donate-container" : ""}>
                <div className={includeDonateButton ? "donate-container__content" : ""}>
                    <div className={styleClass}>
                        <h1>{data.header}</h1>
                        {data.heroImageUrl ? (
                            <img src={data.heroImageUrl} alt={data.heroImageAltText}></img>
                        ) : null}
                    </div>

                    <div>{richText ? richText : <p>...</p>}</div>
                    {includeDonateButton ? <Donation locale={data.locale}></Donation> : null}
                </div>

                {includeDonateButton && (
                    <div className="donate-container__share">
                        <h2>{getShareText(data.locale)}</h2>
                        <SharingControls />
                    </div>
                )}
            </div>
        </>
    );
}