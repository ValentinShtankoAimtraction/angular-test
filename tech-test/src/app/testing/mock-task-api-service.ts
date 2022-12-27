import { Injectable } from "@angular/core";
import { IAPITaskService } from "@models/api-tasks.model";
import { ITask, ITaskFilter } from "@models/task.model";
import { Observable, of } from "rxjs";

@Injectable()
export class MockTaskApiService implements IAPITaskService {
  get tasks$(): Observable<ITask[]> {
    return of<ITask[]>([
      {
        id: 1,
        label: "Task 1",
        description: "Task 1 description",
        done: false,
        category: "cat-1",
      },
      {
        id: 2,
        label: "Task 2",
        description: "Task 2 description",
        done: "11-11-1111",
        category: "cat-2",
      },
    ]);
  }
  count$: Observable<number>;
  list(): void {}
  get(id: number): Observable<ITask> {
    return of({
      id: 1,
      label: "Task 1",
      description: "Task 1 description",
      done: false,
      category: "cat-1",
    });
  }
  patch(task: Partial<ITask>): void {}
  post(task: Partial<ITask>): void {}
  delete(id: number): void {}
  changeFilter(filter: Partial<ITaskFilter>): void {}
  categories(): Observable<string[]> {
    return of(["cat-1", "cat-2"]);
  }
}
