// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  googleMapsApiKey: '',
  backend: 'http://localhost:4200', // Put your backend here
  apiUrl: 'https://abcroulette.firebaseio.com',
  authUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]',
  apiKey: 'AIzaSyCJxEdHI93LGF-odd7YxqcpB-q9ZEJd6pA',
  firebase: {
    apiKey: 'AIzaSyCJxEdHI93LGF-odd7YxqcpB-q9ZEJd6pA',
    authDomain: 'test-c4ea1.firebaseapp.com',
    databaseURL: 'https://test-c4ea1.firebaseio.com',
    projectId: 'test-c4ea1',
    storageBucket: 'test-c4ea1.appspot.com',
    messagingSenderId: '696653332409',
    appId: '1:696653332409:web:3cfc7fee351d1bd9'
  }
};


