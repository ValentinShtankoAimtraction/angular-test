import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { IAPITaskService } from '@models/api-tasks.model';
import { ITask, ITaskState } from '@models/index';
import { API_TASKS_SERVICE } from '@tokens/api-tasks.token';
import { Observable } from 'rxjs';

const DATE_FORMAT = 'dd-MM-yyyy';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {
  public list$: Observable<ITask[]> = this._taskService.tasks$;
  public count$: Observable<number> = this._taskService.count$;
  public categories$: Observable<string[]> = this._taskService.categories();
  
  constructor(
    @Inject(API_TASKS_SERVICE) private readonly _taskService: IAPITaskService,
    private readonly _datePipe: DatePipe
  ) { }

  ngOnInit(): void {
      this._taskService.list()
  }

  onTaskChecked({id, checked}: ITaskState): void {
    let done: boolean | string = checked;
    if(checked) {
      done = this._datePipe.transform(new Date(), DATE_FORMAT);
    } 
    this._taskService.patch({id, done});
  }

  onTaskDelete(id: number): void {
    this._taskService.delete(id);
  }

  onChangeFilter(filter): void {
    this._taskService.changeFilter(filter);
  }
}
