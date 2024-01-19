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

## IOS

1. Build the app in **Ionic Appflow**
2. Download the build artifacts to your mac computer and open then in **XCode**
3. Publish the app to the store
