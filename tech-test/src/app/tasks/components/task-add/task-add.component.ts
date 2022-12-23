import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITask } from '@models/task.model';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskAddComponent implements OnInit {
  @Input() categories: Array<string> = [];
  @Output() saveForm: EventEmitter<Partial<ITask>> = new EventEmitter();
  formGroup: FormGroup;
  constructor(private readonly _fb: FormBuilder) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }
  buildForm() {
    this.formGroup = this._fb.group({
      label: [''],
      category: [''],
      description: ['']
    })
  }

  onFormSave(form: Partial<ITask>): void { 
    this.saveForm.next(form);
  }
}
