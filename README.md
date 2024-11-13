## Getting started

This project has been configured to run in a Docker container.
This is the recommended way to run the project for development.
The container is configured to use **Node.js** version `1.20 bullseye` and version `7.2.0` of **Ionic**.

### Prerequisites

- Docker
- VSCode

### Running the project

1. Open **VSCode** and install the **Remote - Containers** extension
2. Clone the repository
3. Click on the button in the bottom left corner of the VSCode window to access the **Remote Containers Command Palette**
4. Select **Remote-Containers: Open Folder in Container...**
5. Select the folder where you cloned the repository
6. Wait for the container to build and start
7. Open a terminal in VSCode and run `npm install`
8. Run `ionic serve` to start the development server

<img src="https://github.com/praxis-isncsci/ionic-app/assets/1294355/1461c6db-9361-4607-9d79-7d04ca3595f5" alt="Remote Container button and Command Palette" width="600"/>

## Deployment

We use [Ionic Appflow](https://dashboard.ionicframework.com/) to build and deploy the app to the stores.
Before a new deployment, we need to increase the app version:

1. Update the version number in `package.json`.
2. Run `npm install` to update the `package-lock.json` file.
3. For **Android**, open the file `android/app/build.gradle` and update the `versionCode` and `versionName` properties.
   The `versionCode` should be incremented by one and the `versionName` should be updated to match the version in `package.json`.

### Android

The GitRepository has been associated with the **Ionic Appflow** project.
During setup we had to create a service account in the [Google Cloud console](https://console.cloud.google.com/iam-admin/serviceaccounts).
After the account was created we used it to generated the key for our certificates by selecting **Manage keys** from the pull down to its right.

<img src="https://github.com/praxis-isncsci/ionic-app/assets/1294355/c37f4222-28fd-4c44-add8-e436f0ae4b60" alt="Google Cloud Console" width="215"/>

We had to add the account as a user in the **Google Play console** and give it the necessary permissions to publish the app so we could use the certificate created with its key to setup our **Ionic Appflow** automated deployment.

We still need to build the app and add android platform first
1. npm run build
2. npx cap add android
The android app should build and 
3. Check the versionCode and versionName in Google Play Console
3. increment the versionCode to versionName /android/app/build.gradle         
   3.1 versionCode 2
   3.2 versionName "1.0.2"

We still, however, need to do manual publishing.
1. Commit and push the changes to the `main` branch
2. Open the **Ionic Appflow** dashboard
3. Select the project
4. Click on the **Build** tab
5. Turn on the **Deploy to Google Play** switch
6. Click on the **Start a build** button

Once the build is complete, the app will be published to the store.
To add as a test build, go to the **Google Play Console** and add the build to the **Internal Test Track**.

1. Open the **Google Play Console**
2. Select the app
3. Click on the **Testing > Internal testing**
   <img width="275" src="https://github.com/orgs/praxis-isncsci/projects/1/assets/1294355/0689a6e2-b4cd-4a09-bf39-6c1ee3f67b42" alt="Deploy to Internal Test Track" />
4. Click on the **Create new release** button
5. Add your release notes
6. Click on the **Review** button
7. Click on the **Start Rollout to Internal Testing** button

### IOS

1. Build the app in **Ionic Appflow**
2. Download the build artifacts to your mac computer and open then in **XCode**
3. Publish the app to the store
