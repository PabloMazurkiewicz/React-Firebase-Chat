# Real-Chat (Emoji)

## Stack

React(TS), Firebase, MUI


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Firestore rules with rate limiting (1 message per 15 seconds)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageUid} {
      allow read;
      allow write: if isAuthenticated();
      function isAuthenticated() {
      	return request.auth.uid != null && isCalm();
      }
      function isCalm() {
      	return isUserNotRegistered() || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.rateLimit.lastMessage  + duration.value(15, 's') < request.resource.data.timestamp;
      }
      function isUserNotRegistered() {
      	return !exists(/databases/$(database)/documents/users/$(request.auth.uid));
      }
    }
    match /users/{userUid} {
      allow read;
      allow write: if request.auth.uid != null;
    }
  }
}
```