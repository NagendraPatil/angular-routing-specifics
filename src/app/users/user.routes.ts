import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import {
  canLeaveEditPage,
  NewTaskComponent,
} from "../tasks/new-task/new-task.component";
import { TasksService } from "../tasks/tasks.service";

export const routes: Routes = [
  {
    path: "",
    providers: [TasksService], // we can add service used only in below child routes here, so that the service won't loaded at startup with {providedIn:'root'}
    children: [
      {
        path: "",
        redirectTo: "tasks",
        pathMatch: "prefix",
      },
      {
        path: "tasks",
        component: TasksComponent,
        // loadComponent: () =>
        // import("../tasks/tasks.component").then((m) => m.TasksComponent), // can be used to lazy load a component, but as we are lazy loading the this as child route, we can directly use component property
      },
      {
        path: "tasks/new",
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
  },
];
