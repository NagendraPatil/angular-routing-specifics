import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding())], // if queryParams handled using signale withComponentInputBinding() is used, else can be removed if we are using activatedRoute
};
