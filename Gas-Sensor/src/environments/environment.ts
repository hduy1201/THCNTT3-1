// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'app-nct',
    appId: '1:97233203758:web:e6f890216848dd4884e5bf',
    databaseURL: 'https://app-nct-default-rtdb.asia-southeast1.firebasedatabase.app',
    storageBucket: 'app-nct.appspot.com',
    locationId: 'asia-southeast1',
    apiKey: 'AIzaSyBwL7zxl482OdCjz58ztxur-vwYguOtHgw',
    authDomain: 'app-nct.firebaseapp.com',
    messagingSenderId: '97233203758',
    measurementId: 'G-JV4FPQV098',
  },
  endpoint: 'http://127.0.0.1:3000/',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
