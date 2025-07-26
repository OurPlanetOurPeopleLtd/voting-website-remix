import type {
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  useLoaderData
} from '@remix-run/react'; // Only Remix hooks needed for data/params
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { v4 as generateGuid } from 'uuid';

import { getVotingPageJson } from '~/repositories/VotingPage/request';
import type { TVotingPage, TVotingPageExtended } from '~/repositories/VotingPage/model';
import { localStorageVotingIdKey, localStorageWatchedIdKey } from '~/repositories/utils/utilities';
import { Choice } from '~/src/models'; // Adjust path
import {VideoControl} from "~/components/VideoControl";


const DEFAULT_LOCALE = 'en';

// --- Links Function (for route-specific styles only) ---
import {StructuredText} from "react-datocms";
import {getDetailTranslation, getNextTranslation, getSummaryTranslation} from "~/repositories/utils/extraTranslations";
import { DialogModal, DialogModalRef} from "~/components/DialogModal";

import cryingEarth from "../../crying-earth.png";

// --- Loader Function ---
export type LoaderData = {
  votingPageData: TVotingPage;
  initialWatchedStatus: boolean;
  userGuid: string;
  resolvedLocale: string;
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  let locale = params.locale as string | undefined;

  if (!locale) {
    locale = DEFAULT_LOCALE;

  } 

  const votingPageData = await getVotingPageJson('Original', locale);

  const initialWatchedStatus = false;
  const initialUserGuid = generateGuid();

  return json<LoaderData>({
    votingPageData,
    initialWatchedStatus,
    userGuid: initialUserGuid,
    resolvedLocale: locale,
  });
};

// --- Meta Function (for route-specific SEO) ---
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: 'Voting Page' }];
  }
  return [
    { title: data.votingPageData.hubHeading || `Voting Page (${data.resolvedLocale})` },
    { name: 'description', content: data.votingPageData.hubIntroText || 'Cast your vote and learn more!' },
    // You can also set specific html attributes here if needed, they will merge with root.tsx
    { tagName: 'html', attributes: { lang: data.resolvedLocale } },
  ];
};

// --- Component (Your actual page content) ---
export default function VotingPageRoute() {
  const { votingPageData, initialWatchedStatus, resolvedLocale } = useLoaderData<LoaderData>();
  const locale = resolvedLocale;
  // State derived from client-side interactions or localStorage
  const [voted, setVoted] = useState(false);
  const [watched, setWatched] = useState(initialWatchedStatus);

  // Create refs for each DialogModal instance
  const summaryModalRef = useRef<DialogModalRef>(null);
  const membersModalRef = useRef<DialogModalRef>(null);
  
  // State to track which modal/dialog is open or none
  const [openDialog, setOpenDialog] = useState<null | "summary" | "members">(null);


  const data = votingPageData;

  // Client-side localStorage initialization for userGuid and watched status
  useEffect(() => {
    let currentUserGuid = localStorage.getItem(localStorageVotingIdKey);
    if (!currentUserGuid) {
      currentUserGuid = generateGuid();
      localStorage.setItem(localStorageVotingIdKey, currentUserGuid);
    }

    const lwatchedString = localStorage.getItem(localStorageWatchedIdKey);
    const lwatched = lwatchedString ? lwatchedString === 'true' : false;
    setWatched(lwatched);
    setVoted(lwatched);
  }, []);

  const onWatched = useCallback(() => {
    setWatched(true);
    localStorage.setItem(localStorageWatchedIdKey, 'true');
  }, []);

  const voteChanged = useCallback((choice: Choice) => {
    console.log(`Vote changed to: ${choice} in locale: ${resolvedLocale}`);
    // Your actual vote submission logic (e.g., via a Remix Action) would go here
  }, [resolvedLocale]);

  // When modal closes, call pause() on all videos for safety
  useEffect(() => {
    if (openDialog === null) {
      // Only reset modal videos
      if (summaryModalRef.current?.resetVideo) summaryModalRef.current.resetVideo();
      if (membersModalRef.current?.resetVideo) membersModalRef.current.resetVideo();
    }
  }, [openDialog]);

  const fullData: TVotingPageExtended = {
    locale: resolvedLocale,
    voteChangedCallBack: voteChanged,
    voteResultCallBack: setVoted,
    watchedCallBack: onWatched,
    voted: voted,
    watched: watched,
    ...data,
  };
 const props = fullData;
 // const RenderComponent = VotingPageMainJourney;

  return (
      // The outermost wrapper, applying general page padding and centering
      <div className="frame">
        {/* This is your main content container, providing max-width and internal padding */}
        <div className="frame-content">

          {/* --- LANDING STAGE CONTENT (Always rendered now) --- */}
          <div className="landing-content"> {/* CRUCIAL: This div handles desktop row layout */}
            {/* Left Column: Text and Buttons */}
            <div className={"verticalFrameCentre landing-content__text"}>
              <h1 className="frame__heading">{props.landingHeading}</h1>

              <div className="text-[1.2rem]"> {/* Using Tailwind's arbitrary value for 1.2rem */}
                <StructuredText data={props.openingText}/>
              </div>

              <div className="landing-content__buttons"> {/* CRUCIAL: This wraps all buttons for their layout */}
                {/* Summary Video Button */}
                {props.videos?.summaryVideo && (
                    <div>
                      <button
                          onClick={() => setOpenDialog("summary")}
                          className="btn btn--white"
                      >
                        {getNextTranslation(locale)}
                      </button>
                      <DialogModal
                          ref={summaryModalRef}
                          open={openDialog === "summary"}
                          onClose={() => setOpenDialog(null)}
                      >
                        <VideoControl
                            isOpen={openDialog === "summary"}
                            fullScreenOnClick={true}
                            datoVideo={props.videos?.summaryVideo?.video?.video}
                            videoThumbnail={props.videos?.summaryVideo?.thumbnailImage?.responsiveImage.src}
                            locale={locale}
                            onFinish={() => setOpenDialog(null)}
                        />
                      </DialogModal>
                    </div>
                )}

                {/* Summary PDF Link */}
                {props.summaryPdf?.url && (
                    <a href={props.summaryPdf.url} target="_blank" className="btn btn--white" rel="noreferrer">
                      {getSummaryTranslation(locale)}
                    </a>
                )}

                {/* Members Video Button */}
                {props.videos?.membersVideo && (
                    <div>
                      <button
                          onClick={() => setOpenDialog("members")}
                          className="btn btn--white"
                      >
                        {getDetailTranslation(locale)}
                      </button>
                      <DialogModal
                          ref={membersModalRef}
                          open={openDialog === "members"}
                          onClose={() => setOpenDialog(null)}
                      >
                        <VideoControl
                            isOpen={openDialog === "members"}
                            fullScreenOnClick={true}
                            datoVideo={props.videos?.membersVideo?.video?.video}
                            videoThumbnail={props.videos?.membersVideo?.thumbnailImage?.responsiveImage.src}
                            locale={locale}
                            onFinish={() => setOpenDialog(null)}
                        />
                      </DialogModal>
                    </div>
                )}
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="landing-content__image">
              <img src={cryingEarth} alt="" />
            </div>
          </div>

        </div>{/* End frame-content */}
      </div> /* End frame */
  );
}