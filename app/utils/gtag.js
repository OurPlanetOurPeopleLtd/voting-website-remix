

export default function gtag() {
    if(!window)
        return;
    
    if(!window.dataLayer)
    {
        window.dataLayer = window.dataLayer || [];
    }
    // The gtag dataLayer requires an actual Arguments object to be pushed.
    // eslint-disable-next-line prefer-rest-params
    window?.dataLayer.push(arguments);
}