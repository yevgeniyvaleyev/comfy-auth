![Local Coverage-shield-badge-1](https://img.shields.io/badge/Local%20Coverage-100%25-brightgreen.svg)

# ComfyAuth

## Motivation

This application demonstrates possible implementation of authentication functionality 
in client app using Angular framework.
The application contains of:
- __sign up__ (`/auth/sign-up`) screen, which allows user to fill, validate and send a sign up form. 
- __login__ (`/auth/login`) screen, allows user to login using registered email and password.
- __dashboard__ screen, appears when user successfully logged in and congratulates the user with this fact.
- __navigation__ has action buttons to login, sign up and logout.

## Demo
Please check out deployed application at [comfy-auth.herokuapp.com](https://comfy-auth.herokuapp.com/)
## Form validation
Login and sign up forms contain various of validators like standard (`required`, `minLength` etc) and custom
synchronous and asynchronous validators. 

__Custom Validators__
- `correctName` checks whether a text contains only lowercase letters with first capital;
- `upperAndLowerCase` checks whether text contains lower and uppercase letters;
- `preventUserNamesInPassword` checks whether password field contains entered last or first name;
- `correctEmail` checks whether a structure of entered email is correct;
- `isUniqueEmail` _async_ validator which does an API call to check whether entered email is already registered;

## Authentication
It is only possible to login by email used in sign up form and password (random). 
The Authentication is made for demonstration purpose and does not contain real API which would allow real secure authentication. 
Protection of certain routes of the application is done by authentication guards and authentication service.

## Mock API
To make this application as close as possible to production ready state it was decided to use request interceptor to emulate missing APIs. 
It allows to perform login, logout, email uniqueness check, authentication check and extra logic for sign up. The interceptor uses LocalStorage to persist authentication and registration data.
This app can be potentially used with real API when this interceptor is disabled. 

## Configuration
Configuration consists of `api` and `storage` sections which contain values for api calls and storage keys accordingly.

## Theme
This application uses angular material library for components, typography and colors.
Bootstrap is used for grid system and positioning, it's used partially.

## Running unit tests

Run `ng test` to execute the unit tests.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Or use `ng serve --port PORT` to run the application on another port.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Technologies

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.
