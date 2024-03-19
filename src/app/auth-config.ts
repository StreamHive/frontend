import { BrowserCacheLocation, Configuration, LogLevel } from "@azure/msal-browser";

export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_signupandsignin1",
    },
    authorities: {
        signUpSignIn: {
            authority: "https://streamhive.b2clogin.com/streamhive.onmicrosoft.com/B2C_1_signupandsignin1",
        },
    },
    authorityDomain: "streamhive.b2clogin.com"
};

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const msalConfig: Configuration = {
    auth: {
        clientId: '6d478c04-68b9-4583-a0e6-f63033d9f64d',
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: '/',
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: isIE,
    },
    system: {
        loggerOptions: {
            loggerCallback: (logLevel, message, containsPii) => {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
    // More configuration here
}

export const protectedResources = {
    videosReadApi: { // should maybe protect write instead
        endpoint: "http://localhost:3000/videos",
        scopes: ["https://streamhive.onmicrosoft.com/api/tasks.read"],
    },
}

export const loginRequest = {
    scopes: []
};

