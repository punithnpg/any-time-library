// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyBM8UZ4h6waepKHc5raZ5_9_bzJ9NO9To4",
    authDomain: "testing-firefbase.firebaseapp.com",
    databaseURL: "https://testing-firefbase.firebaseio.com",
    projectId: "testing-firefbase",
    storageBucket: "testing-firefbase.appspot.com",
    messagingSenderId: "798348645614"
  }
};
