import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ITask, ITaskState } from '@models/task.model';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() task: ITask;
  @Output() deleteTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() checkTask: EventEmitter<ITaskState> = new EventEmitter<ITaskState>();
  checkedControl: FormControl;
  private readonly destroy$: Subject<void> = new Subject();
  constructor() {
    this.checkedControl = new FormControl(false);
   }

  ngOnInit(): void {
    this.checkedControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(150),
      tap(checked => this.checkTask.emit({id: this.task.id, checked}))
    ).subscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
      const {task} = changes;
      if(!task || !task.currentValue) return;
      this.checkedControl.setValue(<ITask>task.currentValue.done);
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
