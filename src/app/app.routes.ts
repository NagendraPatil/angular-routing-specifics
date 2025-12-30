import {
  CanMatchFn,
  RedirectCommand,
  Router,
  Routes,
  UrlTree,
} from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import {
  TitleResolver,
  userNameResolver,
  UserTasksComponent,
} from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

export const canMatchGuard: CanMatchFn = (route, segments) => {
  // logic to allow or disallow route matching
  let router = inject(Router);
  if (Math.random() < 1) {
    // console.warn("Route matching disallowed by canMatchGuard");
    return true; // this will allow the route matching
  }
  return new RedirectCommand(router.parseUrl("/unauthorized"));
};

export const routes: Routes = [
  {
    path: "",
    component: NoTaskComponent,
    title: "Home",
  },
  {
    path: "users/:userId",
    component: UserTasksComponent,
    canMatch: [canMatchGuard], // can be used to protect routes at matching level
    loadChildren: () => import("./users/user.routes").then((m) => m.routes), //lazy loads all childe routes
    data: { message: "hello!" }, // can be used to send static data to the selected route,
    resolve: {
      userName: userNameResolver,
    },
    title: TitleResolver,
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "Not found",
  },
];
