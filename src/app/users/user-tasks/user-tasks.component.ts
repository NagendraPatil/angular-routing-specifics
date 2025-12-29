import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from "@angular/core";
import { UsersService } from "../users.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-tasks",
  standalone: true,
  templateUrl: "./user-tasks.component.html",
  styleUrl: "./user-tasks.component.css",
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  userService = inject(UsersService);
  destroyRef = inject(DestroyRef);
  activatedRoute = inject(ActivatedRoute);
  username = "";

  // with signal approach
  // username = computed(
  //   () =>
  //     this.userService.users.find((user) => user.id === this.userId())?.name ??
  //     "Unknown User"
  // );

  ngOnInit(): void {
    let subscription = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.username =
          this.userService.users.find(
            (user) => user.id === params.get("userId")
          )?.name ?? "Unknown User";
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
