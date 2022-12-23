import { Observable } from "rxjs";
import { ITask, ITaskFilter } from "./task.model";

export interface IAPITaskService {
    // get the list of tasks
    readonly tasks$: Observable<ITask[]>;

    // get count of tasks
    readonly count$: Observable<number>;

    // request a list of tasks
    list(): void;
    get(id: number): Observable<ITask>;
    patch(task: Partial<ITask>): void;
    post(task: Partial<ITask>): Observable<ITask>;
    delete(id: number): void;

    // internal filter
    changeFilter(filter: Partial<ITaskFilter>): void;

    // get list of categories
    categories(): Observable<string[]>;
}