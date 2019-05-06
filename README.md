# NaijaNews
This is an ongoing project- A News blog built with Angular(Client Side), NodeJs(RestFUL API design) and MongoDB for persisting data. It covers various functionalities for allowing Admin users perform CRUD operations with posts/articles. JWT based authentication is used to validate requests to the api endpoints. The project also uses bcrypt for hashing passwords on the server. 
Posts upload
Post Image Upload,
Role based authentication- Here only admin users who created posts can view posts and edit their posts while functionality(icons) to perform these functionality are hidden from other admin and users who can only read these posts.
Global Error Handling was carried out with Angular's HttpInterceptor


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
