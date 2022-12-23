import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ITaskFilter, ITaskType, ITaskTypes } from '@models/task.model';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFilterComponent {
  @Input() count: number = 0;
  @Input() categories: string[] = [];
  @Output() changeFilter: EventEmitter<Partial<ITaskFilter>> = new EventEmitter<Partial<ITaskFilter>>();
  
  activeType: ITaskType = ITaskTypes.ALL;
  
  get types(): string[] {
    return Object.values(ITaskTypes);
  }

  changeType(type: ITaskType): void {
    this.activeType = type;
    this.changeFilter.emit({type});
  }

  changeCategory(category: string): void {
    this.changeFilter.emit({category});
  }
}
