import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { environment } from "@env/environment";
import { IAPITaskService, ITask, ITaskFilter, ITaskTypes } from "@models/index";

const INITIAL_FILTER: ITaskFilter = {
  type: ITaskTypes.ALL,
  category: '',
};

@Injectable({
  providedIn: "root",
})
export class ApiTasksService implements IAPITaskService {
  private _tasksSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<
    ITask[]
  >([]);
  
  get tasks$(): Observable<ITask[]> {
    return combineLatest([
      this.activeFilters$,
      this._tasksSubject.asObservable().pipe(distinctUntilChanged()),
    ]).pipe(
      map(([filters, tasks]) => {
        return tasks
          .filter((task) => {
            switch (filters.type) {
              case ITaskTypes.ACTIVE:
                return !task.done;
              case ITaskTypes.COMPLETED:
                return task.done;
              default:
                return task;
            }
          })
          .filter((task) => task.category.includes(filters.category));
      })
    );
  }

  get count$(): Observable<number> {
    return this.tasks$.pipe(map((tasks) => tasks.length));
  }

  private _activeFilters: BehaviorSubject<ITaskFilter> =
    new BehaviorSubject<ITaskFilter>(INITIAL_FILTER);
  get activeFilters$(): Observable<ITaskFilter> {
    return this._activeFilters.asObservable();
  }
  constructor(private _http: HttpClient) {}
  async list(): Promise<void> {
    let tasks = await this._http
      .get<ITask[]>(`${environment.api.host}/tasks`)
      .toPromise();
    this._tasksSubject.next(tasks);
  }
  get(id: number): Observable<ITask> {
    return this._http.get<ITask>(`${environment.api.host}/tasks/${id}`);
  }
  patch(task: Partial<ITask>): void {
    this._http
      .patch<ITask>(`${environment.api.host}/tasks/${task.id}`, task)
      .toPromise()
      .then(() => this.list());
  }
  post(task: Partial<ITask>): Observable<ITask> {
    return this._http.post<ITask>(`${environment.api.host}/tasks`, task);
  }
  delete(id: number): void {
    this._http
      .delete(`${environment.api.host}/tasks/${id}`)
      .toPromise()
      .then(() => this.list());
  }

  changeFilter({ type, category }: ITaskFilter) {
    const currentState = this._activeFilters.getValue();
    if (type) {
      currentState.type = type;
    }
    if (category || typeof category === "string") {
      currentState.category = category;
    }
    this._activeFilters.next(currentState);
  }

  categories(): Observable<string[]> {
    return this._http.get<string[]>(`${environment.api.host}/categories`);
  }
}
