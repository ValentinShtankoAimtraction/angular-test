import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ITask, ITaskState } from '@models/index';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  @Input() taskList: ITask[];
  @Output() deleteTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() checkTask: EventEmitter<ITaskState> = new EventEmitter<ITaskState>();
}
