import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from "@angular/core";
import { UsersService } from "../users.service";
import {
  ActivatedRoute,
  RouterOutlet,
  RouterLink,
  ResolveFn,
} from "@angular/router";

@Component({
  selector: "app-user-tasks",
  standalone: true,
  templateUrl: "./user-tasks.component.html",
  styleUrl: "./user-tasks.component.css",
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  userId = input.required<string>();
  userService = inject(UsersService);
  destroyRef = inject(DestroyRef);
  activatedRoute = inject(ActivatedRoute);
  userName = input<string>("");

  // with signal approach
  // username = computed(
  //   () =>
  //     this.userService.users.find((user) => user.id === this.userId())?.name ??
  //     "Unknown User"
  // );

  // ngOnInit(): void {
  //   let subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (params) => {
  //       this.username =
  //         this.userService.users.find(
  //           (user) => user.id === params.get("userId")
  //         )?.name ?? "Unknown User";
  //     },
  //   });
  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }
}

export const userNameResolver: ResolveFn<string> = (
  activatedRouteSnapshot,
  routerStateSnapshot
) => {
  const userId = activatedRouteSnapshot.paramMap.get("userId");
  const userService = inject(UsersService);
  return (
    userService.users.find((user) => user.id === userId)?.name ?? "Unknown User"
  );
};

export const TitleResolver: ResolveFn<string> = (
  activatedRouteSnapshot,
  routerStateSnapshot
) => {
  return (
    userNameResolver(activatedRouteSnapshot, routerStateSnapshot) + "'s Tasks"
  );
};
