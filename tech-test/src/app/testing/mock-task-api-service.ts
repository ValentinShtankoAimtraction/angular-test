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
                category: "cat-1"
            },
            {
                id: 2,
                label: "Task 2",
                description: "Task 2 description",
                done: "11-11-1111",
                category: "cat-2"
            }
        ])
    };
    count$: Observable<number>;
    list(): void {
        return;
    }
    get(id: number): Observable<ITask> {
        throw new Error("Method not implemented.");
    }
    patch(task: Partial<ITask>): void {
        throw new Error("Method not implemented.");
    }
    post(task: Partial<ITask>): void {
        throw new Error("Method not implemented.");
    }
    delete(id: number): void {
        throw new Error("Method not implemented.");
    }
    changeFilter(filter: Partial<ITaskFilter>): void {
        throw new Error("Method not implemented.");
    }
    categories(): Observable<string[]> {
        return of([
            "cat-1",
            "cat-2" 
        ])
    }
}