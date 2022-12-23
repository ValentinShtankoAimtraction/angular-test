import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPITaskService } from '../models/api-tasks.model';
import { ITask, ITaskFilter } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ApiTasksService implements IAPITaskService {

  constructor() { }
  tasks$: Observable<ITask[]>;
  count$: Observable<number>;
  list(): void {
    throw new Error('Method not implemented.');
  }
  get(id: number): Observable<ITask> {
    throw new Error('Method not implemented.');
  }
  patch(task: Partial<ITask>): void {
    throw new Error('Method not implemented.');
  }
  post(task: Partial<ITask>): Observable<ITask> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): void {
    throw new Error('Method not implemented.');
  }
  changeFilter(filter: Partial<ITaskFilter>): void {
    throw new Error('Method not implemented.');
  }
  categories(): Observable<string[]> {
    throw new Error('Method not implemented.');
  }
}
