import React, {useEffect} from 'react';


const WhyDonate = () => {

    useEffect(() => {
        const myInput = document.getElementById("widget-here-99es6") as HTMLInputElement;

        if (myInput) {
            myInput.value = "donation-widget"
        }

    })

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://plugin.whydonate.com/wp_styling.js';
        script.async = true; // Optional: Load script asynchronously
        document.body.appendChild(script);
    }, []); // Empty dependency array ensures this runs only once


    return (
        <div>
            <div>
                <div id="widget-here-99es6" className="widget-here"
                     style={{marginBottom: '100px', paddingBottom: "150px"}} data-shortcode="99es6" data-lang="auto"
                     data-success_url="" data-fail_url=""></div>
            </div>

        </div>
    );
};

export default WhyDonate;