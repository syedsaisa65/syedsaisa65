export const BASE_URL = 'https://btserviceapiappservice.azurewebsites.net/api/';
export const SHAREPOINT_BASE_URL =
  'https://blueed.sharepoint.com/sites/BlueedLawFirm/Pages/BlueedIframe.aspx';

export const msalConfig = {
  auth: {
    clientId: '7f33289a-7293-4f62-9e87-422569b9d703',
    authority: 'https://login.microsoftonline.com/fadaf86c-7a37-40b6-8a15-7ffe204bb3f3', // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    navigateToLoginRequestUrl: false,
    redirectUri:
      // eslint-disable-next-line no-undef
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/auth'
        : 'https://devbargainingtable.com/auth'
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['api://4a52ed10-aa4a-42f0-973d-6f36acfa30f5/BTServiceAPI', 'User.Read'],
  prompt: 'select_account'
};
