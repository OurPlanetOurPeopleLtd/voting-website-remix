import React, { useState} from "react";
import {DataStore} from "@aws-amplify/datastore";
import {User} from "~/src/models";
import {v4 as generateGuid} from "uuid";
import {recordUse} from "~/utils/analytics";
import {VideoControl} from "~/components/VideoControl";

import { TRegistrationProps} from "~/repositories/Registration/model";
import {localStorageVotingIdKey} from "~/repositories/utils/utilities";
import { getTranslation } from "~/repositories/utils/extraTranslations";

import "./RegistrationPage.scss";

export const RegistrationPage = ({locale, data}: TRegistrationProps) => {
    const [emailExistsError, setEmailExists] = useState(false);
    const [thankYouForRegister, setThankYouRegister] = useState(false);
    type TDeregisterState =  "showSuccess" | "showFail" | "hide";
    const [showDeregisterMessage, setDeregisterMessage] = useState<TDeregisterState>("hide");

      
    const Deregister = async (email:string) => {
        const existingUser = await DataStore.query(User, (v) => v.and(v => [v.email?.eq(deRegEmail)]))
        const aExistingUser = existingUser.shift();
        const idAlreadyExists = !!aExistingUser;
        if(!idAlreadyExists)
            return false;
        await DataStore.delete(aExistingUser);
        return true;
    }

    const SaveUserToDB = async (name:string, email:string, comment:string) => {
        let localGuid = localStorage.getItem(localStorageVotingIdKey);

        if (!localGuid) {
            localGuid = generateGuid();
            localStorage.setItem(localStorageVotingIdKey, localGuid);
        }

        const existingUser = await DataStore.query(User, v => v.email?.eq(email)).catch(e => console.log(e))
        const aExistingUser = existingUser?.shift();
        const idAlreadyExists = !!aExistingUser;
     
        if (idAlreadyExists) {
            setEmailExists(true);
            return;
        } 
        
        // Analytics
        try {
            recordUse({
                name: 'Registered',
                immediate: true,
                // Attribute values must be strings
                attributes: {
                    email: email, voterId: localGuid.toString(), name: name, comment:comment
                }
            }, localGuid)
        } catch (e) {
            console.log(e);
        }

        // Save to database
        await DataStore.save(
            new User({email: email, voterId: localGuid, name: name, comment: comment})
        ).then((x) => {
            setThankYouRegister(true)
        }).catch(e => console.log("Error saving" + e.toString()));
        
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [deRegEmail, setDeRegEmail] = useState('');
    const [comment, setComment] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleDeRegEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeRegEmail(event.target.value);
    };
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        SaveUserToDB(name,email,comment);
    };

    const handleDeregisterSubmit =async (event: React.FormEvent) => {
        event.preventDefault();
        const success = await Deregister(email)
        setDeregisterMessage(success ? "showSuccess" : "showFail");
    }
    
    if(!data) {
        return <></>
    }

    return (
        <div>
            <div className="hero">
                <h1>{data.title}</h1>
                <p>{data.subtitle}</p>

                <div className="reg-container">
                    <div className="reg-video">
                            <VideoControl fullScreenOnClick={false} datoVideo={data.mainVideo?.video?.video} pageTitle={data.title}
                                videoThumbnail={data.mainVideo?.thumbnailImage.responsiveImage.src}
                                videoTitle={data.mainVideo?.video?.video?.title ?? ""} />

                            <p className="reg-helper">{getTranslation(locale, "registrationHelper")} <a href="mailto:patrick.gardner@OurPlanetOurPeople.com?subject=Members enquiry">generalcomments@OurPlanetOurPeople.com</a>.</p>
                    </div>

                    {
                        thankYouForRegister ? <div className="form-status-message" style={{marginTop: "1rem"}}><div style={{color: "#298e33", borderColor: "#298e33", fontWeight: "600"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={40} height={40} aria-hidden="true" fill="#298e33"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg><h2>{data.thankYou}</h2></div></div> :

                        (<div className={"form-container"}>
                            <div className="form-left">
                                <h2>{data.registrationHeading}</h2>

                                <div className="form-status-message">
                                    {emailExistsError ? <div aria-live="polite"><svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 512 512" aria-hidden="true"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>{data.emailValidation}</div> : <div aria-live="polite"></div> }
                                </div>

                                <form className="register-form" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name">{data.nameLabel}</label>
    
                                        <input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={handleNameChange}
                                            required
                                        />
                                    </div>
    
                                    <div>
                                        <label htmlFor="email">{data.emailLabel}</label>
    
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            required
                                        />
                                    </div>
    
                                    <div>
                                        <label htmlFor="comments">{data.commentsLabel}</label>
    
                                        <textarea
                                            id="comments"
                                            value={comment}
                                            rows={6}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </div>

                                    <div className="register-form__privacy">
                                        <label className="register-form__privacy-label">
                                            <input type="checkbox" name="privacy_policy" required />
                                            {data.privacyPolicyLabel}
                                        </label>

                                        <p>{data.privacyPolicyText} <a href={`/${locale}/privacy`}>{data.privacyPolicyLinkText}</a>.</p>
                                    </div>

                                    <div>
                                        <button className="btn" type="submit">{data.submit}</button>
                                    </div>
                                </form>
                            </div>

                            <div className="form-right">
                                <h2>{data.deregisterHeading}</h2>

                                <form className="register-form" onSubmit={handleDeregisterSubmit}>                                   
                                    <div className="form-status-message">
                                        {showDeregisterMessage  === "showSuccess" ? <div aria-live="polite"><svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 512 512" aria-hidden="true"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>{data.deregisterMessage}</div> : null}
                                        {showDeregisterMessage  === "showFail" ? <div aria-live="polite"><svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 512 512" aria-hidden="true"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>{data.noEmailValidation}</div> : null}
                                        {showDeregisterMessage === "hide" ? <div aria-live="polite"></div> : null}
                                    </div>

                                    <div>
                                        <label htmlFor="deregister-email">{data.emailLabel}</label>
    
                                        <input
                                            id="deregister-email"
                                            type="email"
                                            value={deRegEmail}
                                            onChange={handleDeRegEmailChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <button className="btn" type="submit">{data.submit}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}